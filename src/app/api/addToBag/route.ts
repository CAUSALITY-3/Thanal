import { apiCall } from "@/api/sevice";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { productId, email } = (await request.json()) as {
    productId: string;
    email: string;
  };

  console.log("ADD_TO_BAG", { productId }, email);
  const response = await apiCall(
    "POST",
    "ADD_TO_BAG",
    {},
    `?email=${email}`,
    { productId },
    {
      "Content-Type": "application/json",
    },
    {
      success: "Successfully added item to bag.",
      failure: "Failed to add item to bag.",
    }
  );
  console.log(response);
  return NextResponse.json(response, { status: 200 });
}
