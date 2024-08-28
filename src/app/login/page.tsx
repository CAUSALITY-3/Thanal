"use client";
import { FC } from "react";
import React from "react";
// import { signIn } from "next-auth/react";
import "./login.scss";
import Link from "next/link";

const Login: FC = () => {
  return (
    <>
      <Link
        className="loginOuterDiv"
        // onClick={() =>
        //   signIn("google", { callbackUrl: "http://loalhost:5000/signup" })
        // }
        href={"/thanalApi/auth/google"}
      >
        <div className="loginContainer">
          <div className="loginWithhGooleButton">
            <div className="loginWithhGooleText">Login/SingnUp with Google</div>
            {/* <img
              src={`${process.env.IMAGE_URL}/images/getImage?path=products/plants/plants.jpg`}
              alt=""
              className="loginWithhGooleIcon"
            /> */}
          </div>
        </div>
      </Link>
    </>
  );
};

export default Login;
