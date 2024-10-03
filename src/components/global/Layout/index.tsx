"use client";
import { ReactNode, useEffect, useState } from "react";
import Main from "./Main";
import ASide from "./ASide";
import Header from "./Header";
import { useAppDispatch } from "@/redux/store";
import socket from "@/utils/socket";
import {
  addNotification,
  removeNotification,
} from "@/redux/features/notificationSlice";

const Layout = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Listen for "notification" events from the socket
    socket.on("notification", (notification) => {
      dispatch(addNotification(notification));

      // Automatically remove the notification after some time (e.g., 5000 milliseconds)
      setTimeout(() => {
        dispatch(removeNotification(notification.id));
      }, 5000);
    });

    // Cleanup the socket connection when the component is unmounted
    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen relative w-full flex antialiased bg-gray-50 ">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="lg:w-64">
        <ASide sidebarOpen={sidebarOpen} />
      </div>
      <div className="w-full lg:w-[calc(100%-16rem)] mb-20">
        <Main>{children}</Main>
      </div>
      <div className="fixed bottom-0 text-white bg-black w-full z-40 p-2 text-center">
        © Copyright 2024 ismmart.com - All Rights Reserved.
      </div>
    </div>
  );
};

export default Layout;
