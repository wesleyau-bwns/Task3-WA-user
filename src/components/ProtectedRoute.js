import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({
  children,
  allowedPermissions = [],
  requireAll = false,
}) {
  const { user, permissions, loading, fetchUser, fetchPermissions } = useAuth();
  const [initialized, setInitialized] = useState(false);
  const location = useLocation();

  // Fetch user profile (name and email)
  useEffect(() => {
    if (!user && !loading) {
      fetchUser().finally(() => setInitialized(true));
    } else {
      setInitialized(true);
    }
  }, [user, loading, fetchUser]);

  // Ensure permissions are loaded ONLY if needed
  useEffect(() => {
    if (user && allowedPermissions.length > 0 && permissions === null) {
      fetchPermissions();
    }
  }, [user, permissions, allowedPermissions, fetchPermissions]);

  // Still loading profile or permissions
  if (
    !initialized ||
    loading ||
    (allowedPermissions.length > 0 && permissions === null)
  ) {
    return null;
  }

  // Not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Authorization check (UI-level only)
  if (allowedPermissions.length > 0) {
    const hasPermission = requireAll
      ? allowedPermissions.every((p) => permissions.includes(p))
      : allowedPermissions.some((p) => permissions.includes(p));

    if (!hasPermission) {
      console.log("[ProtectedRoute] Unauthorized access", {
        path: location.pathname,
        permissions,
        allowedPermissions,
      });

      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Render protected content
  return children;
}
