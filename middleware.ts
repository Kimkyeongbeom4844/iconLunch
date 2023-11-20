import { NextResponse } from "./node_modules/next/server";
import type { NextRequest } from "./node_modules/next/server";

export const middleware = (request: NextRequest) => {
  return NextResponse.next();
};
