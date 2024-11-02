"use client";
import { FC } from "react";
import React from "react";
// import { signIn } from "next-auth/react";
import "./login.scss";
import Link from "next/link";

const Login: FC = () => {
  return (
    <div className="login-outer-container">
      <div className="select-login-provider">
        <div className="login-provider-text">Please Select login provider</div>

        <Link
          className="login-providers"
          prefetch={false}
          href={"/thanalApi/auth/google"}
        >
          <div className="login-provider-logo">
            <img
              loading="lazy"
              src="https://lh3.googleusercontent.com/C_Ty0alIJNrRQz5pNFmgA1rsRnhZDj67eVCCHXoJFFot0FQEZydARPRKbBADyHQoA0_Dj6gLITCshiJq6C-H-QM_U2mJwJZVLOQPnwvCL2RerGMEhw0"
              alt="Google"
            />
          </div>
          <div className="login-provider-name">Google</div>
        </Link>
      </div>
    </div>
  );
};

export default Login;
