"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import 자만곰 from "@/public/images/jokebear4.png";
import 만두곰 from "@/public/images/jokebear3.gif";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Page = (): JSX.Element => {
  const router = useRouter();
  const [isTouch, setIsTouch] = useState(false);

  return (
    <div className={styles.wrap}>
      <h3>오늘 점심 뭐먹지?</h3>
      <Image
        src={isTouch === true ? 만두곰 : 자만곰}
        width={250}
        height={250}
        alt={"자만곰"}
        style={{
          cursor: "pointer",
          objectFit: "cover",
        }}
        onTouchStart={() => setIsTouch(true)}
        onTouchEnd={() => router.push("/result")}
        onClick={() => router.push("/result")}
        onMouseOver={() => setIsTouch(true)}
        onMouseLeave={() => setIsTouch(false)}
      />
      <p className={styles.opacity_text}>농담곰에게 물어보세요</p>
    </div>
  );
};

export default Page;
