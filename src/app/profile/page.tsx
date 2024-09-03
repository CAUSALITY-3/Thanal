"use client";
import { FC } from "react";
import React from "react";
// import { signIn } from "next-auth/react";
import "./profile.scss";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "../util";
import { redirect } from "next/navigation";

const Profile: FC = () => {
  // const { data, isLoading, isError } = useQuery({
  //   queryFn: () => getCookie("user"),
  //   queryKey: ["user"],
  // });
  const data = getCookie("user");
  const isBrowser = typeof window === "object" && typeof document === "object";
  const user = data ? JSON.parse(data) : null;
  console.log("raman", data);
  if (!user?.name && isBrowser) return redirect("/login");
  return (
    <>
      {/* <div className="profile">
        <div className="profileOuter">
          <div className="profileContainer"> */}
      <div className="profileImage">
        <img src={user?.profilePic} alt="" />
      </div>
      <div className="profileDetails">
        <div className="profileName">{user?.name}</div>
        <div className="profileEmail">{user?.email}</div>
      </div>
      {/* //     </div> */}
      {/* //   </div> */}
      {/* // </div> */}
    </>
  );
};

export default Profile;
