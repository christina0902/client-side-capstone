import { useState, useEffect } from "react";
import { createBill, getAllBills } from "../../services/billsService";
import { Bill } from "./BIll";
import { BillHeaderBar } from "./BillHeaderBar";
import "./Bills.css";
import { Link } from "react-router-dom";

export const BillList = ({ currentUser }) => {
  const [allBills, setAllBills] = useState([]);
  const [filterBillsByDate, setFilterBillsByDate] = useState({});
  const [filterBillsByUser, setFilterBillsByUser] = useState([]);
  const [paidBills, setPaidBills] = useState(false);

  useEffect(() => {
    getAndSetBills();
  }, []);

  // 1, Get all bills regardless of owner,
  // 2, filter through those bills and get only bills(Original) belonging to the current user.
  // 3, Check if the OriginalBill has a repeatBillId that is greater than 1. Calculate New Duedates.
  // 4, After checking if the bill does not already exist within your database POST that repeat bill.
  // 5, If you created a new bill. Push that into your filtered bills, (Filtered Bills will have both Original Bills, and RepeatedBills(New) and RepeatedBills(Old/Already In Database)   )

  // This is the function that gets all bills, and creates repeated bills based on those
  const getAndSetBills = () => {
    getAllBills().then((billsArray) => {
      setAllBills(billsArray);
    });
  };

  useEffect(() => {
    const foundBills = allBills.filter(
      (bill) => bill.account?.userId === currentUser.id
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

  const calculateNewDueDate = (dueDate, repeatBillId) => {
    const dueDates = [];
    const currentDate = new Date(dueDate);

    for (let i = 0; i < 50; i++) {
      switch (repeatBillId) {
        case 2:
          currentDate.setDate(currentDate.getDate() + 7);
          break;
        case 3:
          currentDate.setDate(currentDate.getDate() + 14);
          break;
        case 4:
          currentDate.setDate(currentDate.getDate() + 21);
          break;
        case 5:
          currentDate.setDate(currentDate.getDate() + 28);
          break;
        case 6:
          const dayOfMonth = currentDate.getDate();
          if (dayOfMonth < 15) {
            currentDate.setDate(15);
          } else {
            currentDate.setMonth(currentDate.getMonth() + 1);
            currentDate.setDate(1);
          }
          break;
        case 7:
          currentDate.setMonth(currentDate.getMonth() + 1);
          break;
        case 8:
          currentDate.setMonth(currentDate.getMonth() + 2);
          break;
        case 9:
          currentDate.setMonth(currentDate.getMonth() + 3);
          break;
        case 10:
          currentDate.setMonth(currentDate.getMonth() + 4);
          break;
        case 11:
          currentDate.setMonth(currentDate.getMonth() + 6);
          break;
        case 12:
          currentDate.setFullYear(currentDate.getFullYear() + 1);
          break;
        case 13:
          currentDate.setFullYear(currentDate.getFullYear() + 2);
          break;
        case 14:
          currentDate.setFullYear(currentDate.getFullYear() + 3);
          break;
        case 15:
          currentDate.setFullYear(currentDate.getFullYear() + 4);
          break;
        case 16:
          currentDate.setFullYear(currentDate.getFullYear() + 5);
          break;
      }
      dueDates.push(currentDate.toISOString().split("T")[0]);
    }
    return dueDates;
  };

  return (
    <div className="bills-container">
      <div className="bills-header-container">
        <div className="bills-header">
          <div>
            <button
              className={
                !paidBills ? "bills-header-btn-active" : "bills-header-btn"
              }
              onClick={() => {
                {
                  paidBills ? setPaidBills(false) : setPaidBills(false);
                }
              }}
            >
              Upcoming
            </button>
          </div>

          <div>
            <button
              className={
                paidBills ? "bills-header-btn-active" : "bills-header-btn"
              }
              onClick={() => {
                {
                  paidBills ? setPaidBills(true) : setPaidBills(true);
                }
              }}
            >
              Paid
            </button>
          </div>
        </div>
        <Link to="/bills/createNewBill">
          <button className="add-bill-btn material-symbols-outlined">
            Add
          </button>
        </Link>
      </div>

      <div className="bills">
        <div className="bills-month-container">
          <BillHeaderBar
            monthSetter={0}
            monthArray={filterBillsByDate?.currentMonth}
            paidBills={paidBills}
          />
          <article className="bills">
            {!paidBills
              ? filterBillsByDate.currentMonth
                  ?.filter((bill) => bill.paid === false)
                  .map((bill) => {
                    return (
                      <Bill
                        key={`${bill.id} ${bill.dueDate}`}
                        bill={bill}
                        getAndSetBills={getAndSetBills}
                      />
                    );
                  })
              : filterBillsByDate.currentMonth
                  ?.filter((bill) => bill.paid === true)
                  .map((bill) => {
                    return (
                      <Bill
                        key={`${bill.id} ${bill.dueDate}`}
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
            paidBills={paidBills}
          />
          <article className="bills">
            {!paidBills
              ? filterBillsByDate.nextMonth
                  ?.filter((bill) => bill.paid === false)
                  .map((bill) => {
                    return (
                      <Bill
                        key={`${bill.id} ${bill.dueDate}`}
                        bill={bill}
                        getAndSetBills={getAndSetBills}
                      />
                    );
                  })
              : filterBillsByDate.nextMonth
                  ?.filter((bill) => bill.paid === true)
                  .map((bill) => {
                    return (
                      <Bill
                        key={`${bill.id} ${bill.dueDate}`}
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
            paidBills={paidBills}
          />
          <article className="bills">
            {!paidBills
              ? filterBillsByDate.secondNextMonth
                  ?.filter((bill) => bill.paid === false)
                  .map((bill) => {
                    return (
                      <Bill
                        key={`${bill.id} ${bill.dueDate}`}
                        bill={bill}
                        getAndSetBills={getAndSetBills}
                      />
                    );
                  })
              : filterBillsByDate.secondNextMonth
                  ?.filter((bill) => bill.paid === true)
                  .map((bill) => {
                    return (
                      <Bill
                        key={`${bill.id} ${bill.dueDate}`}
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
