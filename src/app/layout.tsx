import type { Metadata } from "next";
import "./homeLayout.scss";
import { ReactQueryClientProvider } from "./queryClient";
import Navbar from "@/Components/Navbar/navbar";
import { roboto } from "../utils/fonts";

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
          <>
            <Navbar />
            {children}
          </>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
