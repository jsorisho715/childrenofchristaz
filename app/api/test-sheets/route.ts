import { NextResponse } from "next/server"
import { initializeSpreadsheet } from "@/lib/google-sheets"

export async function GET() {
  try {
    await initializeSpreadsheet()
    return NextResponse.json({
      success: true,
      message: "Google Sheets integration is working correctly. Sheets have been initialized.",
    })
  } catch (error) {
    console.error("Google Sheets test failed:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Google Sheets integration failed. Please check your configuration.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
