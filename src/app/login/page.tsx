"use client"
import { FC } from "react";
import Image from "next/image";
import * as stylex from "@stylexjs/stylex";
import googleIcon from "@/assets/google_icon.svg";

import React from 'react'
import { signIn } from "next-auth/react";
import { revalidatePath } from "next/cache";

const styles = stylex.create({
    loginOuterDiv: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "70vh"
    },
    loginContainer: {
      display: "flex",
      alignItems: "center",
      padding: "10px 20px",
      flexDirection: "column",
      background: "rgba(0, 0, 0, .03)",
      justifyContent: "center",
      width: "100%",
      maxWidth: "500px",
      height: "60%"
    },
    steps: {
      color: "grey",
      marginBottom: "25px",
    },
    loginWithhGooleButton: {
      display: "flex",
      padding: "5px 10px",
      background: "rgba(0, 0, 0, .05)",
      borderRadius: "3px",
      ":hover": {
        cursor: "pointer",
        background: "rgba(0, 0, 0, .1)",
      },
    },
    loginWithhGooleText: {
      marginRight: "20px"
  
    }
  });
const Login: FC = () => {
  const loginWithhGooleIcon = {
    width: "18px",
    height: "18px",
  }
  return (
    <>
      <div {...stylex.props(styles.loginOuterDiv)} onClick={()=> signIn('google',{callbackUrl: "http://loalhost:3000/signup"})}>
        <div {...stylex.props(styles.loginContainer)}>
          <div {...stylex.props(styles.loginWithhGooleButton)}>
            <div {...stylex.props(styles.loginWithhGooleText)}>
              Login/SingnUp with Google
            </div>
            <Image src={googleIcon} alt="" style={loginWithhGooleIcon}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
