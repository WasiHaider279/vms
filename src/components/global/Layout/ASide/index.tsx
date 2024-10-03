import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { settingsNavigation, sideBarNavigation } from "@/routes";
import {
  FaChevronLeft,
  FaChevronDown,
  FaChevronUp,
  FaCog,
} from "react-icons/fa";
import { useGetCurrentUserQuery } from "@/redux/services/authApi";
import { useAppSelector } from "@/redux/store";

interface AsideProps {
  sidebarOpen: boolean;
}

const ASide = ({ sidebarOpen }: AsideProps) => {
  const { data: user, isSuccess, isLoading } = useGetCurrentUserQuery({});
  const { status } = useAppSelector((state: any) => state.auth);
  const pathname = usePathname();
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [openSetting, setOpenSetting] = useState<boolean>(false);

  const toggleSubMenu = (name: string) => {
    if (openSubMenu === name) {
      setOpenSubMenu(null);
    } else {
      setOpenSubMenu(name);
    }
  };

  return (
    <aside
      className={`${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 shadow-sm -translate-x-full lg:translate-x-0`}
      aria-label="Sidenav"
      id="drawer-navigation"
    >
      <div className="h-full px-3 py-5 overflow-y-auto bg-white">
        <ul className="space-y-2 flex justify-between flex-col h-full">
          <div>
            <li>
              {openSetting && status !== "Rejected" && (
                <FaChevronLeft
                  onClick={() => setOpenSetting(false)}
                  className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-800"
                />
              )}
            </li>
            {(openSetting || status === "Rejected"
              ? settingsNavigation
              : sideBarNavigation
            )?.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => toggleSubMenu(item.name)}
                  className={`${
                    pathname === item.href ||
                    (item.children && openSubMenu === item.name)
                      ? "bg-[#EFF5FB] text-[#3669C9]"
                      : "text-[#929AAB]"
                  } flex items-center justify-between p-3 my-3 text-base font-medium rounded-lg hover:bg-[#EFF5FB] hover:text-[#3669C9]`}
                >
                  {/*icon and name */}
                  <div className="flex items-center">
                    <item.icon
                      className={`w-5 h-5 transition duration-75`}
                      aria-hidden="true"
                    />
                    <span className="ml-3">{item.name}</span>
                  </div>
                  {/* donw icon */}
                  {item.children && (
                    <button className="ml-auto">
                      {openSubMenu === item.name ? (
                        <FaChevronUp className="w-5 h-5" />
                      ) : (
                        <FaChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  )}
                </Link>
                {/* submenu */}
                {item.children && openSubMenu === item.name && (
                  <ul className="ml-5 mt-1 flex flex-col gap-1">
                    {item.children.map((subItem) => (
                      <li key={subItem.name}>
                        <Link
                          href={subItem.href}
                          className={`${
                            pathname === subItem.href
                              ? "border-l-4 border-[#3669C9] text-[#3669C9]"
                              : "text-gray-600"
                          } flex items-center justify-between p-2 text-[14px] rounded-lg font-medium  hover:border-l-4 hover:border-[#3669C9] hover:text-[#3669C9]  group`}
                        >
                          <div className="flex items-center gap-2">
                            <subItem.icon
                              className={`${
                                pathname === subItem.href
                                  ? "text-[#3669C9]"
                                  : "text-[#929AAB]"
                              } w-4 h-4 transition duration-75 group-hover:text-[#3669C9]`}
                              aria-hidden="true"
                            />
                            <span>{subItem.name}</span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </div>
          {!openSetting && (
            <li className="pb-10">
              <div
                onClick={() => setOpenSetting(true)}
                className={`${
                  pathname === "/settings"
                    ? "bg-[#EFF5FB] text-[#3669C9]"
                    : "text-[#929AAB]"
                } flex items-center cursor-pointer justify-between p-3 text-base font-medium rounded-lg hover:bg-[#EFF5FB] hover:text-[#3669C9]`}
              >
                {/*icon and name */}
                <div className="flex items-center">
                  <FaCog
                    className={`w-5 h-5 transition duration-75`}
                    aria-hidden="true"
                  />
                  <span className="ml-3">Settings</span>
                </div>
              </div>
            </li>
          )}
        </ul>
      </div>
    </aside>
  );
};

export default ASide;
