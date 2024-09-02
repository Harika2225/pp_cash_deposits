import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Filters from "./Filters";
import { MockedProvider } from "@apollo/client/testing";
import { GET_MARKETS, GET_LOCATIONS } from "../../graphql/queries/markets_query";

// Mock GraphQL query data
const mocks = [
  {
    request: {
      query: GET_MARKETS,
    },
    result: {
      data: {
        markets: [
          { id: "1", name: "Market 1" },
          { id: "2", name: "Market 2" },
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
        locations: [
          { id: "1", name: "Location 1" },
          { id: "2", name: "Location 2" },
        ],
      },
    },
  },
];

describe("Filters Component", () => {
  it("renders without crashing", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Filters
          isFilteredData={[]}
          setisFilteredData={jest.fn()}
          setIsFind={jest.fn()}
        />
      </MockedProvider>
    );

    // Check if the form is rendered
    expect(screen.getByText("Cash Deposits")).toBeInTheDocument();
  });

  it("updates search filter on user input", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Filters
          isFilteredData={[]}
          setisFilteredData={jest.fn()}
          setIsFind={jest.fn()}
        />
      </MockedProvider>
    );

    const searchInput = screen.getByPlaceholderText(
      "Search by Pay Machine ID, Bag Number"
    );
    fireEvent.change(searchInput, { target: { value: "Test Search" } });

    expect(searchInput.value).toBe("Test Search");
  });

  it("calls handleFindClick on 'Find' button click", () => {
    const setIsFind = jest.fn();
    const setisFilteredData = jest.fn();

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Filters
          isFilteredData={[]}
          setisFilteredData={setisFilteredData}
          setIsFind={setIsFind}
        />
      </MockedProvider>
    );

    const findButton = screen.getByText("Find");
    fireEvent.click(findButton);

    expect(setIsFind).toHaveBeenCalledWith(true);
    // Check other side effects of the find button if needed
  });
});
