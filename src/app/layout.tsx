import type { Metadata } from "next";
// import * as stylex from "@stylexjs/stylex";
// import AuthProvider from "./context/authProvider";
import "./homeLayout.scss";
import { ReactQueryClientProvider } from "./queryClient";
import Navbar from "@/Components/Navbar/navbar";

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
        <body className="body">
          <>
            <Navbar />
            {children}
          </>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
