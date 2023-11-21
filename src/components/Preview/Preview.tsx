"use client";
import type { PreviewData } from "@/src/types/type";
import React, { useState, useEffect, useRef } from "react";
import styles from "./Preview.module.css";

const Preview = ({ data }: { data: PreviewData }) => {
  const [showTitle, setShowTitle] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current !== null) {
      if (showTitle === true) {
        titleRef.current.classList.add(styles.visible);
      } else {
        titleRef.current.classList.remove(styles.visible);
      }
    }
  }, [showTitle]);

  return (
    <div
      onMouseOver={() => setShowTitle(true)}
      onMouseLeave={() => setShowTitle(false)}
      className={styles.wrap}
    >
      <img
        className={styles.img}
        src={data.link}
        alt={data.link}
        width={200}
        height={200}
        loading={"lazy"}
      />
      <p className={styles.title} ref={titleRef}>
        {data.title}
      </p>
    </div>
  );
};

export default Preview;
