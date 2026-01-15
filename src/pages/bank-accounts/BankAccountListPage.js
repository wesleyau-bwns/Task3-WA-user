import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
} from "@mui/material";

import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AddIcon from "@mui/icons-material/Add";

import LoadingScreen from "../../components/LoadingScreen";
import { getBankAccounts } from "../../api/endpoints/bankAccounts";

export default function BankAccountListPage() {
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getBankAccounts()
      .then((res) => {
        setAccounts(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <Box maxWidth={900} mx="auto">
      <Grid container spacing={3}>
        {accounts.map((account) => (
          <Grid size={6} key={account.id}>
            <Card
              sx={{ cursor: "pointer" }}
              onClick={() => navigate(`/bank-accounts/${account.id}`)}
            >
              <CardContent>
                <Box display="flex" alignItems="center" gap={2} mb={4}>
                  <AccountBalanceIcon />
                  <Typography variant="h6">{account.bank_name}</Typography>
                </Box>

                <Typography variant="body2" mb={2}>
                  Account Holder: {account.account_holder_name}
                </Typography>
                <Typography variant="body2" mb={2}>
                  Account Number: {account.account_number}
                </Typography>
                <Typography variant="body2" mb={2}>
                  Currency: {account.currency_code}
                </Typography>
                <Chip
                  label={account.status.toUpperCase()}
                  color={account.status === "approved" ? "success" : "warning"}
                  size="small"
                  sx={{ mt: 1 }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}

        {accounts.length === 0 && (
          <Box p={4}>
            <Typography>No bank accounts added yet.</Typography>
          </Box>
        )}
      </Grid>

      <Box display="flex" justifyContent="flex-end" mt={4}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/bank-accounts/create")}
        >
          Add Bank Account
        </Button>
      </Box>
    </Box>
  );
}
