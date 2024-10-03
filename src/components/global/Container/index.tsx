import { ReactNode } from "react";
import Box from "../Box";

interface ContainerProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

const Container = ({ title, children, className }: ContainerProps) => {
  return (
    <div className={`${className} flex flex-col gap-8`}>
      <h1 className={`text-2xl font-bold text-black`}>{title}</h1>
      <Box className="  flex-col p-4  bg-white border border-gray-200 rounded-lg shadow ">
        {children}
      </Box>
    </div>
  );
};

export default Container;
