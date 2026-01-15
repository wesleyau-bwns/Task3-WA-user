import protectedApi from "../protectedApi";

export const getBankAccounts = () => {
  return protectedApi.get("/api/bank-accounts");
};

export const getBankAccount = (id) => {
  return protectedApi.get(`/api/bank-accounts/${id}`);
};

export const createBankAccount = (data) => {
  return protectedApi.post("/api/bank-accounts", data);
};

export const updateBankAccount = (id, data) => {
  return protectedApi.put(`/api/bank-accounts/${id}`, data);
};

export const deleteBankAccount = (id) => {
  return protectedApi.delete(`/api/bank-accounts/${id}`);
};
