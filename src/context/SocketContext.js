"use client";

import RenderToast from "@/component/atoms/RenderToast";
import { config } from "@/config";
import { getUniqueBrowserId } from "@/resources/utils/helper";
import { signOutRequest, updateUserData } from "@/store/auth/authSlice";
import { addNotificationCount } from "@/store/common/commonSlice";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

// Create a new context for the socket connection
const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socket = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const { accessToken, user } = useSelector((state) => state?.authReducer);

  useEffect(() => {
    if (accessToken) {
      const initSocket = async () => {
        socket.current = io(config?.apiBaseURL, { transports: ["websocket"] });

        // get socket id
        socket.current.on("connect", () => {
          console.log("Active Socket Data 🤷‍♂️🤷‍♂️🤷‍♂️", {
            socketId: socket.current.id,
            device: getUniqueBrowserId(),
            id: user?._id,
          });
          console.log("Socket Connected:", socket.current.connected);
        });

        // **************** Establish connection with socket Start ****************
        socket.current.emit("join", {
          id: user?._id,
          device: getUniqueBrowserId(),
        });
        // **************** Establish connection with socket End ****************

        // **************** New Notification Listeners Start ****************
        // socket.current.on("new-notification", (data) => {
        //   console.log("socket data", data);

        //   if (data?.flag === "registration" && data?.receiver === user?._id) {
        //     console.log("New User Registered!", data);
        //     dispatch(addNotificationCount(data?._id ? 1 : 0));
        //     RenderToast({
        //       type: "success",
        //       message: data?.message,
        //     });
        //   }
        //   if (data?.flag === "coach-approved" && data?.receiver === user?._id) {
        //     dispatch(addNotificationCount(data?._id ? 1 : 0));
        //     RenderToast({
        //       type: "success",
        //       message: data?.message,
        //     });
        //   }
        // });

        socket?.current?.on("new-notification", (data) => {
          dispatch(addNotificationCount());
        });

        socket.current.on("new-notification", (data) => {
          if(!pathname.includes("/notifications")){
            dispatch(addNotificationCount(1));
          }
        });
        
        // **************** New Notification Listeners End ****************

        // **************** Listener End ****************
      };
      initSocket();
      return () => {
        if (socket.current) {
          socket.current.disconnect();
        }
      };
    }
  }, [accessToken, dispatch, user?._id]);

  // Provide the socket connection to children
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

// Custom hook to access the socket connection
export const useSocket = () => {
  return useContext(SocketContext);
};
