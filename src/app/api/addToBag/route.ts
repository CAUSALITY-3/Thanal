import { apiCall } from '@/api/sevice';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const { productId, email } = (await request.json()) as {
        productId: string;
        email: string;
    };
   
    console.log("ADD_TO_BAG", {productId}, email)
    const response = await apiCall(
        "POST",
        "ADD_TO_BAG",
        {},
        `?email=${email}`,
        JSON.stringify({productId}),
        {
          "Content-Type": "application/json",
        }
      );
    console.log(response);
    return NextResponse.json(response, { status: 200 });
   }