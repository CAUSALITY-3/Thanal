import MakePaymentComponent from "@/Components/PaymentComponent/MakePaymentComponent";
import { cookies } from "next/headers";

export default async function Contact() {
  const cookieStore = cookies();
  const userData: any = cookieStore.get("user");
  console.log(userData);
  const session =
    userData?.value && typeof userData?.value === "string"
      ? JSON.parse(userData.value)
      : {};

  return (
    <>
      {session ? (
        <>
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
