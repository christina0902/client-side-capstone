export const BillHeaderBar = ({ monthSetter, monthArray, paidBills }) => {
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() + monthSetter);
  const monthAndYear = currentDate.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const totalPaid = monthArray
    ?.filter((bill) => bill.paymentDate !== "")
    .reduce((accumulator, bill) => accumulator + bill.amountDue, 0);

  const totalUnpaid = monthArray
    ?.filter((bill) => bill.paymentDate === "")
    .reduce((accumulator, bill) => accumulator + bill.amountDue, 0);

  return (
    <div className="bill-header-bar">
      <div>{monthAndYear}</div>
      {paidBills ? (
        <div>${parseFloat(totalPaid?.toFixed(2))}</div>
      ) : (
        <div>${parseFloat(totalUnpaid?.toFixed(2))}</div>
      )}
    </div>
  );
};
