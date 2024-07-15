import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import CashDeposit from "./components/CashDeposits";
import NewCashDeposit from "./components/NewCashDeposit";
import EditCashDeposit from "./components/EditCashDeposit";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/react_cash_deposits" element={<CashDeposit />} />
          <Route path="/react_cash_deposits/new" element={<NewCashDeposit />} />
          <Route path="/react_cash_deposits/:id/edit" element={<EditCashDeposit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
