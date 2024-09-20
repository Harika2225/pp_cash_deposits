import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter } from "react-router-dom";
import CashDepositForm from "./CashDepositForm";
import { GET_CASH_DEPOSIT_BY_ID } from "../../graphql/queries/cash_deposits_query";
import { GET_MARKETS } from "../../graphql/queries/markets_query";
import { GET_LOCATIONS } from "../../graphql/queries/locations_query";
import { GET_USERS } from "../../graphql/queries/users_query";

const mocks = [
  {
    request: {
      query: GET_MARKETS,
    },
    result: {
      data: {
        markets: [
          { id: "8", name: "Addison" },
          { id: "167", name: "Akron" },
        ],
      },
    },
  },
  {
    request: {
      query: GET_LOCATIONS,
    },
    result: {
      data: {
        locations: [{ id: "149", name: "P1201" }],
      },
    },
  },
  {
    request: {
      query: GET_USERS,
    },
    result: {
      data: {
        users: [{ id: "1", name: "user1" }],
      },
    },
  },
  {
    request: {
      query: GET_CASH_DEPOSIT_BY_ID,
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
];

const renderForm = (props = {}) => {
  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter>
        <CashDepositForm {...props} />
      </MemoryRouter>
    </MockedProvider>
  );
};

afterEach(() => {
  jest.clearAllTimers();
});

test("renders label fields in form", async () => {
    renderForm();
  
    expect(await screen.findByText(/Deposit Type/i)).toBeInTheDocument();
    expect(await screen.findByText(/Bag Number/i)).toBeInTheDocument();
    
    const depositDateLabels = await screen.findAllByText(/Deposit Date/i);
    expect(depositDateLabels).toHaveLength(2); 
  
    expect(await screen.findByText(/Market Group/i)).toBeInTheDocument();
    expect(await screen.findByText(/Location/i)).toBeInTheDocument();
    
    const depositAmountLabels = await screen.findAllByText(/Deposit Amount/i);
    expect(depositAmountLabels).toHaveLength(2); 
  
    expect(await screen.findByText(/Employee Name/i)).toBeInTheDocument();
    expect(await screen.findByText(/Bank Depositor/i)).toBeInTheDocument();
    expect(await screen.findByText(/Bank Account last 4 Digits/i)).toBeInTheDocument();
    expect(await screen.findByText(/Attachments/i)).toBeInTheDocument();
    expect(await screen.findByText(/Verified in the bank/i)).toBeInTheDocument();
  
    const verifiedBankDepositDateLabels = await screen.findAllByText(/Verified Bank Deposit Date/i);
    expect(verifiedBankDepositDateLabels).toHaveLength(1); 
  
    expect(await screen.findByText(/Verified Bank Deposit Amount/i)).toBeInTheDocument();
    expect(await screen.findByText(/Bank Description/i)).toBeInTheDocument();
  
    expect(screen.getByText(/Save/i)).toBeInTheDocument();
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
});
  
  
  
  
