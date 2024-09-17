"use client";
import { FC } from "react";
import React from "react";
import "./profile.scss";
import { getCookie } from "../util";
import { redirect } from "next/navigation";
import { Input } from "@/Components/Input/Input";

const Profile: FC = () => {
  const data = getCookie("user");
  const isBrowser = typeof window === "object" && typeof document === "object";
  const user = data ? JSON.parse(data) : null;
  if (!user?.name && isBrowser) return redirect("/login");
  return (
    <div className="profilePage">
      <div className="profileOuter">
        <div className="profileTopContainer">
          <div className="profileImage">
            <img
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}profilePic.jpg`}
              alt=""
            />
          </div>
          <div className="profileDetails">
            <div className="profileName">{user?.name}</div>
            <div className="profileEmail">{user?.email}</div>
          </div>
        </div>

        <div className="profileBottomContainer">
          <div className="detailsContainer">
            <div className="phoneNum">Phone : </div>
            <div>
              <input
                className="formInput"
                style={{ cursor: "auto" }}
                type="text"
                readOnly={true}
                value={user.phone}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
