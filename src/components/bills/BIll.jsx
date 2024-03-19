import { Link } from "react-router-dom";
import { setBillAsPaid } from "../../services/billsService";

export const Bill = ({ bill, getAndSetBills }) => {
  const dueDate = new Date(bill.dueDate);
  const date = dueDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
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
      <button id="bill-checkbox" onClick={handleMarkAsPaid}>
        <i className="material-icons">check_circle</i>
      </button>
      {/* <div className="bill-info"> */}
      {daysDifference === 1 ? (
        <div className="bill-days-info">
          {daysDifference}
          <div>day</div>
        </div>
      ) : (
        <div className="bill-days-info">
          {daysDifference}
          <div>days</div>
        </div>
      )}
      <div className="bill-info-section">
        <div className="bill-info-flex">
          <div>
            <div className="bill-account-name">{bill.account?.accountName}</div>
          </div>
          <div className="bill-due-date">{date}</div>
        </div>
        <div>${bill.amountDue}</div>
      </div>
      {/* </div> */}
      <Link to={`/bills/${bill.id}`}>
        <button className="bill-edit-bn">
          <i className="material-icons">visibility</i>
        </button>
      </Link>
    </section>
  );
};
