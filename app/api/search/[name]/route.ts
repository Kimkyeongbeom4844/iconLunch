import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { name: string } }
) => {
  try {
    const apiResponses = await Promise.all([
      (
        await fetch(
          `https://openapi.naver.com/v1/search/image?query=제주+${params.name}&display=100&start=1&sort=sim`,
          {
            headers: {
              "X-Naver-Client-Id": process.env?.NAVER_CLIENT_ID ?? "12341234",
              "X-Naver-Client-Secret":
                process.env?.NAVER_CLIENT_SECRET ?? "12342142",
            },
          }
        )
      ).json(),
      (
        await fetch(
          `https://openapi.naver.com/v1/search/blog?query=제주+${params.name}&display=100&start=1&sort=sim`,
          {
            headers: {
              "X-Naver-Client-Id": process.env?.NAVER_CLIENT_ID ?? "12341234",
              "X-Naver-Client-Secret":
                process.env?.NAVER_CLIENT_SECRET ?? "12342142",
            },
          }
        )
      ).json(),
    ]);
    return NextResponse.json(apiResponses);
  } catch (error) {
    return NextResponse.json(error);
  }
};
