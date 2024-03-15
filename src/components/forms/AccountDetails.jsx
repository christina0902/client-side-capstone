import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAccountByAccountId } from "../../services/accountsService";
import { Link } from "react-router-dom";

export const AccountDetails = () => {
  const { accountId } = useParams();
  const [account, setAccount] = useState({});
  const [editAccount, setEditAccount] = useState(false);

  useEffect(() => {
    getAccountByAccountId(accountId).then((account) => {
      setAccount(account);
    });
  }, [accountId]);

  const handlePaymentLinkClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <form className="view-account">
      {!editAccount ? <h2>Account Details</h2> : <h2>Update Account</h2>}
      <fieldset>
        <div className="form-btns">
          <div className="form-group">
            <Link to="/accounts">
              <button className="form-btn-secondary">Cancel</button>
            </Link>
          </div>
          {!editAccount ? (
            <div className="form-group">
              <button
                className="form-btn-secondary"
                onClick={(e) => {
                  e.preventDefault();
                  setEditAccount(true);
                }}
              >
                Edit
              </button>
            </div>
          ) : (
            <div className="form-group">
              <Link>
                <button className="form-btn-secondary">Save</button>
              </Link>
            </div>
          )}
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Account Name</label>
          {!editAccount ? (
            <input
              type="text"
              className="form-control"
              value={account.accountName}
              readOnly
            />
          ) : (
            <input
              type="text"
              required
              className="form-control"
              defaultValue={account.accountName}
            />
          )}
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Account Number</label>
          {!editAccount ? (
            <input
              type="text"
              className="form-control"
              value={account.accountNumber}
              readOnly
            />
          ) : (
            <input
              type="text"
              className="form-control"
              defaultValue={account.accountNumber}
            />
          )}
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Payment URL </label>
          {!editAccount ? (
            <input
              type="url"
              className="form-control"
              value={account.paymentUrl}
              readOnly
              onClick={() => {
                handlePaymentLinkClick(account.paymentUrl);
              }}
            />
          ) : (
            <input
              type="url"
              className="form-control"
              defaultValue={account.paymentUrl}
            />
          )}
        </div>
      </fieldset>
      {editAccount ? (
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
