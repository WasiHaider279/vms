import "animate.css";
import Layout from "@/components/global/Layout";
import "../../styles/global.css";
import { Providers } from "@/redux/provider";
import Notification from "@/components/global/Notification";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vendor Management System",
  description: "Vendor Management System",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>
          <Layout>{children}</Layout>
          <Notification />
        </Providers>
      </body>
    </html>
  );
}
