"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Blog.module.css";
import type { BlogData } from "@/src/types/type";
import Image from "next/image";
import 호이곰 from "@/public/images/jokebear2.gif";

// .replace(/(<br>|<br\/>|<b>|<\/b>)/g, "")
const Blog = ({ data }: { data: BlogData }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const [postDate, setPostDate] = useState<string>();
  const [bloggerName, setBloggerName] = useState<string>();

  useEffect(() => {
    if (titleRef.current !== null && descriptionRef.current !== null) {
      titleRef.current.innerHTML = data.title;
      descriptionRef.current.innerHTML = data.description;
      setBloggerName(() => data.bloggername);
      setPostDate(() => {
        const splitWord = data.postdate.split("");
        let result = "";
        for (let i = 0; i < splitWord.length; i++) {
          result += splitWord[i];
          if (i === 3 || i === 5 || i === 7) {
            result += ".";
          }
        }
        return result;
      });
    }
  }, []);

  const onClickBlog = () => {
    if (typeof bloggerName !== "undefined") {
      window.open(data.link, "_blank");
    }
  };

  return (
    <div className={styles.wrap} onClick={onClickBlog}>
      <h5 ref={titleRef}>
        <Image
          src={호이곰}
          alt="호이곰"
          width={220}
          style={{
            objectFit: "contain",
          }}
        />
      </h5>
      <h5 className={styles.description} ref={descriptionRef}></h5>
      <div className={styles.blogger_wrap}>
        <h5 className={styles.bloggername} title={bloggerName}>
          {bloggerName}
        </h5>
        <h6 className={styles.description}>{postDate}</h6>
      </div>
    </div>
  );
};

export default Blog;
