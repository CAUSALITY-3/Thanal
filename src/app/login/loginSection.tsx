'use client'
import Image from "next/image";
import * as stylex from "@stylexjs/stylex";
import googleIcon from "@/assets/google_icon.svg";
import { signIn } from "next-auth/react";
import React from 'react'

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
  export const LoginSection = ({provider}:any) => {
    const loginWithhGooleIcon = {
      width: "18px",
      height: "18px",
    }
    return (
      <>
        <div {...stylex.props(styles.loginOuterDiv)}>
          <div {...stylex.props(styles.loginContainer)}>
            <div {...stylex.props(styles.loginWithhGooleButton)} onClick={() => signIn(provider.id)}>
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