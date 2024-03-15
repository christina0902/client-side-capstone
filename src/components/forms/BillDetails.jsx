import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBillByBillId } from "../../services/billsService";
import { Link } from "react-router-dom";
import { BillOptionsDropDown } from "./BillOptionsDropDown";

export const BillDetails = ({ billOption }) => {
  const { billId } = useParams();
  const [bill, setBill] = useState();
  const [editBill, setEditBill] = useState(false);

  useEffect(() => {
    getBillByBillId(billId).then((bilObj) => {
      setBill(bilObj);
    });
  }, [billId]);
  const date = new Date(bill?.dueDate);
  const dueDate = date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
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
                  onClick={() => {
                    setEditBill(true);
                  }}
                >
                  Edit
                </button>
              </Link>
            ) : (
              <button className="form-btn=-secondary">Save</button>
            )}
          </div>
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label>Amount Due</label>
          {!editBill ? (
            <input
              type="number"
              className="form-control"
              readOnly
              value={bill?.amountDue}
            />
          ) : (
            <input
              type="number"
              className="form-control"
              defaultValue={bill?.amountDue}
            />
          )}
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Due Date</label>
          {!editBill ? (
            <input
              type="date"
              className="form-control"
              readOnly
              value={bill?.dueDate}
            />
          ) : (
            <input
              type="date"
              className="form-control"
              defaultValue={bill?.dueDate}
            />
          )}
        </div>
      </fieldset>
      {!editBill ? (
        <fieldset>
          <div className="form-group">
            <label> Repeat Bill Every</label>
            <input
              type="text"
              className="form-control"
              readOnly
              value={bill?.repeatBill?.name}
            />
          </div>
        </fieldset>
      ) : (
        <fieldset>
          <div className="form-group">
            <label>Repeat Bill Every</label>
            <select name="repeat-bill">
              <option value={bill?.repeatBill?.id} selected disabled hidden>
                {bill?.repeatBill?.name}
              </option>
              <BillOptionsDropDown />
            </select>
          </div>
        </fieldset>
      )}

      {editBill ? (
        <fieldset>
          <div className="form-group">
            <button className="form-btn-primary">Delete Account </button>
          </div>
        </fieldset>
      ) : (
        ""
      )}
    </form>
  );
};
