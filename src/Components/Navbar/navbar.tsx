"use client";
import { FC } from "react";
import Link from "next/link";
import Bag from "../ShoppingBag/bag";
import ScreenWidhChecker from "./screenWidthChecker";
import { getUserAuth } from "@/app/util";
import "./navbar.scss";
import { useQuery } from "@tanstack/react-query";

export const Navbar: FC = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: getUserAuth,
    queryKey: ["user"], //Array according to Documentation
  });
  console.log("ha ha", { data });
  const user = data ? JSON.parse(data) : null;
  console.log("kuttu", data);
  const navbarItemStyle = {
    margin: "0 10px",
    height: 27,
    width: 27,
    fill: "#F0EAD6",
    ":hover": {
      cursor: "pointer",
      fill: "#d2ffd2",
    },
  };

  return (
    <nav className="navBar">
      <div className="navBarContents">
        <Link href="/" style={{ textDecoration: "none" }} prefetch={false}>
          <img
            loading="lazy"
            src={`https://ik.imagekit.io/0vf688mrkg/thanal/svg/logo.svg`}
            alt=""
            style={navbarItemStyle}
          />
        </Link>
        <Link href="/products" className="navBarItems" prefetch={false}>
          Products
        </Link>
        <Link href="/contact" className="navBarItems" prefetch={false}>
          Contact
        </Link>
        {user?.name ? (
          <Link href="/profile" className="navBarItems" prefetch={false}>
            {user?.name}
          </Link>
        ) : (
          <Link href="/login" className="navBarItems" prefetch={false}>
            Login
          </Link>
        )}
        <Bag numOfItems={user?.bag?.length} />
      </div>
      <ScreenWidhChecker />
    </nav>
  );
};

export default Navbar;
