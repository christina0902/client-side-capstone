export const BillFooterBar = ({ combinedMonths, paidBills }) => {
  const currentMonthTotal = combinedMonths.currentMonth
    ?.filter((bill) => bill.paymentDate === "")
    .reduce((accumulator, bill) => accumulator + bill.amountDue, 0);

  const NextMonthTotal = combinedMonths.nextMonth
    ?.filter((bill) => bill.paymentDate === "")
    .reduce((accumulator, bill) => accumulator + bill.amountDue, 0);

  const SecondNextMonthTotal = combinedMonths.secondNextMonth
    ?.filter((bill) => bill.paymentDate === "")
    .reduce((accumulator, bill) => accumulator + bill.amountDue, 0);

  const totalUnpaid = currentMonthTotal + NextMonthTotal + SecondNextMonthTotal;

  const paidCurrentMonthTotal = combinedMonths.currentMonth
    ?.filter((bill) => bill.paymentDate !== "")
    .reduce((accumulator, bill) => accumulator + bill.amountDue, 0);

  const paidNextMonthTotal = combinedMonths.nextMonth
    ?.filter((bill) => bill.paymentDate !== "")
    .reduce((accumulator, bill) => accumulator + bill.amountDue, 0);

  const paidSecondNextMonthTotal = combinedMonths.secondNextMonth
    ?.filter((bill) => bill.paymentDate !== "")
    .reduce((accumulator, bill) => accumulator + bill.amountDue, 0);

  const totalPaid =
    paidCurrentMonthTotal + paidNextMonthTotal + paidSecondNextMonthTotal;

  return (
    <div className="bill-footer-bar">
      <div>TOTAL:</div>
      {paidBills ? <div>${totalPaid}</div> : <div>${totalUnpaid}</div>}
    </div>
  );
};
