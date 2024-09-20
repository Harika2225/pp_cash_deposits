import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter } from "react-router-dom";
import CashDepositTable from "./CashDepositTable";
import { GET_CASH_DEPOSITS } from "../../graphql/queries/cash_deposits_query";
import { GET_USER_CASH_DEPOSITS } from "../../graphql/queries/cash_deposits_query";
import { act } from "react";

const mocks = [
  {
    request: {
      query: GET_CASH_DEPOSITS,
      variables: {},
    },
    result: {
      data: {
        cash_deposits: [
          {
            id: 1,
            files: [],
            bank_depositor_id: "1234",
            cashier_id: "5678",
            location_id: "91011",
            market_id: "12",
            is_verified_in_bank: true,
            bag_number: "BN001",
            bank_account_last4_digits: "1234",
            bank_description: "Bank Desc",
            bank_receipt_id: "BR001",
            deposit_type: "Cash",
            pay_machine_id: "PM001",
            paystation_character: "A",
            shift: "Morning",
            bank_deposit_date_on: "2024-09-18",
            business_date_on: "2024-09-17",
            deposit_date_on: "2024-09-18",
            bank_deposit_amount_cents: 50000,
            deposit_amount_cents: 50000,
            created_at: "2024-09-18",
            digital_pull_2_time_at: null,
            digital_pull_time_at: null,
            updated_at: "2024-09-18",
            market: { name: "Market Name" },
            location: { name: "Location Name", market_id: "12" },
            cashier: { email: "cashier@example.com" },
            bank_depositor: { email: "depositor@example.com" },
          },
        ],
      },
    },
  },
  {
    request: {
      query: GET_USER_CASH_DEPOSITS,
      variables: {},
    },
    result: {
      data: {
        user_cash_deposits: [
          {
            id: 1,
            user_id: "user123",
            cash_deposit_id: "1",
            deposit_amount_cents: 50000,
            created_at: "2024-09-18",
            updated_at: "2024-09-18",
            cash_deposit: {
              id: 1,
              bank_depositor_id: "1234",
              cashier_id: "5678",
              location_id: "91011",
              market_id: "12",
              is_verified_in_bank: true,
              bag_number: "BN001",
              bank_account_last4_digits: "1234",
              bank_description: "Bank Desc",
              bank_receipt_id: "BR001",
              deposit_type: "Cash",
              pay_machine_id: "PM001",
              paystation_character: "A",
              shift: "Morning",
              bank_deposit_date_on: "2024-09-18",
              business_date_on: "2024-09-17",
              deposit_date_on: "2024-09-18",
              bank_deposit_amount_cents: 50000,
              deposit_amount_cents: 50000,
              created_at: "2024-09-18",
              digital_pull_2_time_at: null,
              digital_pull_time_at: null,
              updated_at: "2024-09-18",
              market: { name: "Market Name" },
              location: { name: "Location Name", market_id: "12" },
              cashier: { email: "cashier@example.com" },
              bank_depositor: { email: "depositor@example.com" },
            },
          },
        ],
      },
    },
  },
];

test("renders all table headers", async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter>
        <CashDepositTable
          isFind={true}
          isFilteredData={[]}
          currentUserId="1"
          marketIds={[]}
        />
      </MemoryRouter>
    </MockedProvider>
  );

  const headers = [
    "ID",
    "Bag Number",
    "Deposit Type",
    "Pull Date",
    "Deposit Date",
    "Market Name",
    "Location Name",
    "Pay Machine ID",
    "Deposit Amount",
    "Employee Email",
    "Bank Depositor Email",
    "Verified In Bank",
    "Bank Description",
    "Bank Account Last 4 digits",
    "Verified Bank Deposit Amount",
    "Verified Bank Deposit Date",
    "Variance",
    "Shift",
    "Bank Receipt ID",
    "Digital Pull Time",
    "Digital Pull 2 Time",
    "Created At",
    "Files",
  ];

  await waitFor(() => {
    headers.forEach((header) => {
      expect(screen.getAllByText(new RegExp(header, "i")).length).toBeGreaterThan(0);
    });
  });
});
