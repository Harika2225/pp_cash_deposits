import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import CashDeposit from "./components/cashDeposits/CashDeposits";
import NewCashDeposit from "./components/cashDepositForm/NewCashDeposit";
import EditCashDeposit from "./components/cashDepositForm/EditCashDeposit";
import { NavBar } from "premiumparking-navbar";
import GlobalStyle from "./assets/stylesheets/globalStyles";

function App() {
  const navigationMenuOptions = [
    {
      isSection: true,
      name: "Manage",
      options: [
        { name: "Markets", link: "/markets" },
        { name: "Locations", link: "/locations" },
        { name: "Virtual Locations", link: "/virtual_locations" },
        { name: "Event Rates", link: "/events" },
        { name: "Blackouts", link: "/blackouts" },
        { name: "Whitelist", link: "/whitelist" },
        { name: "Promo Codes", link: "/discounts" },
        { name: "Users", link: "/users" },
        { name: "Profiles", link: "/profiles" },
        { name: "Clients", link: "/clients" },
        { name: "Fees", link: "/fees" },
        { name: "TextPay Jobs", link: "/textpay_jobs" },
        { name: "Parking Spaces", link: "/parking_spaces" },
        { name: "Roles", link: "/roles" },
        { name: "Business Accounts", link: "/businessaccounts" },
        { name: "Validation Accounts", link: "/house_accounts" },
        { name: "Invoices", link: "/invoices" },
        { name: "Subscriptions", link: "/subscriptions" },
        { name: "Reservations", link: "/reservations" },
        { name: "GL Codes", link: "/gl_codes" },
        { name: "TextPay Requests", link: "/textpay_requests" },
        { name: "TextPay Blasts", link: "/textpay_blasts/new" },
        { name: "Cash Deposits", link: "/react_cash_deposits" },
        { name: "Partner Sales", link: "/partner_products" },
        { name: "Taxes", link: "/taxes" },
      ],
    },
    {
      isSection: true,
      name: "Content",
      options: [
        { name: "Venues", link: "/venues" },
        { name: "Features", link: "/features" },
        { name: "Banners", link: "/banner_messages" },
        { name: "Help", link: "/helps" },
        { name: "Jobs", link: "/jobs" },
        { name: "Settings", link: "/settings" },
        { name: "Color Themes", link: "/color_themes" },
        { name: "Parking Operators", link: "/parking_operators" },
        { name: "Static Page Groups", link: "/static_page_groups" },
        { name: "Contact Reasons", link: "/contact_reasons" },
        { name: "Support Articles", link: "/support_articles" },
      ],
    },
    {
      isSection: true,
      name: "Reports",
      options: [
        { name: "Location Revenues", link: "/reports/location_revenues" },
        { name: "Validations", link: "/reports/validations" },
        { name: "Adjustments", link: "reports/adjustments" },
        { name: "Refund Requests", link: "/reports/refund-requests" },
        { name: "Owed Balance Payments", link: "/reports/payments" },
        {
          name: "Business Account Subscriptions",
          link: "/reports/products",
        },
        {
          name: "Business Account Parking Plans",
          link: "/reports/parking_plans",
        },
        {
          name: "Business Account Promo Codes",
          link: "/reports/groups_discounts",
        },
        { name: "Checks", link: "/reports/checks" },
        { name: "Bank Transfers", link: "/reports/bank_transfers" },
        { name: "Promo Codes", link: "/reports/discounts" },
        { name: "Occupancy", link: "/reports/occupancies" },
        { name: "Feedback", link: "/reports/feedbacks" },
        { name: "Downloads", link: "/reports/downloads" },
        { name: "Wallet Payments", link: "/reports/wallet_payments" },
        { name: "TextPay Conversion", link: "/reports/textpay_conversion" },
      ],
    },
    {
      isSection: true,
      name: "Integrations",
      options: [
        { name: "Providers", link: "/providers" },
        { name: "Webhooks", link: "/webhooks" },
      ],
    },
    { name: "Occupancy", link: "/occupancy" },
    { name: "Report History", link: "/report-history" },
    { name: "Activities", link: "/activities" },
    {
      isSection: true,
      name: "Security",
      options: [
        { name: "Password Policies", link: "/security/password_policies" },
      ],
    },
    { name: "Website", link: "/website" },
    { name: "My Profile", link: "/users/edit" },
    { name: "Signout", link: "/users/signout" },
  ];

  return (
    <Router>
      <div>
        <GlobalStyle/>
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
