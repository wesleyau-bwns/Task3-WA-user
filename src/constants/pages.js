import Dashboard from "../pages/dashboard/DashboardOverviewPage";

export const ALL_PAGES = [
  {
    path: "dashboard", // renders at /dashboard
    label: "Dashboard",
    component: Dashboard,
    allowedPermissions: [],
    showInMenuContent: true,
  },
];
