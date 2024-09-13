import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { useParams } from "react-router-dom";
import EditCashDeposit from "./EditCashDeposit";
import { GET_CASH_DEPOSIT_BY_ID } from "../../graphql/queries/cash_deposits_query";

jest.mock("./CashDepositForm", () => () => <div>Mocked CashDepositForm</div>);

jest.mock("react-router-dom", () => ({
  useParams: jest.fn(),
}));

const mocks = [
  {
    request: {
      query: GET_CASH_DEPOSIT_BY_ID,
      variables: { id: 1 },
    },
    result: {
      data: {
        cash_deposit_by_pk: {
          id: 1,
          amount: 1000,
          date: "2024-01-01",
          __typename: "CashDeposit",
        },
      },
    },
  },
];

describe("EditCashDeposit Component", () => {
  beforeEach(() => {
    useParams.mockReturnValue({ id: "1" });
  });

  test("renders loading state", () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <EditCashDeposit />
      </MockedProvider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders EditCashDeposit component with data", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <EditCashDeposit />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Edit Cash Deposit")).toBeInTheDocument();
      expect(screen.getByText("Mocked CashDepositForm")).toBeInTheDocument();
      const hrElement = screen.getByRole("separator");
      expect(hrElement).toHaveStyle("color: #cfcfcf");
    });
  });
});
