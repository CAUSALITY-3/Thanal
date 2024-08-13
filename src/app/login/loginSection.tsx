"use client";
import { signIn } from "next-auth/react";
import React from "react";
import "./loginSection.scss";

export const LoginSection = ({ provider }: any) => {
  return (
    <>
      <div className="loginOuterDiv">
        <div className="loginContainer">
          <div
            className="loginWithhGooleButton"
            onClick={() => signIn(provider.id)}
          >
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
