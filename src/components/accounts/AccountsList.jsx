import { useState, useEffect } from "react";
import "./Accounts.css";
import { getAllAccounts } from "../../services/accountsService";
import { Account } from "./Account";

export const AccountsList = ({ currentUser }) => {
  const [allAccounts, setAllAccounts] = useState([]);
  const [filterAccountsByUser, setFilterAccountsByUser] = useState([]);

  useEffect(() => {
    getAllAccounts().then((accountsArray) => {
      setAllAccounts(accountsArray);
    });
  }, []);

  useEffect(() => {
    const foundAccounts = allAccounts.filter(
      (account) => account.userId === currentUser.id
    );
    setFilterAccountsByUser(foundAccounts);
  }, [allAccounts, currentUser]);

  return (
    <div className="accounts-container">
      <h2 className="accounts-header">Accounts</h2>
      <article className="accounts">
        {filterAccountsByUser.map((account) => {
          return <Account key={account.id} account={account} />;
        })}
      </article>
    </div>
  );
};
