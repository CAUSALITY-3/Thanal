import { options } from "../api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"

export default async function Contact() {
  const session: any = await getServerSession(options);

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
    </>
  )
}