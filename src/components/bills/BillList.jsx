import { useState, useEffect } from "react";
import { getAllBills } from "../../services/billsService";
import { Bill } from "./BIll";
import { BillHeaderBar } from "./BillHeaderBar";
import "./Bills.css";
import { Link } from "react-router-dom";

export const BillList = ({ currentUser }) => {
  const [allBills, setAllBills] = useState([]);
  const [filterBillsByDate, setFilterBillsByDate] = useState({});
  const [filterBillsByUser, setFilterBillsByUser] = useState([]);

  useEffect(() => {
    getAndSetBills();
  }, []);

  const getAndSetBills = () => {
    getAllBills().then((billsArray) => {
      setAllBills(billsArray);
    });
  };

  useEffect(() => {
    const foundBills = allBills.filter(
      (bill) => bill.account?.userId === currentUser.id && !bill.paid
    );
    setFilterBillsByUser(foundBills);
  }, [allBills, currentUser]);

  useEffect(() => {
    const filteredMonthsObj = {};

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const nextMonth = currentMonth + 1;
    const secondNextMonth = currentMonth + 2;

    const filteredCurrentMonth = filterBillsByUser.filter((bill) => {
      const billMonth = new Date(bill.dueDate).getMonth();
      const billYear = new Date(bill.dueDate).getFullYear();

      const isWithinTargetMonths =
        billYear === currentDate.getFullYear() && billMonth === currentMonth;

      return isWithinTargetMonths;
    });
    filteredCurrentMonth.sort(
      (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
    );

    const filteredNextMonth = filterBillsByUser.filter((bill) => {
      const billMonth = new Date(bill.dueDate).getMonth();
      const billYear = new Date(bill.dueDate).getFullYear();

      const isWithinTargetMonths =
        billYear === currentDate.getFullYear() && billMonth === nextMonth;

      return isWithinTargetMonths;
    });
    filteredNextMonth.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    const filteredSecondNextMonth = filterBillsByUser.filter((bill) => {
      const billMonth = new Date(bill.dueDate).getMonth();
      const billYear = new Date(bill.dueDate).getFullYear();

      const isWithinTargetMonths =
        billYear === currentDate.getFullYear() && billMonth === secondNextMonth;

      return isWithinTargetMonths;
    });
    filteredSecondNextMonth.sort(
      (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
    );

    filteredMonthsObj.currentMonth = filteredCurrentMonth;
    filteredMonthsObj.nextMonth = filteredNextMonth;
    filteredMonthsObj.secondNextMonth = filteredSecondNextMonth;

    setFilterBillsByDate(filteredMonthsObj);
  }, [allBills, filterBillsByUser]);

  return (
    <div className="bills-contaienr">
      <h2>Upcoming Bills</h2>
      <Link to="/bills/createNewBill">
        <button className="add-bill-btn">Add</button>
      </Link>
      <div className="bills">
        <div className="bills-month-container">
          <BillHeaderBar
            monthSetter={0}
            monthArray={filterBillsByDate?.currentMonth}
          />
          <article className="bills">
            {filterBillsByDate.currentMonth?.map((bill) => {
              return (
                <Bill
                  key={bill.id}
                  bill={bill}
                  getAndSetBills={getAndSetBills}
                />
              );
            })}
          </article>
        </div>
        <div className="bills-month-container">
          <BillHeaderBar
            monthSetter={1}
            monthArray={filterBillsByDate?.nextMonth}
          />
          <article className="bills">
            {filterBillsByDate.nextMonth?.map((bill) => {
              return (
                <Bill
                  key={bill.id}
                  bill={bill}
                  getAndSetBills={getAndSetBills}
                />
              );
            })}
          </article>
        </div>
        <div className="bills-month-container">
          <BillHeaderBar
            monthSetter={2}
            monthArray={filterBillsByDate?.secondNextMonth}
          />
          <article className="bills">
            {filterBillsByDate.secondNextMonth?.map((bill) => {
              return (
                <Bill
                  key={bill.id}
                  bill={bill}
                  getAndSetBills={getAndSetBills}
                />
              );
            })}
          </article>
        </div>
      </div>
    </div>
  );
};
