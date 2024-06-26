import { Link } from "react-router-dom";
import { setBillAsPaid } from "../../services/billsService";

export const Bill = ({ bill, getAndSetBills, paidBills }) => {
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

  const paymentDate = new Date(bill?.paymentDate);

  const handleMarkAsPaid = () => {
    const paidBill = {
      id: bill.id,
      amountDue: bill.amountDue,
      dueDate: bill.dueDate,
      repeatBillId: bill.repeatBillId,
      accountId: bill.accountId,
      paymentDate: new Date().toISOString().split("T")[0],
    };
    setBillAsPaid(paidBill).then(() => {
      getAndSetBills();
    });
  };

  return (
    <section className="bill">
      {!paidBills ? (
        <div
          className={
            daysDifference <= 0
              ? "late-bills"
              : daysDifference >= 1 && daysDifference <= 7
              ? "upcoming-bills"
              : daysDifference > 7
              ? "far-bills"
              : ""
          }
        >
          {daysDifference}
          {daysDifference === 1 ? <div>day</div> : <div>days</div>}
        </div>
      ) : (
        <div className={paymentDate <= dueDate ? "paid-ontime" : "paid-late"}>
          {paymentDate <= dueDate ? "Paid On Time" : "Paid Late"}
        </div>
      )}

      <div className="bill-info-section">
        <div className="bill-info-flex">
          <div>
            <Link
              to={`/bills/${bill.id}/${bill.dueDate}`}
              className="bill-info-link"
            >
              <div className="bill-account-name">
                {bill.account?.accountName}
              </div>
            </Link>
          </div>
          <div className="bill-due-date">{date}</div>
        </div>
        <div className="bill-amount">
          ${parseFloat(bill.amountDue?.toFixed(2))}
        </div>
      </div>



      {/* <button id="bill-checkbox" onClick={handleMarkAsPaid}>
        <i className="material-icons">check_circle</i>
      </button>
    </section>
  );
};
