import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  deleteBill,
  getBillByBillId,
  updateBill,
} from "../../services/billsService";
import { Link } from "react-router-dom";
import { BillOptionsDropDown } from "./BillOptionsDropDown";
import "./Forms.css";

export const BillDetails = () => {
  const { billId } = useParams();
  const [bill, setBill] = useState();
  const [editBill, setEditBill] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getBillByBillId(parseInt(billId)).then((billObj) => {
      setBill(billObj);
    });
  }, [billId]);

  const handleInputChange = (event) => {
    const stateCopy = { ...bill };
    stateCopy[event.target.name] = event.target.value;
    setBill(stateCopy);
  };

  const handleSave = (event) => {
    event.preventDefault();
    const updatedBill = {
      id: parseInt(billId),
      amountDue: parseInt(bill.amountDue),
      dueDate: bill.dueDate,
      repeatBillId: parseInt(bill.repeatBillId),
      accountId: bill.accountId,
      paid: bill.paid,
    };
    updateBill(updatedBill).then(() => {
      navigate("/bills");
    });
  };
  const handleDelete = (event) => {
    event.preventDefault();
    if (window.confirm("Please confirm that you want to delete this bill.")) {
      deleteBill(parseInt(billId)).then(() => {
        navigate("/bills");
      });
    }
  };
  return (
    <form className="edit-bill">
      {!editBill ? <h2>Bill Details</h2> : <h2>Edit Bill</h2>}
      <h3>{bill?.account.accountName}</h3>
      <fieldset>
        <div className="form-btns">
          <div className="form-group">
            <Link to="/bills">
              <button className="form-btn-secondary">Cancel</button>
            </Link>
          </div>
          <div className="form-group">
            {!editBill ? (
              <Link>
                <button
                  className="form-btn-secondary"
                  onClick={(event) => {
                    event.preventDefault();
                    setEditBill(true);
                  }}
                >
                  Edit
                </button>
              </Link>
            ) : (
              <button
                className="form-btn-secondary"
                type="button"
                onClick={handleSave}
              >
                Save
              </button>
            )}
          </div>
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label className="form-label">Amount Due</label>
          {!editBill ? (
            <input
              type="number"
              className="form-control"
              readOnly
              value={bill?.amountDue ? bill?.amountDue : ``}
            />
          ) : (
            <input
              type="number"
              name="amountDue"
              className="form-control"
              value={bill?.amountDue ? bill?.amountDue : ``}
              onChange={handleInputChange}
            />
          )}
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label className="form-label">Due Date</label>
          {!editBill ? (
            <input
              type="date"
              className="form-control"
              readOnly
              value={bill?.dueDate ? bill?.dueDate : ``}
            />
          ) : (
            <input
              type="date"
              name="dueDate"
              className="form-control"
              value={bill?.dueDate ? bill?.dueDate : ``}
              onChange={handleInputChange}
            />
          )}
        </div>
      </fieldset>
      {!editBill ? (
        <fieldset>
          <div className="form-group">
            <label className="form-label"> Repeat Bill Every</label>
            <input
              type="text"
              className="form-control"
              readOnly
              value={bill?.repeatBill?.name ? bill?.repeatBill?.name : ``}
            />
          </div>
        </fieldset>
      ) : (
        <fieldset>
          <div className="form-group">
            <label className="form-label">Repeat Bill Every</label>
            <select
              className="form-control"
              name="repeatBillId"
              onChange={handleInputChange}
            >
              <option
                value={bill?.repeatBill?.id ? bill?.repeatBill?.id : ``}
                hidden
              >
                {bill?.repeatBill?.name}
              </option>
              <BillOptionsDropDown />
            </select>
          </div>
        </fieldset>
      )}

      {editBill && (
        <fieldset>
          <div className="form-group">
            <button className="form-btn-primary" onClick={handleDelete}>
              Delete Bill
            </button>
          </div>
        </fieldset>
      )}
    </form>
  );
};
