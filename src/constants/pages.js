import DashboardOverviewPage from "../pages/dashboard/DashboardOverviewPage";
import UserProfilePage from "../pages/profile/UserProfilePage";
import UserPasswordPage from "../pages/profile/UserPasswordPage";

export const ALL_PAGES = [
  {
    path: "dashboard", // renders at /dashboard
    label: "Dashboard",
    component: DashboardOverviewPage,
    allowedPermissions: [],
    showInMenuContent: true,
  },
  {
    path: "profile", // renders at /profile
    label: null,
    component: UserProfilePage,
    allowedPermissions: [],
    showInMenuContent: false,
  },

  {
    path: "password",
    label: null,
    component: UserPasswordPage,
    allowedPermissions: [],
    showInMenuContent: false,
  },
];
