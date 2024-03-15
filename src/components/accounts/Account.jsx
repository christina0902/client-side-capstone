import { Link } from "react-router-dom";

export const Account = ({ account }) => {
  return (
    <section className="account">
      <div className="account-info">{account.accountName}</div>
      <div className="ticket-btn-container">
        <Link to={`/accounts/${account.id}`}>
          <button>View</button>
        </Link>
      </div>
    </section>
  );
};
