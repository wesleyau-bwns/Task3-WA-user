import { NavLink, useLocation, useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import KeyIcon from "@mui/icons-material/Key";

import { useLogout } from "../services/logoutService";
import { useAuth } from "../contexts/AuthContext";
import { ALL_PAGES } from "../constants/pages";

export default function MenuContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const logout = useLogout();

  // Filter pages based on user permissions
  const accessiblePages = ALL_PAGES.filter(
    (page) =>
      !page.allowedPermissions.length || // no permissions required
      page.allowedPermissions.some((permission) =>
        user?.permissions?.includes(permission)
      )
  );

  const menuPages = accessiblePages.filter((page) => page.showInMenuContent);

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      {/* Main menu */}
      <List dense>
        {menuPages.map((page) => {
          const pagePath = `/${page.path}`;
          const Icon = page.icon;

          return (
            <ListItem key={page.path} disablePadding>
              <ListItemButton
                component={NavLink}
                to={pagePath}
                selected={location.pathname === pagePath}
              >
                <ListItemIcon>
                  {Icon ? <Icon fontSize="small" /> : <MenuIcon />}
                </ListItemIcon>
                <ListItemText primary={page.label} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Secondary menu */}
      <List dense>
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton onClick={() => navigate("/profile")}>
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton onClick={() => navigate("/password")}>
            <ListItemIcon>
              <KeyIcon />
            </ListItemIcon>
            <ListItemText primary="Password" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton onClick={logout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Stack>
  );
}
