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

export const updateAccount = async (account) => {
  return await fetch(`http://localhost:8088/accounts/${account.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(account),
  });
};

export const deleteAccount = async (accountId) => {
  return await fetch(`http://localhost:8088/accounts/${accountId}`, {
    method: "DELETE",
  });
};

export const createAccount = async (account) => {
  return await fetch("http://localhost:8088/accounts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(account),
  }).then((res) => res.json());
};

export const getAccountsByUserId = async (currentUser) => {
  return await fetch(
    `http://localhost:8088/accounts?userId=${currentUser}`
  ).then((res) => res.json());
};
