import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Grid } from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";

import LoadingScreen from "../../components/LoadingScreen";
import { createBankAccount } from "../../api/endpoints/bankAccounts";

export default function BankAccountCreatePage() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [bankInfo, setBankInfo] = useState({
    bank_name: "",
    account_holder_name: "",
    account_number: "",
    iban: "",
    swift_code: "",
    country_code: "",
    currency_code: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const res = await createBankAccount(bankInfo);
      alert(res.data.message || "Bank account submitted for verification");
      setLoading(false);
      navigate("/bank-accounts");
    } catch (error) {
      setLoading(false);
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        console.error(error);
        alert("Something went wrong. Please try again.");
      }
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <Box maxWidth={800} mx="auto">
      <Typography variant="h5" mb={3}>
        Add Bank Account
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          {/* Bank Name */}
          <Grid size={12}>
            <TextField
              fullWidth
              label="Bank Name"
              value={bankInfo.bank_name}
              onChange={(e) =>
                setBankInfo({ ...bankInfo, bank_name: e.target.value })
              }
              error={!!errors.bank_name}
              helperText={errors.bank_name?.[0]}
            />
          </Grid>

          {/* Account Holder Name */}
          <Grid size={12}>
            <TextField
              fullWidth
              label="Account Holder Name"
              value={bankInfo.account_holder_name}
              onChange={(e) =>
                setBankInfo({
                  ...bankInfo,
                  account_holder_name: e.target.value,
                })
              }
              error={!!errors.account_holder_name}
              helperText={errors.account_holder_name?.[0]}
            />
          </Grid>

          {/* Account Number */}
          <Grid size={12}>
            <TextField
              fullWidth
              label="Account Number"
              value={bankInfo.account_number}
              onChange={(e) =>
                setBankInfo({
                  ...bankInfo,
                  account_number: e.target.value,
                })
              }
              error={!!errors.account_number}
              helperText={errors.account_number?.[0]}
            />
          </Grid>

          {/* IBAN */}
          <Grid size={12}>
            <TextField
              fullWidth
              label="IBAN (Optional)"
              value={bankInfo.iban}
              onChange={(e) =>
                setBankInfo({ ...bankInfo, iban: e.target.value })
              }
              error={!!errors.iban}
              helperText={errors.iban?.[0]}
            />
          </Grid>

          {/* Swift Code */}
          <Grid size={12}>
            <TextField
              fullWidth
              label="SWIFT / BIC Code (Optional)"
              value={bankInfo.swift_code}
              onChange={(e) =>
                setBankInfo({ ...bankInfo, swift_code: e.target.value })
              }
              error={!!errors.swift_code}
              helperText={errors.swift_code?.[0]}
            />
          </Grid>

          {/* Country Code */}
          <Grid size={6}>
            <TextField
              fullWidth
              label="Country Code"
              placeholder="US"
              value={bankInfo.country_code}
              onChange={(e) =>
                setBankInfo({
                  ...bankInfo,
                  country_code: e.target.value.toUpperCase(),
                })
              }
              error={!!errors.country_code}
              helperText={errors.country_code?.[0]}
            />
          </Grid>

          {/* Currency Code */}
          <Grid size={6}>
            <TextField
              fullWidth
              label="Currency Code"
              placeholder="USD"
              value={bankInfo.currency_code}
              onChange={(e) =>
                setBankInfo({
                  ...bankInfo,
                  currency_code: e.target.value.toUpperCase(),
                })
              }
              error={!!errors.currency_code}
              helperText={errors.currency_code?.[0]}
            />
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="space-between" mt={4}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/bank-accounts")}
          >
            Back
          </Button>
          <Button
            type="submit"
            variant="contained"
            startIcon={<CheckIcon />}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </Box>
      </form>
    </Box>
  );
}
