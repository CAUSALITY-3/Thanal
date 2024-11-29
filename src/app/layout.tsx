import type { Metadata } from "next";
import "./homeLayout.scss";
import { ReactQueryClientProvider } from "./queryClient";
import Navbar from "@/Components/Navbar/navbar";
import { roboto } from "../utils/fonts";
import Footer from "@/Components/Footer/Footer";

export const metadata: Metadata = {
  title: "Thanal",
  description: "For the one who needs it",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return await (
    <ReactQueryClientProvider>
      <html className="html" lang="en">
        <body className={`body ${roboto}`}>
          <div className="mainDiv">
            <div className="navbarOuter">
              <Navbar />
            </div>
            {children}
            <div className="main-footer">
              <Footer />
            </div>
          </div>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
