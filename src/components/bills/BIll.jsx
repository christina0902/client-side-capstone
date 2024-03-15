import { Link } from "react-router-dom";
import { setBillAsPaid } from "../../services/billsService";

export const Bill = ({ bill, getAndSetBills }) => {
  const dueDate = new Date(bill.dueDate);
  const date = dueDate.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const currentDate = new Date();
  const timeDifference = dueDate - currentDate;

  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  const handleMarkAsPaid = () => {
    const paidBill = {
      id: bill.id,
      amountDue: bill.amountDue,
      dueDate: bill.dueDate,
      repeatBillEveryId: bill.repeatBillEveryId,
      accountId: bill.accountId,
      paid: true,
    };
    setBillAsPaid(paidBill).then(() => {
      getAndSetBills();
    });
  };

  return (
    <section className="bill">
      <input type="checkbox" id="bill-checkbox" onChange={handleMarkAsPaid} />
      <div className="bill-info">
        {daysDifference === 1 ? (
          <div>{daysDifference} day</div>
        ) : (
          <div>{daysDifference} days</div>
        )}
        <div className="bill-info-section">
          <div>{bill.account?.accountName}</div>
          <div>{date}</div>
        </div>
        <div>${bill.amountDue}</div>
      </div>
      <Link to={`/bills/${bill.id}`}>
        <button className="bill-edit-bn">View</button>
      </Link>
    </section>
  );
};
