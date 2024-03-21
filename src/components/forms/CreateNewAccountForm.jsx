import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createAccount } from "../../services/accountsService";

export const CreateNewAccountForm = ({ currentUser }) => {
  const [account, setAccount] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const stateCopy = { ...account };
    stateCopy[event.target.name] = event.target.value;
    setAccount(stateCopy);
  };

  const handleSave = (event) => {
    event.preventDefault();
    const Account = {
      accountName: account.accountName,
      accountNumber: account.accountNumber,
      paymentUrl: account.paymentUrl,
      userId: currentUser.id,
    };

    createAccount(Account).then(() => {
      navigate("/accounts");
    });
  };

  return (
    <form className="create-bill" onSubmit={handleSave}>
      <h2>Create New Account</h2>
      <fieldset>
        <div className="form-btns">
          <div className="form-group">
            <Link to="/accounts">
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
    </form>
  );
};
