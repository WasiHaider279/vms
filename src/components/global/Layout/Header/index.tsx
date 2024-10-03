import { useRouter } from "next/navigation";
import { removeAuthToken } from "@/redux/features/authSlice";
import { FaBars } from "react-icons/fa";
import { useGetCurrentUserQuery } from "@/redux/services/authApi";
import { useAppDispatch } from "@/redux/store";

interface HeaderProps {
  sidebarOpen?: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header = ({ sidebarOpen, setSidebarOpen }: HeaderProps) => {
  const { data: user } = useGetCurrentUserQuery({});
  const dispatch = useAppDispatch();
  const router = useRouter();
  const signout = () => {
    dispatch(removeAuthToken());
    router.push("/signin");
  };

  return (
    <header className="px-4 py-2.5 border-b bg-white fixed left-0 right-0 top-0 z-50">
      <div className="flex items-center justify-between">
        <section className="flex gap-4 md:hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg cursor-pointer"
          >
            <FaBars className="w-6 h-6 text-black" />
          </button>
        </section>
        <center>
          <img
            src={user?.data?.store?.logo}
            className="h-14 w-14 bg-contain rounded-full"
          />
        </center>
        <h2 className="font-bold text-xl">{user?.data?.store?.name}</h2>
        {/* User */}
        <div className="flex gap-2 items-center">
          <button onClick={() => signout()} className="btn">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
