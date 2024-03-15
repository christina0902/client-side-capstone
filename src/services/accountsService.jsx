export const getAllAccounts = async () => {
  return await fetch("http://localhost:8088/accounts").then((res) =>
    res.json()
  );
};

export const getAccountByAccountId = async (accountId) => {
  return await fetch(`http://localhost:8088/accounts/${accountId}`).then(
    (res) => res.json()
  );
};
