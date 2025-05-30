import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import KeyWordSearch from "./KeyWordSearch";
import { AuthContext } from "../../provider/AuthProvider";
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

describe("Make sure the keyword search functions", () => {
  test("Make sure the things render", () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider>
          <KeyWordSearch />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Enter a keyword to search./)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Search by keyword/)
    ).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("Make sure typing in the keyword works", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ fakeData }]),
      })
    );

    render(
      <MemoryRouter>
        <AuthContext.Provider>
          <KeyWordSearch setLoading={jest.fn()} setErrorState={jest.fn()} />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    fireEvent.change(screen.getByPlaceholderText("Search by keyword"), {
      target: { value: "Huntsville" },
    });

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:8080/api/search/keyword/Huntsville"
      );
    });
  });
});
