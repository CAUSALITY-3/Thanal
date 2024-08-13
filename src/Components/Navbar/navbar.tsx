import { FC } from "react";
import Link from "next/link";
import Bag from "../ShoppingBag/bag";
import { apiCall } from "@/api/sevice";
import ScreenWidhChecker from "./screenWidthChecker";
import { getUserAuthdetails } from "@/app/util";
import "./navbar.scss";

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
          <img
            src={`${process.env.IMAGE_URL}/images/getImage?path=products/plants/plants.jpg`}
            alt=""
            style={navbarItemStyle}
          />
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
