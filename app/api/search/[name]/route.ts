import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { name: string } }
) => {
  try {
    if (
      typeof process.env.NAVER_CLIENT_ID !== "undefined" &&
      typeof process.env.NAVER_CLIENT_SECRET !== "undefined"
    ) {
      const response = await fetch(
        `https://openapi.naver.com/v1/search/image?query=제주${params.name}&display=10&start=1&sort=sim&filter=all`,
        {
          headers: {
            "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID,
            "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET,
          },
        }
      );
      const data = await response.json();
      return NextResponse.json(data, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "요청이 잘못되었습니다." },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
