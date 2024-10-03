import {
  FaHome,
  FaUserTag,
  FaUnlockAlt,
  FaUsers,
  FaCog,
  FaShippingFast,
  FaShoppingCart,
  FaMapMarkerAlt,
  FaList,
  FaLocationArrow,
  FaStoreAlt,
  FaMoneyBillAlt,
  FaUserAlt,
  FaUsersCog,
  FaUserTie,
  FaUser,
} from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { BsCollectionFill } from "react-icons/bs";
import { BiCollection } from "react-icons/bi";

import { LuShip } from "react-icons/lu";

type UserNavigationItem = {
  name: string;
  href: string;
};

type SidebarNavigationItem = {
  name: string;
  href: string;
  icon: React.ElementType;
  children?: SidebarNavigationItem[];
};

export const userNavigation: UserNavigationItem[] = [
  { name: "My profile", href: "/profile" },
];

export const settingsNavigation: SidebarNavigationItem[] = [
  {
    name: "Store",
    href: "/settings/store",
    icon: FaStoreAlt,
  },
  {
    name: "Banking",
    href: "/settings/banking",
    icon: FaMoneyBillAlt,
  },
  {
    name: "Profile",
    href: "/settings/profile",
    icon: FaUserAlt,
  },
  // {
  //   name: "Users & Permissions",
  //   href: "/settings/permissions",
  //   icon: FaUsersCog,
  // },
];

export const sideBarNavigation: SidebarNavigationItem[] = [
  {
    name: "Dashboard",
    href: "/",
    icon: FaHome,
  },
  {
    name: "Orders",
    href: "#",
    icon: FaShoppingCart,
    children: [
      {
        name: "Listing",
        href: "/orders",
        icon: FaList,
      },
    ],
  },
  {
    name: "Products",
    href: "#",
    icon: FaUsers,
    children: [
      {
        name: "Listings",
        href: "/products",
        icon: FaList,
      },
      { name: "Add Product", href: "/products/add", icon: FaUserTag },
    ],
  },
  /*   {
    name: "Users",
    href: "#",
    icon: FaUsers,
    children: [
      {
        name: "Listing",
        href: "/users",
        icon: FaUsers,
      },
      {
        name: "Add User",
        href: "/users/add",
        icon: IoIosAddCircleOutline,
      },
    ],
  }, */
  /*   {
    name: "Shipping",
    href: "#",
    icon: FaShippingFast,
    children: [
      {
        name: "Add Shipping",
        href: "/shipping/add",
        icon: LuShip,
      },
      {
        name: "Listing",
        href: "/shipping",
        icon: FaList,
      },
    ],
  }, */
  /*   {
    name: "Vendors",
    href: "/vendors",
    icon: FaUserTie,
  }, */
  /*   {
    name: "Customers",
    href: "/customers",
    icon: FaUser,
  }, */
  /*   {
    name: "Collections",
    href: "#",
    icon: BsCollectionFill,
    children: [
      {
        name: "Add Collection",
        href: "/collections/add",
        icon: LuShip,
      },
      {
        name: "Listing",
        href: "/collections",
        icon: BiCollection,
      },
    ],
  }, */
  {
    name: "Locations",
    href: "#",
    icon: FaMapMarkerAlt,
    children: [
      {
        name: "Listing",
        href: "/locations",
        icon: FaList,
      },
      {
        name: "Add Location",
        href: "/locations/add",
        icon: FaLocationArrow,
      },
    ],
  },
];
