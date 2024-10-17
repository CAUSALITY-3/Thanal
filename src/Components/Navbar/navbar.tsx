"use client";
import { FC } from "react";
import Link from "next/link";
import Bag from "../ShoppingBag/bag";
import ScreenWidhChecker from "./screenWidthChecker";
import { getUserAuth } from "@/app/util";
import { usePathname } from "next/navigation";
import "./navbar.scss";
import { useQuery } from "@tanstack/react-query";

export const Navbar: FC = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: getUserAuth,
    queryKey: ["user"], //Array according to Documentation
  });
  const pathname = usePathname();

  console.log("ha ha", { data });
  const user = data ? JSON.parse(data) : null;
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
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}svg/navBarLogo.svg`}
            alt=""
            style={navbarItemStyle}
          />
        </Link>
        <Link
          href="/products"
          className={`navBarItems ${pathname === "/products" ? "active" : ""}`}
          prefetch={false}
        >
          Products
        </Link>
        <Link
          href="/contact"
          className={`navBarItems ${pathname === "/contact" ? "active" : ""}`}
          prefetch={false}
        >
          Contact
        </Link>
        {user?.name ? (
          <Link
            href="/profile"
            className={`navBarItems ${pathname === "/profile" ? "active" : ""}`}
            prefetch={false}
          >
            {user?.name}
          </Link>
        ) : (
          <Link
            href="/login"
            className={`navBarItems ${pathname === "/login" ? "active" : ""}`}
            prefetch={false}
          >
            Login
          </Link>
        )}
        {user?.bag?.length ? (
          <Link
            href="/bag"
            className={`navBarItems ${pathname === "/bag" ? "active" : ""}`}
            prefetch={false}
          >
            <Bag numOfItems={user?.bag?.length} />
          </Link>
        ) : (
          <Bag numOfItems={user?.bag?.length} />
        )}
      </div>
      <ScreenWidhChecker />
    </nav>
  );
};

export default Navbar;
