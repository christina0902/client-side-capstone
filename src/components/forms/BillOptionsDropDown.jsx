import { getRepeatBillOptions } from "../../services/billsService";
import { useState, useEffect } from "react";

export const BillOptionsDropDown = () => {
  const [repeatBillOptions, setRepeatBillOptions] = useState([]);

  useEffect(() => {
    getRepeatBillOptions().then((optionsArray) => {
      setRepeatBillOptions(optionsArray);
    });
  }, []);
  return repeatBillOptions.map((option) => {
    return (
      <option key={option.id} value={option.id}>
        {option.name}
      </option>
    );
  });
};
