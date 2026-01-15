import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
} from "@mui/material";

import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import LoadingScreen from "../../components/LoadingScreen";
import {
  getBankAccount,
  deleteBankAccount,
} from "../../api/endpoints/bankAccounts";

export default function BankAccountShowPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    getBankAccount(id)
      .then((res) => {
        setAccount(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        alert("Failed to fetch bank account.");
        navigate("/bank-accounts");
      });
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this bank account?")) {
      return;
    }

    setDeleting(true);
    try {
      await deleteBankAccount(id);
      alert("Bank account deleted successfully.");
      navigate("/bank-accounts");
    } catch (err) {
      console.error(err);
      alert("Failed to delete bank account.");
      setDeleting(false);
    }
  };

  if (loading) return <LoadingScreen />;
  if (!account) return null;

  return (
    <Box maxWidth={800} mx="auto">
      <Card mb={4}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <AccountBalanceIcon />
            <Typography variant="h6">{account.bank_name}</Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid size={12}>
              <Typography>
                Account Holder: {account.account_holder_name}
              </Typography>
            </Grid>

            <Grid size={12}>
              <Typography>Account Number: {account.account_number}</Typography>
            </Grid>

            {account.iban && (
              <Grid size={12}>
                <Typography>IBAN: {account.iban}</Typography>
              </Grid>
            )}

            {account.swift_code && (
              <Grid size={12}>
                <Typography>SWIFT/BIC: {account.swift_code}</Typography>
              </Grid>
            )}

            <Grid size={12}>
              <Typography>Country: {account.country_code}</Typography>
            </Grid>

            <Grid size={12}>
              <Typography>Currency: {account.currency_code}</Typography>
            </Grid>

            <Grid size={12}>
              <Chip
                label={account.status.toUpperCase()}
                color={account.status === "approved" ? "success" : "warning"}
                size="small"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box display="flex" justifyContent="space-between" mt={3} width="100%">
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/bank-accounts")}
        >
          Back
        </Button>

        <Box display="flex" gap={1}>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => navigate(`/bank-accounts/${id}/edit`)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
