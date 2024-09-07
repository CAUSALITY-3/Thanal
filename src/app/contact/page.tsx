"use client";
import MakePaymentComponent from "@/Components/PaymentComponent/MakePaymentComponent";
import { getCookie } from "../util";

export default async function Contact() {
  const userData: any = getCookie("user");
  console.log(userData);
  const session =
    userData?.value && typeof userData?.value === "string"
      ? JSON.parse(userData.value)
      : {};

  return (
    <>
      {session ? (
        <>
          <h1>Hello</h1>
          <div>{JSON.stringify(session)}</div>
        </>
      ) : (
        <>
          <h1>You Shall Not Pass!</h1>
          <h1>You Shall Not Pass!</h1>
          <h1>You Shall Not Pass!</h1>
          <h1>You Shall Not Pass!</h1>
          <h1>You Shall Not Pass!</h1>
        </>
      )}

      <MakePaymentComponent />
    </>
  );
}
