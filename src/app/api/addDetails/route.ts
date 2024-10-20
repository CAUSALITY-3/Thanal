import { apiCall } from "@/api/sevice";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { payload, email } = (await request.json()) as {
    payload: any;
    email: string;
  };

  console.log("UPDATE_USER_BY_QUERY", payload, email);
  const response = await apiCall(
    "PUT",
    "UPDATE_USER_BY_QUERY",
    {},
    `?email=${email}`,
    payload,
    {
      "Content-Type": "application/json",
    },
    { success: "Successfully updated data.", failure: "Failed to update data." }
  );
  console.log(response);
  return NextResponse.json(response, { status: 200 });
}
