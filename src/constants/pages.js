import DashboardOverviewPage from "../pages/dashboard/DashboardOverviewPage";

import UserProfilePage from "../pages/profile/UserProfilePage";
import UserPasswordPage from "../pages/profile/UserPasswordPage";

import BankAccountListPage from "../pages/bank-accounts/BankAccountListPage";
import BankAccountShowPage from "../pages/bank-accounts/BankAccountShowPage";
import BankAccountCreatePage from "../pages/bank-accounts/BankAccountCreatePage";
import BankAccountEditPage from "../pages/bank-accounts/BankAccountEditPage";

import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

export const ALL_PAGES = [
  {
    path: "dashboard", // renders at /dashboard
    label: "Dashboard",
    component: DashboardOverviewPage,
    icon: HomeIcon,
    allowedPermissions: [],
    showInMenuContent: true,
  },
  {
    path: "profile", // renders at /profile
    label: null,
    component: UserProfilePage,
    icon: null,
    allowedPermissions: [],
    showInMenuContent: false,
  },
  {
    path: "password",
    label: null,
    component: UserPasswordPage,
    icon: null,
    allowedPermissions: [],
    showInMenuContent: false,
  },
  {
    path: "bank-accounts",
    label: "Bank Account",
    component: BankAccountListPage,
    icon: AccountBalanceIcon,
    allowedPermissions: [],
    showInMenuContent: true,
  },
  {
    path: "bank-accounts/:id",
    label: null,
    component: BankAccountShowPage,
    icon: null,
    allowedPermissions: [],
    showInMenuContent: false,
  },
  {
    path: "bank-accounts/create",
    label: null,
    component: BankAccountCreatePage,
    icon: null,
    allowedPermissions: [],
    showInMenuContent: false,
  },
  {
    path: "bank-accounts/:id/edit",
    label: null,
    component: BankAccountEditPage,
    icon: null,
    allowedPermissions: [],
    showInMenuContent: false,
  },
];
