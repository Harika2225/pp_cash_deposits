import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import CashDeposit from "./components/CashDeposits";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* <Route path="/react_cash_deposits" element={<CashDeposit />} /> */}
          <Route path="/" element={<CashDeposit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
