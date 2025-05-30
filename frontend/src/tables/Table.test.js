import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Table from "./Table";
import { AuthContext } from "../provider/AuthProvider";
import "@testing-library/jest-dom";

const fakeData = [
  {
    id: 185,
    name: "Victorian All-Day Singing",
    owner_id: "admin",
    start_date: "2025-06-21",
    end_date: null,
    when_Description: "Jun, Sat before 4th Sun",
    start_time: "09:30:00",
    end_time: "16:00:00",
    primary_book: "Denson Book",
    secondary_book: null,
    contact_email: null,
    notes: null,
    latitude: null,
    longitude: null,
  },
  {
    id: 178,
    name: "Bethlehem PBC 5th Sunday Singing",
    owner_id: "admin",
    start_date: "2025-06-29",
    end_date: null,
    when_Description: "Jun, Every 5th Sunday",
    start_time: null,
    end_time: null,
    primary_book: "Cooper Book",
    secondary_book: null,
    contact_email: null,
    notes: null,
    latitude: null,
    longitude: null,
  },
];

describe("Make sure the base table renders", () => {
  test("Make sure  the radios render", () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider>
          <Table
            data={fakeData}
            setData={jest.fn()}
            modifiable={true}
            loading={false}
            errorState={false}
          />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    const sort = screen.getAllByRole("radio");
    expect(sort).toHaveLength(2);
  });

  test("Should render loadingTable if data is null", () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider>
          <Table
            data={null}
            setData={jest.fn()}
            modifiable={true}
            loading={false}
            errorState={false}
          />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    const message = screen.getByText("Loading...");
    expect(message).toBeInTheDocument();
  });
});
