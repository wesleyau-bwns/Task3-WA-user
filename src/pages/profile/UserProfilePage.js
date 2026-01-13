import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LoadingScreen from "../../components/LoadingScreen";

import dayjs from "dayjs";

import { getProfile, updateProfile } from "../../api/endpoints/users";
import { useAuth } from "../../contexts/AuthContext";

export default function UserProfilePage() {
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [errors, setErrors] = useState({});
  const { fetchUser } = useAuth();
  const navigate = useNavigate();

  const [profileInfo, setProfileInfo] = useState({
    name: "",
    username: "",
    phone_country_code: "",
    phone_number: "",
    avatar: "",
    date_of_birth: "",
    country: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    postal_code: "",
    language: "",
    timezone: "",
  });

  useEffect(() => {
    getProfile()
      .then((res) => {
        setProfileInfo(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    setErrors({});

    try {
      const formData = new FormData();

      // Append all profile fields
      for (const key in profileInfo) {
        const value = profileInfo[key];
        if (value !== undefined && value !== null && value !== "") {
          formData.append(key, profileInfo[key]);
        }
      }

      if (profileInfo.avatar && profileInfo.avatar instanceof File) {
        formData.append("avatar", profileInfo.avatar);
      }

      const res = await updateProfile(formData);

      alert(res.data.message);
      setSavingProfile(false);

      fetchUser(); // Update context
      navigate("/dashboard");
    } catch (error) {
      setSavingProfile(false);
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        console.error(error);
        alert("Something went wrong. Please try again.");
      }
    }
  };

  if (loading) return <LoadingScreen />;

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
        Edit Profile
      </Typography>

      {/* -------------------- Basic Info Section -------------------- */}
      <Box mb={5}>
        <Typography variant="h6" mb={4}>
          Basic Information
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            {/* Name */}
            <Grid size={12}>
              <TextField
                fullWidth
                label="Name"
                value={profileInfo.name}
                onChange={(e) =>
                  setProfileInfo({ ...profileInfo, name: e.target.value })
                }
                error={!!errors.name}
                helperText={errors.name?.[0]}
              />
            </Grid>

            {/* Username */}
            <Grid size={12}>
              <TextField
                fullWidth
                label="Username"
                value={profileInfo.username}
                onChange={(e) =>
                  setProfileInfo({ ...profileInfo, username: e.target.value })
                }
                error={!!errors.username}
                helperText={errors.username?.[0]}
              />
            </Grid>

            {/* Date of Birth */}
            <Grid size={12}>
              <TextField
                fullWidth
                label="Date of Birth"
                type="date"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                value={dayjs(profileInfo.date_of_birth).format("YYYY-MM-DD")}
                onChange={(e) =>
                  setProfileInfo({
                    ...profileInfo,
                    date_of_birth: e.target.value,
                  })
                }
                error={!!errors.date_of_birth}
                helperText={errors.date_of_birth?.[0]}
              />
            </Grid>
          </Grid>
        </form>
      </Box>

      {/* -------------------- Profile Picture Section -------------------- */}
      <Box mb={5}>
        <Typography variant="h6" mb={2}>
          Profile Picture
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Avatar */}
          <Grid size={12}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<CloudUploadIcon />}
              >
                Upload Image
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setProfileInfo({
                        ...profileInfo,
                        avatar: e.target.files[0],
                      });
                    }
                  }}
                />
              </Button>

              {profileInfo.avatar && typeof profileInfo.avatar === "object" && (
                <Avatar
                  src={URL.createObjectURL(profileInfo.avatar)}
                  alt="avatar preview"
                  sx={{ width: 80, height: 80 }}
                />
              )}
            </Box>

            {errors.avatar && (
              <Typography color="error" variant="caption">
                {errors.avatar[0]}
              </Typography>
            )}
          </Grid>
        </form>
      </Box>

      {/* -------------------- Contact Information Section -------------------- */}
      <Box mb={5}>
        <Typography variant="h6" mb={4}>
          Contact Information
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            {/* Phone (Country Code + Phone Number) */}
            <Grid size={3}>
              <TextField
                fullWidth
                label="Country Code"
                placeholder="+1"
                value={profileInfo.phone_country_code}
                onChange={(e) =>
                  setProfileInfo({
                    ...profileInfo,
                    phone_country_code: e.target.value,
                  })
                }
                error={!!errors.phone_country_code}
                helperText={errors.phone_country_code?.[0]}
              />
            </Grid>
            <Grid size={9}>
              <TextField
                fullWidth
                label="Phone Number"
                value={profileInfo.phone_number}
                onChange={(e) =>
                  setProfileInfo({
                    ...profileInfo,
                    phone_number: e.target.value,
                  })
                }
                error={!!errors.phone_number}
                helperText={errors.phone_number?.[0]}
              />
            </Grid>

            {/* Address Line 1 */}
            <Grid size={12}>
              <TextField
                fullWidth
                label="Address Line 1"
                value={profileInfo.address_line1}
                onChange={(e) =>
                  setProfileInfo({
                    ...profileInfo,
                    address_line1: e.target.value,
                  })
                }
                error={!!errors.address_line1}
                helperText={errors.address_line1?.[0]}
              />
            </Grid>

            {/* Address Line 2 */}
            <Grid size={12}>
              <TextField
                fullWidth
                label="Address Line 2 (Optional)"
                value={profileInfo.address_line2}
                onChange={(e) =>
                  setProfileInfo({
                    ...profileInfo,
                    address_line2: e.target.value,
                  })
                }
                error={!!errors.address_line2}
                helperText={errors.address_line2?.[0]}
              />
            </Grid>

            {/* City */}
            <Grid size={12}>
              <TextField
                fullWidth
                label="City"
                value={profileInfo.city}
                onChange={(e) =>
                  setProfileInfo({ ...profileInfo, city: e.target.value })
                }
                error={!!errors.city}
                helperText={errors.city?.[0]}
              />
            </Grid>

            {/* State */}
            <Grid size={12}>
              <TextField
                fullWidth
                label="State"
                value={profileInfo.state}
                onChange={(e) =>
                  setProfileInfo({ ...profileInfo, state: e.target.value })
                }
                error={!!errors.state}
                helperText={errors.state?.[0]}
              />
            </Grid>

            {/* Postal Code */}
            <Grid size={12}>
              <TextField
                fullWidth
                label="Postal Code"
                value={profileInfo.postal_code}
                onChange={(e) =>
                  setProfileInfo({
                    ...profileInfo,
                    postal_code: e.target.value,
                  })
                }
                error={!!errors.postal_code}
                helperText={errors.postal_code?.[0]}
              />
            </Grid>
          </Grid>
        </form>
      </Box>

      {/* -------------------- Preferences Section -------------------- */}
      <Box mb={5}>
        <Typography variant="h6" mb={4}>
          Preferences
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            {/* Language */}
            <Grid size={12}>
              <TextField
                fullWidth
                label="Language"
                value={profileInfo.language}
                disabled
                onChange={(e) =>
                  setProfileInfo({ ...profileInfo, language: e.target.value })
                }
                error={!!errors.language}
                helperText={errors.language?.[0]}
              />
            </Grid>

            {/* Timezone */}
            <Grid size={12}>
              <TextField
                fullWidth
                label="Timezone"
                value={profileInfo.timezone}
                disabled
                onChange={(e) =>
                  setProfileInfo({ ...profileInfo, timezone: e.target.value })
                }
                error={!!errors.timezone}
                helperText={errors.timezone?.[0]}
              />
            </Grid>
          </Grid>

          <SaveButton isLoading={savingProfile} text="Update Info" />
        </form>
      </Box>
    </Box>
  );
}
