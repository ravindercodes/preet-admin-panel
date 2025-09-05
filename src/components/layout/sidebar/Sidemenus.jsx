import {Admin, AdmissionIcon, DashboardIcon, WashingArea} from "./Sidebarsvg";

export const MenuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      roles: ["admin", "user", "manager"],
      icon: <DashboardIcon />,
      subMenu: [],
    },
    {
      title: "Admission",
      path: "/admission",
      roles: ["admin", "user", "manager"],
      icon: <AdmissionIcon />,
      subMenu: [
        {
          title: "All Admissions",
          path: "/admission",
          roles: ["admin", "user", "manager"],
        },
        {
          title: "Verify Student",
          path: "/admission/verify-student",
          roles: ["admin", "user", "manager"],
        },
        {
          title: "Registration Entries",
          path: "/registration-entries",
          roles: ["admin", "user", "manager"],
        },
      ],
    }
    // {
    //     title: "Contact",
    //     path: "/contact",
    //     roles: ["admin", "user", "manager"],
    //     icon: <AdmissionIcon />,
    //     subMenu: [],
    // }
  ];
