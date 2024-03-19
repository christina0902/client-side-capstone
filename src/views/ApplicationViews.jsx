import { Routes, Route, Outlet } from "react-router-dom";
import { NavBar } from "../components/nav/NavBar";
import { BillList } from "../components/bills/BillList";
import { AccountsList } from "../components/accounts/AccountsList";
import { AccountDetails } from "../components/forms/AccountDetails";
import { useEffect, useState } from "react";
import { BillDetails } from "../components/forms/BillDetails";
import { CreateNewBillForm } from "../components/forms/CreateNewBillForm";
export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const localUser = localStorage.getItem("current_user");
    const localUserObject = JSON.parse(localUser);

    setCurrentUser(localUserObject);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route path="bills">
          <Route index element={<BillList currentUser={currentUser} />} />
          <Route
            path="createNewBill"
            element={<CreateNewBillForm currentUser={currentUser} />}
          />
          <Route path=":billId" element={<BillDetails />} />
        </Route>
        <Route path="accounts">
          <Route index element={<AccountsList currentUser={currentUser} />} />
          <Route path=":accountId" element={<AccountDetails />} />
        </Route>
      </Route>
    </Routes>
  );
};
