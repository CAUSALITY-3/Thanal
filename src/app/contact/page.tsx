import MakePaymentComponent from "@/Components/PaymentComponent/MakePaymentComponent";
import { getUserAuthdetails } from "../util";

export default async function Contact() {
  const session: any = await getUserAuthdetails();

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