import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Grid } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LoadingScreen from "../../components/LoadingScreen";

import {
  getBankAccount,
  updateBankAccount,
} from "../../api/endpoints/bankAccounts";

export default function BankAccountEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [bankInfo, setBankInfo] = useState({
    bank_name: "",
    account_holder_name: "",
    account_number: "",
    iban: "",
    swift_code: "",
    country_code: "",
    currency_code: "",
  });

  useEffect(() => {
    getBankAccount(id)
      .then((res) => {
        setBankInfo(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to fetch bank account.");
        navigate("/bank-accounts");
      });
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrors({});

    try {
      const res = await updateBankAccount(id, bankInfo);
      alert(res.data.message || "Bank account updated successfully");
      navigate(`/bank-accounts/${id}`);
    } catch (err) {
      setSaving(false);
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors);
      } else {
        console.error(err);
        alert("Something went wrong. Please try again.");
      }
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <Box maxWidth={800} mx="auto">
      <Typography variant="h5" mb={4}>
        Edit Bank Account
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={4}>
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

          <Grid size={12}>
            <TextField
              fullWidth
              label="Account Number"
              value={bankInfo.account_number}
              onChange={(e) =>
                setBankInfo({ ...bankInfo, account_number: e.target.value })
              }
              error={!!errors.account_number}
              helperText={errors.account_number?.[0]}
            />
          </Grid>

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

          <Grid size={12}>
            <TextField
              fullWidth
              label="SWIFT / BIC (Optional)"
              value={bankInfo.swift_code}
              onChange={(e) =>
                setBankInfo({ ...bankInfo, swift_code: e.target.value })
              }
              error={!!errors.swift_code}
              helperText={errors.swift_code?.[0]}
            />
          </Grid>

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
            onClick={() => navigate(`/bank-accounts/${id}`)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            startIcon={<EditIcon />}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </Button>
        </Box>
      </form>
    </Box>
  );
}
