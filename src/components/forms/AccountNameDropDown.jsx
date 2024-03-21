import { useState, useEffect } from "react";
import { getAccountsByUserId } from "../../services/accountsService";

export const AccountOptionsDropDown = ({ currentUser }) => {
  const [accountOptions, setAccountOptions] = useState([]);

  useEffect(() => {
    if (currentUser.id) {
      getAccountsByUserId(currentUser.id).then((optionsArray) => {
        setAccountOptions(optionsArray);
      });
    }
  }, [currentUser]);

  return accountOptions.map((option) => {
    return (
      <option key={option.id} value={option.id}>
        {option.accountName}
      </option>
    );
  });
};
