import React from "react";
import Script from "next/script";
import "@/app/reset.css";
import "@/app/global.css";

const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <html lang="ko">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        <title>아콘점심요정</title>
      </head>
      <body>
        {children}
        <Script
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=fb36795153f712aaf6460e83e69422c4&libraries=services,clusterer&autoload=false"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
};

export default Layout;
