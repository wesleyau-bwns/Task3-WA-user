import { useState } from "react";
import { Box, Button, TextField, Typography, Grid } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { updatePassword } from "../../api/endpoints/users";

export default function UserPasswordPage() {
  const [savingPassword, setSavingPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSavingPassword(true);
    setErrors({});
    try {
      const res = await updatePassword(passwordData);
      alert(res.data.message);
      setPasswordData({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      });
      setSavingPassword(false);
    } catch (error) {
      setSavingPassword(false);
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        console.error(error);
        alert("Something went wrong. Please try again.");
      }
    }
  };

  const SaveButton = ({ isLoading, onClick, text = "Update" }) => (
    <Box display="flex" justifyContent="flex-end" mt={3}>
      <Button
        type="submit"
        variant="contained"
        startIcon={<EditIcon />}
        disabled={isLoading}
        onClick={onClick}
      >
        {isLoading ? "Saving..." : text}
      </Button>
    </Box>
  );

  return (
    <Box maxWidth={800} mx="auto">
      <Typography variant="h5" mb={3}>
        Edit Password
      </Typography>

      {/* -------------------- Change Password Section -------------------- */}
      <Box mb={5}>
        <Typography variant="h6" mb={4} display={"none"}>
          Change Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            {/* Current Password */}
            <Grid size={12}>
              <TextField
                fullWidth
                label="Current Password"
                type="password"
                value={passwordData.current_password}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    current_password: e.target.value,
                  })
                }
                error={!!errors.current_password}
                helperText={errors.current_password?.[0]}
              />
            </Grid>

            {/* New Password */}
            <Grid size={12}>
              <TextField
                fullWidth
                label="New Password"
                type="password"
                value={passwordData.new_password}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    new_password: e.target.value,
                  })
                }
                error={!!errors.new_password}
                helperText={errors.new_password?.[0]}
              />
            </Grid>

            {/* Confirm New Password */}
            <Grid size={12}>
              <TextField
                fullWidth
                label="Confirm New Password"
                type="password"
                value={passwordData.new_password_confirmation}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    new_password_confirmation: e.target.value,
                  })
                }
                error={
                  !!errors.new_password_confirmation || !!errors.new_password
                }
                helperText={
                  errors.new_password_confirmation?.[0] ||
                  errors.new_password?.[0]
                }
              />
            </Grid>
          </Grid>

          <SaveButton isLoading={savingPassword} text="Update Password" />
        </form>
      </Box>
    </Box>
  );
}
