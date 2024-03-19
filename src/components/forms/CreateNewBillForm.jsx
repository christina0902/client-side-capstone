import { Link, useNavigate } from "react-router-dom";
import { BillOptionsDropDown } from "./BillOptionsDropDown";
import { useState } from "react";
import { createAccount } from "../../services/accountsService";
import { createBill } from "../../services/billsService";

export const CreateNewBillForm = ({ currentUser }) => {
  const [newBill, setNewBill] = useState({
    repeatBillId: 0,
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
    const Account = {
      accountName: newBill.accountName,
      accountNumber: newBill.accountNumber,
      paymentUrl: newBill.paymentUrl,
      userId: currentUser.id,
    };

    createAccount(Account).then((createdAccount) => {
      if (createdAccount.hasOwnProperty("id")) {
        createBill({
          amountDue: parseInt(newBill.amountDue),
          dueDate: newBill.dueDate,
          repeatBillId: parseInt(newBill.repeatBillId),
          accountId: createdAccount.id,
          paid: false,
        });

        navigate("/bills");
      }
    });
  };
  return (
    <form className="create-bill" onSubmit={handleSave}>
      <h2>Create New Bill</h2>
      <fieldset>
        <div className="form-btns">
          <div className="form-group">
            <Link to="/bills">
              <button className="form-btn-secondary">Cancel</button>
            </Link>
          </div>
          <div className="form-group">
            <button className="form-btn-secondary" type="submit">
              Save
            </button>
          </div>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label className="form-label">Account Name</label>
          <input
            name="accountName"
            type="text"
            required
            className="form-control"
            onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label className="form-label">Account Number</label>
          <input
            name="accountNumber"
            type="text"
            placeholder="Optional"
            className="form-control"
            onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label className="form-label">Payment URL </label>
          <input
            name="paymentUrl"
            type="url"
            placeholder="Optional"
            className="form-control"
            onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label className="form-label">Amount Due</label>
          <input
            name="amountDue"
            type="text"
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
