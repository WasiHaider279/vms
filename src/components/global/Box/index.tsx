import { ReactNode } from "react";

interface BoxProps {
  children: ReactNode;
  className?: string;
}

const Box = ({ children, className = "" }: BoxProps) => {
  return (
    <div
      className={`${className} flex gap-4 justify-between items-center rounded-md w-full bg-white  `}
    >
      {children}
    </div>
  );
};

export default Box;
