import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  deleteAccount,
  getAccountByAccountId,
  updateAccount,
} from "../../services/accountsService";
import { Link } from "react-router-dom";

export const AccountDetails = () => {
  const { accountId } = useParams();
  const [account, setAccount] = useState({});
  const [editAccount, setEditAccount] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getAccountByAccountId(accountId).then((account) => {
      setAccount(account);
    });
  }, [accountId]);

  const handlePaymentLinkClick = (url) => {
    window.open(url, "_blank");
  };

  const handleInputChange = (event) => {
    const stateCopy = { ...account };
    stateCopy[event.target.name] = event.target.value;
    setAccount(stateCopy);
  };

  const handleSave = (event) => {
    event.preventDefault();
    const udpatedAccount = account;
    updateAccount(udpatedAccount).then(() => {
      navigate("/accounts");
    });
  };
  const handleDelete = (clickEvent) => {
    clickEvent.preventDefault();
    if (
      window.confirm(
        "Please confirm that you want to delete this account. All bills that are asscociated with this account will be deleted!"
      )
    ) {
      deleteAccount(accountId).then(() => {
        navigate("/accounts");
      });
    }
  };
  return (
    <form className="view-account">
      <div className="form-header">
        <fieldset>
          <div className="form-btns">
            <div className="form-group">
              <Link to="/accounts">
                <button className="form-btn-secondary cancel-btn">
                  Cancel
                </button>
              </Link>
            </div>
            {!editAccount ? <h2>Account Details</h2> : <h2>Update Account</h2>}
            {!editAccount ? (
              <div className="form-group">
                <button
                  className="form-btn-secondary edit-btn"
                  onClick={(event) => {
                    event.preventDefault();
                    setEditAccount(true);
                  }}
                >
                  Edit
                </button>
              </div>
            ) : (
              <div className="form-group">
                <Link>
                  <button
                    className="form-btn-secondary save-btn"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </Link>
              </div>
            )}
          </div>
        </fieldset>
      </div>
      <fieldset>
        <div className="form-group">
          <label className="form-label">Account Name</label>
          {!editAccount ? (
            <input
              type="text"
              className="form-control"
              value={account.accountName ? account.accountName : ``}
              readOnly
            />
          ) : (
            <input
              type="text"
              name="accountName"
              required
              className="form-control"
              value={account.accountName ? account.accountName : ``}
              onChange={handleInputChange}
            />
          )}
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label className="form-label">Account Number</label>
          {!editAccount ? (
            <input
              type="text"
              className="form-control"
              value={account.accountNumber ? account.accountNumber : ``}
              readOnly
            />
          ) : (
            <input
              type="text"
              name="accountNumber"
              className="form-control"
              value={account.accountNumber ? account.accountNumber : ``}
              onChange={handleInputChange}
            />
          )}
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label className="form-label">Payment URL </label>
          {!editAccount ? (
            <input
              type="url"
              className="form-control"
              value={account.paymentUrl ? account.paymentUrl : ``}
              readOnly
              onClick={() => {
                handlePaymentLinkClick(account.paymentUrl);
              }}
            />
          ) : (
            <input
              type="url"
              name="paymentUrl"
              className="form-control"
              value={account.paymentUrl ? account.paymentUrl : ``}
              onChange={handleInputChange}
            />
          )}
        </div>
      </fieldset>
      {editAccount ? (
        <fieldset>
          <div className="form-group">
            <button className="form-btn-primary" onClick={handleDelete}>
              Delete Account{" "}
            </button>
          </div>
        </fieldset>
      ) : (
        ""
      )}
    </form>
  );
};
