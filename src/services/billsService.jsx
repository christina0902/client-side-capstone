export const getAllBills = async () => {
  return await fetch("http://localhost:8088/bills?_expand=account").then(
    (res) => res.json()
  );
};
export const setBillAsPaid = async (bill) => {
  return await fetch(`http://localhost:8088/bills/${bill.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bill),
  });
};

export const getBillByBillId = async (billId) => {
  return await fetch(
    `http://localhost:8088/bills/${billId}?_expand=account&_expand=repeatBill`
  ).then((res) => res.json());
};

export const getRepeatBillOptions = async () => {
  return await fetch("http://localhost:8088/repeatBills").then((res) =>
    res.json()
  );
};

export const updateBill = async (bill) => {
  return await fetch(`http://localhost:8088/bills/${bill.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bill),
  });
};

export const deleteBill = async (billId) => {
  return await fetch(`http://localhost:8088/bills/${billId}`, {
    method: "DELETE",
  });
};

export const createBill = async (bill) => {
  return await fetch("http://localhost:8088/bills", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bill),
  }).then((res) => res.json());
};
