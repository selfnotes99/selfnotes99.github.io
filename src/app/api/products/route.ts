import { NextRequest, NextResponse } from "next/server";
import { fetchProductsFromGoogleSheet } from "@/lib/googleSheet";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const bypassCache = searchParams.get("refresh") === "true";

    const result = await fetchProductsFromGoogleSheet(bypassCache);

    return NextResponse.json(result, {
      status: 200,
      headers: {
        "Cache-Control": bypassCache
          ? "no-cache, no-store, must-revalidate"
          : "public, s-maxage=60, stale-while-revalidate=30",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch products",
        message: String(error),
      },
      { status: 500 }
    );
  }
}
