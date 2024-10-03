"use client";

import { Button } from "flowbite-react";
import React from "react";
import { MdArrowForward } from "react-icons/md";
import { useRouter, usePathname } from "next/navigation";
import { Providers } from "@/redux/provider";
import { useGetCurrentUserQuery } from "@/redux/services/authApi";

const Layout = ({ children }: any) => {
  const pathname = usePathname();
  return (
    <div>
      {children}
      {pathname != "/settings" && (
        <Providers>
          <Confirmation />
        </Providers>
      )}
    </div>
  );
};

const Confirmation = () => {
  const router = useRouter();
  const { data, isLoading } = useGetCurrentUserQuery({});

  const onClick = () => router.push("/settings");
  return (
    data?.data?.status == "Rejected" &&
    !isLoading && (
      <div className="my-5 w-full flex justify-end ">
        <Button color="success" onClick={onClick} className="flex items-center">
          <div className="mr-2">View all reasons</div>
          <MdArrowForward />
        </Button>
      </div>
    )
  );
};

export default Layout;
