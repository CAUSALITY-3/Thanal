"use client";
import { FC } from "react";
import React from "react";
import { signIn } from "next-auth/react";
import "./login.scss";

const Login: FC = () => {
  return (
    <>
      <div
        className="loginOuterDiv"
        onClick={() =>
          signIn("google", { callbackUrl: "http://loalhost:3000/signup" })
        }
      >
        <div className="loginContainer">
          <div className="loginWithhGooleButton">
            <div className="loginWithhGooleText">Login/SingnUp with Google</div>
            <img
              src={`${process.env.IMAGE_URL}/images/getImage?path=products/plants/plants.jpg`}
              alt=""
              className="loginWithhGooleIcon"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
