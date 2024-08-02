import { FC } from "react";
import logo from "@public/logo.svg";
// import * as stylex from "@stylexjs/stylex";
// import { text } from "../../app/globalTokens.stylex";
import Image from "next/image";
import Link from "next/link";
import Bag from "../ShoppingBag/bag";
import { apiCall } from "@/api/sevice";
import ScreenWidhChecker from "./screenWidthChecker";
import { getUserAuthdetails } from "@/app/util";
import "./navbar.scss";

// const styles = stylex.create({
//   navBar: {
//     height: 50,
//     width:"100%",
//     background: "rgba(250, 250, 252, .8)",
//     "backdrop-filter": "blur(10px)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   navBarContents: {
//     display: "flex",
//     height: "100%",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   navBarItems: {
//     "text-decoration": "none",
//     margin: "0 10px",
//     color: "rgba(0, 0, 0, .8)",
//     fontSize: text.sm,
//     transition: "all ease 0.5s",
//     ":hover": {
//       cursor: "pointer",
//       color: "black",
//       transition: "all ease 0.5s",
//     },
//   },
// });

export const Navbar: FC = async () => {
  const userAuth: any = await getUserAuthdetails();
  const userProfileResponse = userAuth?.email
    ? await apiCall("get", "GET_USER_BY_EMAIL", {}, `?email=${userAuth?.email}`)
    : null;
  const user = userProfileResponse;
  console.log("kuttu", userAuth);
  const navbarItemStyle = {
    margin: "0 10px",
    height: 25,
    width: 25,
    fill: "#F0EAD6",
    ":hover": {
      cursor: "pointer",
      fill: "#d2ffd2",
    },
  };

  return (
    <nav className="navBar">
      <div className="navBarContents">
        <Link href="/" style={{ textDecoration: "none" }}>
          <Image src={logo} alt="" style={navbarItemStyle} />
        </Link>
        <Link href="/products" className="navBarItems">
          Products
        </Link>
        <Link href="/contact" className="navBarItems">
          Contact
        </Link>
        {userAuth?.name ? (
          <div className="navBarItems">{userAuth?.name}</div>
        ) : (
          <Link href="/login" className="navBarItems">
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
