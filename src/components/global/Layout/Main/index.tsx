import { ReactNode } from "react";
import { FaChevronRight } from "react-icons/fa";
import Breadcrumb from "../../BreadCrumb";

const Main = ({ children }: { children: ReactNode }) => {
  return (
    <main className=" flex pt-24">
      <section className="px-8 w-full">
        <Breadcrumb
          homeElement={"Dashboard"}
          separator={
            <span>
              <FaChevronRight className="w-4 h-4 font-bold" />
            </span>
          }
          activeClasses="text-primary"
          containerClasses="flex items-center text-gray-400 my-4"
          listClasses="hover:text-primary mx-2 font-bold"
          capitalizeLinks
        />
        {children}
      </section>
    </main>
  );
};

export default Main;
