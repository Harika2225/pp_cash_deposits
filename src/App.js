import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import CashDeposit from "./components/cashDeposits/CashDeposits";
import NewCashDeposit from "./components/cashDepositForm/NewCashDeposit";
import EditCashDeposit from "./components/cashDepositForm/EditCashDeposit";
import { NavBar } from "pp-navbar";
import GlobalStyle from "./assets/stylesheets/globalStyles";
import NavBarStyle from "./assets/stylesheets/NavBarStyle";
import { navigationMenuOptions } from "./navBarMenuOptions";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <Router>
      <UserProvider>
        <div>
          <GlobalStyle />
          <NavBarStyle />
          <NavBar
            className="navbar"
            navigationMenuOptions={navigationMenuOptions}
            userSignedIn={true}
            manageRootPath="/"
            websiteHost="https://www.premiumparking.com"
          />

          <Routes>
            <Route path="/react_cash_deposits" element={<CashDeposit />} />
            <Route
              path="/react_cash_deposits/new"
              element={<NewCashDeposit />}
            />
            <Route
              path="/react_cash_deposits/:id/edit"
              element={<EditCashDeposit />}
            />
          </Routes>
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
