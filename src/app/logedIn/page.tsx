"use client";
import { FC } from "react";
// import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { getUserAuth } from "../util";

const LogedIn: FC = async () => {
  // Get the cookie and parse it back to JSON
  try {
    console.log("&&&&&&&&&&&&&&", document);

    // return redirect("/");
    let userObject: any = await getUserAuth();
    console.log("cookie", userObject);

    userObject ? localStorage.setItem("user", userObject) : null;
    // if (user?.name) {
    // need to update this to profile page
    // }
    return <p onClick={() => redirect("/")}>{userObject}</p>;
  } catch (err) {
    console.log(err);
    return redirect("/");
  }
};

export default LogedIn;
