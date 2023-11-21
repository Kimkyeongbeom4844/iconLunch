import React from "react";
import Image from "next/image";
import 호이곰 from "@/public/images/jokebear2.gif";

const Loading = ({ title }: { title: string }) => {
  return (
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
      <Image
        src={호이곰}
        alt="호이곰"
        width={250}
        style={{
          objectFit: "contain",
        }}
      />
      <h4>맛집 알아오는 중</h4>
    </div>
  );
};

export default Loading;
