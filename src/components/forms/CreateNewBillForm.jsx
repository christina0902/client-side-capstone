import { Link } from "react-router-dom";
import { BillOptionsDropDown } from "./BillOptionsDropDown";

export const CreateNewBillForm = () => {
  return (
    <form className="create-bill">
      <h2>Create New Bill</h2>
      <fieldset>
        <div className="form-btns">
          <div className="form-group">
            <Link to="/bills">
              <button className="form-btn-secondary">Cancel</button>
            </Link>
          </div>
          <div className="form-group">
            <Link>
              <button className="form-btn-secondary">Save</button>
            </Link>
          </div>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Account Name</label>
          <input type="text" required className="form-control" />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Account Number</label>
          <input type="text" placeholder="Optional" className="form-control" />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Payment URL </label>
          <input type="url" placeholder="Optional" className="form-control" />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Amount Due</label>
          <input type="number" placeholder="0.00" className="form-control" />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Due Date</label>
          <input type="date" className="form-control" />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Repeat Bill Every</label>
          <select name="repeat-bill">
            <BillOptionsDropDown />
          </select>
        </div>
      </fieldset>
    </form>
  );
};
