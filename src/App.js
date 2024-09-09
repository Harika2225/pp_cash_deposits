import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import CashDeposit from "./components/cashDeposits/CashDeposits";
import NewCashDeposit from "./components/cashDepositForm/NewCashDeposit";
import EditCashDeposit from "./components/cashDepositForm/EditCashDeposit";
import { NavBar } from "premiumparking-navbar";
import GlobalStyle from "./assets/stylesheets/globalStyles";
import { navigationMenuOptions } from "./navBarMenuOptions";

function App() {
  return (
    <Router>
      <div>
        <GlobalStyle />
        <NavBar
          className="navbar"
          navigationMenuOptions={navigationMenuOptions}
          userSignedIn={true}
          manageRootPath="/"
          websiteHost="https://www.premiumparking.com"
        />

        <Routes>
          <Route path="/react_cash_deposits" element={<CashDeposit />} />
          <Route path="/react_cash_deposits/new" element={<NewCashDeposit />} />
          <Route
            path="/react_cash_deposits/:id/edit"
            element={<EditCashDeposit />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
