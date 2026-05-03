import { NavSection } from "@/types/dashboard.types";
import { getDefaultDashboardRoute, UserRole } from "./authUtils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role);
  return [
    {
      items: [
        {
          title: "Home",
          href: "/",
          icon: "Home",
        },
        {
          title: "Dashboard",
          href: defaultDashboard,
          icon: "LayoutDashboard",
        },
      ],
    },
  ];
};

export const userNavItems: NavSection[] = [
  {
    title: "Video Portal",
    items: [
      {
        title: "My Watchlist",
        href: "/dashboard/watchlist",
        icon: "Bookmark",
      },
      {
        title: "My Reviews",
        href: "/dashboard/my-reviews",
        icon: "Star",
      },
    ],
  },
  {
    title: "Account & Settings",
    items: [
      {
        title: "Purchase History",
        href: "/dashboard/purchase-history",
        icon: "History",
      },
      {
        title: "Profile Management",
        href: "/dashboard/my-profile",
        icon: "User",
      },
      // {
      //   title: "Change Password",
      //   href: "/change-password",
      //   icon: "Settings",
      // },
    ],
  },
];

export const adminNavItems: NavSection[] = [
  {
    title: "Content Management",
    items: [
      {
        title: "Manage Media",
        href: "/admin/dashboard/media-management",
        icon: "Film",
      },
    ],
  },
  {
    title: "User Management",
    items: [
      {
        title: "Review Moderation",
        href: "/admin/dashboard/manage-reviews",
        icon: "MessageSquare",
      },
      {
        title: "Users",
        href: "/admin/dashboard/users",
        icon: "Users",
      },
    ],
  },
  {
    title: "System & Reports",
    items: [
      {
        title: "Sales Management",
        href: "/admin/dashboard/sales-management",
        icon: "History",
      },
      {
        title: "Sales/Rental Analytics",
        href: "/admin/dashboard/analytics",
        icon: "BarChart3",
      },
    ],
  },
  {
    title: "Account & Settings",
    items: [
      {
        title: "Profile Management",
        href: "/admin/dashboard/my-profile",
        icon: "User",
      },
    ],
  },
];

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
  const commonNavItems = getCommonNavItems(role);

  switch (role) {
    case "SUPER_ADMIN":
    case "ADMIN":
      return [...commonNavItems, ...adminNavItems];

    case "USER":
      return [...commonNavItems, ...userNavItems];

    default:
      return commonNavItems;
  }
};
