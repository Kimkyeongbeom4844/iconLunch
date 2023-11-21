"use client";
import React, { useEffect, useState, useRef } from "react";
import styles from "./page.module.css";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import 공복곰 from "@/public/images/jokebear.png";
import Image from "next/image";
import { BiChevronLeft } from "react-icons/bi";
import { useRouter } from "next/navigation";
import Loading from "@/src/components/Loading/Loading";
import Preview from "@/src/components/Preview/Preview";
import Blog from "@/src/components/Blog/Blog";
import type { BlogData, PreviewData } from "@/src/types/type";

const Page = () => {
  const router = useRouter();

  const [isPressBackButton, setIsPressBackButton] = useState<boolean>(false);
  const [currentCoords, setCurrentCoords] = useState<{
    latitude: number;
    longitude: number;
  }>();
  const [error, setError] = useState<{ code: number; message: string }>();
  const [placeCoords, setPlaceCoords] = useState<{
    name: string;
    latitude: number;
    longitude: number;
    address: string;
    type: string;
  }>();
  const [map, setMap] = useState<any>();
  const [relevantDataList, setRelevantDataList] = useState<any>();

  const relevantDataListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!map) return;
    (async () => {
      try {
        // 오늘 장소 정하는 로직 시작
        const response = await fetch("/coords.json");
        const data = await response.json();
        // console.log(data);
        const types = Object.keys(data);
        const selectType = types[Math.floor(Math.random() * 4)]; // 4개인이유 - 앞의 key4개가 한 중 일 양
        // console.log(selectType);
        const selectPlace =
          data[selectType][Math.floor(Math.random() * data[selectType].length)];
        // console.log(selectPlace);
        // 오늘 장소 정하는 로직 끝

        // 좌표로 주소 알아내기 시작
        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.coord2Address(
          selectPlace.longitude,
          selectPlace.latitude,
          async (result: any, status: string) => {
            // console.log(result[0], status);
            const response = await fetch(`/api/search/${selectPlace.name}`);
            const data = await response.json();
            console.log(data);
            if (typeof data.errorCode !== "undefined") {
              setError({
                code: data.errorCode,
                message: data.errorMessage,
              });
            } else {
              setPlaceCoords({
                ...selectPlace,
                address: result[0].road_address.address_name,
                type: selectType,
              });
              setRelevantDataList(data);
            }
          }
        );
        // 좌표로 주소 알아내기 끝
      } catch (error) {
        console.log(error);
      }
    })();
  }, [map]);

  useEffect(() => {
    let watchId: number | undefined;
    watchId = navigator.geolocation.watchPosition(
      (position) => {
        // console.log(position);
        setCurrentCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.log(error);
        switch (error.code) {
          case 1: // PERMISSION_DENIED
            setError({
              code: error.code,
              message: "GPS를 키거나 접근허용 후 새로고침해주세요",
            });
            break;
          case 2: // POSITION_UNAVAILABLE
            setError({
              code: error.code,
              message: "위치 정보를 가져올 수 없습니다",
            });
            break;
          case 3: // TIMEOUT
            setError({
              code: error.code,
              message: "위치 정보를 가져올 수 없습니다",
            });
            window.location.reload();
            break;
        }
      },
      {
        timeout: 5000,
      }
    );
    return () => {
      if (typeof watchId !== "undefined") {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  useEffect(() => {
    if (relevantDataListRef.current !== null) {
      const intersectionObserver = new IntersectionObserver((items) => {
        for (let i = 0; i < items.length; i++) {
          if (items[i].isIntersecting === true) {
            items[i].target.classList.remove(styles.hidden);
          } else {
            items[i].target.classList.add(styles.hidden);
          }
        }
      });
      for (let i = 0; i < relevantDataListRef.current.children.length; i++) {
        intersectionObserver.observe(relevantDataListRef.current.children[i]);
      }
    }
  }, [relevantDataList]);

  return (
    <>
      {typeof error !== "undefined" ? (
        // 에러 발생시 UI
        <div
          style={{
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            backgroundColor: "#fcfcfc",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h4
            style={{
              width: 220,
            }}
          >
            {error.message}
          </h4>
          <Image
            src={공복곰}
            alt={"공복곰"}
            width={250}
            style={{
              objectFit: "contain",
            }}
          />
          <div
            className={styles.reload_button}
            onClick={() => window.history.go(0)}
          >
            새로고침
          </div>
        </div>
      ) : typeof currentCoords !== "undefined" ? (
        <div className={styles.wrap}>
          <header className={styles.header}>
            <BiChevronLeft
              color={
                isPressBackButton === true ? "rgba(0,0,0,.6)" : "rgba(0,0,0,1)"
              }
              size={30}
              onClick={() => router.push("/")}
              onTouchEnd={() => router.push("/")}
              onTouchStart={() => setIsPressBackButton(true)}
              onMouseOver={() => setIsPressBackButton(true)}
              onMouseLeave={() => setIsPressBackButton(false)}
              style={{
                position: "absolute",
                left: 0,
                cursor: "pointer",
              }}
            />
            <h4>오늘의 메뉴</h4>
          </header>
          <Map
            center={{
              lat: placeCoords?.latitude ?? currentCoords.latitude,
              lng: placeCoords?.longitude ?? currentCoords.longitude,
            }} // 지도의 중심좌표
            isPanto={true} // 부드럽게 이동
            style={{
              height: "250px",
              flexShrink: 0,
            }} // 지도의 크기
            level={1} // 지도확대레벨
            onCreate={setMap}
          >
            {/* 나의위치 marker */}
            <MapMarker
              position={{
                lat: currentCoords.latitude,
                lng: currentCoords.longitude,
              }}
            />
            {typeof placeCoords !== "undefined" ? (
              // 맛집 marker
              <MapMarker
                position={{
                  lat: placeCoords.latitude,
                  lng: placeCoords.longitude,
                }}
                image={{
                  src: "/images/gromit.png",
                  size: {
                    width: 69,
                    height: 65,
                  }, // 마커이미지의 크기입니다
                  options: {
                    offset: {
                      x: 32,
                      y: 60,
                    }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                  },
                }} //커스텀 마커 옵션
              />
            ) : null}
          </Map>
          {typeof placeCoords !== "undefined" ? (
            <div className={styles.place_info_wrap}>
              <div className={styles.place_info_list}>
                <p>이름 : </p>
                <strong>{placeCoords.name}</strong>
              </div>
              <div className={styles.place_info_list}>
                <p>분류 : </p>
                <strong>{placeCoords.type}</strong>
              </div>
              <div className={styles.place_info_list}>
                <p>위치 : </p>
                <strong>{placeCoords.address}</strong>
              </div>
              {Array.isArray(relevantDataList) ? (
                <>
                  <div
                    className={styles.relevant_image_wrap}
                    ref={relevantDataListRef}
                  >
                    {Array.isArray(relevantDataList[0]?.items)
                      ? relevantDataList[0].items.map((elem: PreviewData) => {
                          return <Preview key={elem.link} data={elem} />;
                        })
                      : null}
                  </div>
                  <div className={styles.relevant_blog_wrap}>
                    {Array.isArray(relevantDataList[1]?.items)
                      ? relevantDataList[1].items.map((elem: BlogData) => {
                          return <Blog key={elem.link} data={elem} />;
                        })
                      : null}
                  </div>
                </>
              ) : null}
            </div>
          ) : (
            <Loading title="맛집 알아오는 중" />
          )}
        </div>
      ) : (
        // currentCoords없을 때 로딩 UI
        <Loading title="맛집 알아오는 중" />
      )}
    </>
  );
};

export default Page;
