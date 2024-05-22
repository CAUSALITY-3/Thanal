import { getpaths } from "@/api/utils";
import { options } from "../api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"
import MakePaymentComponent from "@/Components/PaymentComponent/MakePaymentComponent";

export default async function Contact() {
  const session: any = await getServerSession(options);
  const folders: any = getpaths();

  return (
    <>
      {session ? (
        <>
        <div>{JSON.stringify(session)}</div>
        <div>{JSON.stringify(session)}</div>
        <div>{JSON.stringify(session)}</div>
        <div>{JSON.stringify(session)}</div>
        <div>{JSON.stringify(session)}</div>
        </>
        
      ) : (
        <>
        <h1 >You Shall Not Pass!</h1>
        <h1 >You Shall Not Pass!</h1>
        <h1 >You Shall Not Pass!</h1>
        <h1 >You Shall Not Pass!</h1>
        <h1 >You Shall Not Pass!</h1>
        </>
      )}

      <MakePaymentComponent/>
    </>
  )
}