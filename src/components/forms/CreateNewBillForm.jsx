import { Link, useNavigate } from "react-router-dom";
import { BillOptionsDropDown } from "./BillOptionsDropDown";
import { useState } from "react";
import { createBill } from "../../services/billsService";
import { AccountOptionsDropDown } from "./AccountNameDropDown";
import { calculateNewDueDate } from "../bills/CalculateNewDueDates";

export const CreateNewBillForm = ({ currentUser }) => {
  const [newBill, setNewBill] = useState({
    repeatBillId: 1,
    amountDue: 0,
    dueDate: new Date().toISOString().split("T")[0],
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const stateCopy = { ...newBill };
    stateCopy[event.target.name] = event.target.value;
    setNewBill(stateCopy);
  };

  const handleSave = (event) => {
    event.preventDefault();
    if (newBill.accountId > 0) {
      const createdBill = {
        amountDue: parseInt(newBill.amountDue),
        dueDate: newBill.dueDate,
        repeatBillId: parseInt(newBill.repeatBillId),
        accountId: parseInt(newBill.accountId),
        paymentDate: "",
      };

      createBill(createdBill).then((newlyPostedBill) => {
        if (
          newlyPostedBill.hasOwnProperty("id") &&
          newlyPostedBill.repeatBillId > 1
        ) {
          const newDueDates = calculateNewDueDate(
            newlyPostedBill?.dueDate,
            newlyPostedBill?.repeatBillId
          );

          newDueDates.forEach((dueDate) => {
            const repeatedBillInstance = {
              ...newlyPostedBill,
              dueDate,
              originalBillId: newlyPostedBill.id,
            };
            delete repeatedBillInstance.id;
            createBill(repeatedBillInstance);
          });
        } else {
          navigate("/bills");
        }
      });
    }
    navigate("/bills");
  };

  return (
    <form className="create-bill" onSubmit={handleSave}>
      <div className="form-header">
        {/* <fieldset> */}
        {/* <div className="form-btns"> */}
        <div className="form-group">
          <Link to="/bills">
            <button className="form-btn-secondary cancel-btn">Cancel</button>
          </Link>
        </div>
        <h2 className="bill-form-title">Create New Bill</h2>
        <div className="form-group">
          <button className="form-btn-secondary save-btn" type="submit">
            Save
          </button>
        </div>
        {/* </div> */}
        {/* </fieldset> */}
      </div>
      <fieldset>
        <div className="form-group">
          <label className="form-label">Account Name</label>
          <select
            className="form-control"
            required
            name="accountId"
            defaultValue={0}
            onChange={handleInputChange}
          >
            <option value={0} disabled hidden>
              Select an account
            </option>
            <AccountOptionsDropDown currentUser={currentUser} />
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label className="form-label">Amount Due</label>
          <input
            name="amountDue"
            type="number"
            step={0.01}
            placeholder="0.00"
            className="form-control"
            onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label className="form-label">Due Date</label>
          <input
            name="dueDate"
            type="date"
            className="form-control"
            onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label className="form-label">Repeat Bill Every</label>
          <select
            className="form-control"
            name="repeatBillId"
            onChange={handleInputChange}
          >
            <BillOptionsDropDown />
          </select>
        </div>
      </fieldset>
    </form>
  );
};
