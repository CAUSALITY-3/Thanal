"use client";
// import { signIn } from "next-auth/react";
import React from "react";
import "./loginSection.scss";

export const LoginSection = ({ provider }: any) => {
  return (
    <>
      <div className="loginOuterDiv">
        <div className="loginContainer">
          <div
            className="loginWithhGooleButton"
            // onClick={() => signIn(provider.id)}
          >
            <div className="loginWithhGooleText">Login/SingnUp with Google</div>
            <img
              loading="lazy"
              src="https://lh3.googleusercontent.com/C_Ty0alIJNrRQz5pNFmgA1rsRnhZDj67eVCCHXoJFFot0FQEZydARPRKbBADyHQoA0_Dj6gLITCshiJq6C-H-QM_U2mJwJZVLOQPnwvCL2RerGMEhw0"
              alt=""
              className="loginWithhGooleIcon"
            />
          </div>
        </div>
      </div>
    </>
  );
};
