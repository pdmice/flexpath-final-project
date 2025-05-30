// !!!!!!!!!!!!!!!!!     NOTE TO SELF    !!!!!!!!!!!!!!!!!!!!!!
//      TO RUN THIS TEST:
//      COMMENT OUT API_KEY import
//      UNNCOMMENT FAKE API
//      THEN FORGET YOU DID IT AND
//      BE BAFFLED WHY IT BROKE
//      Can't use .env imports in jest, so just fake it to run test

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LocationSearch from "./LocationSearch";
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

describe("Make sure LocatonSearch Works", () => {
  test("Make sure all the boxes are boxes", () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isLoggedIn: true }}>
          <LocationSearch setLoading={jest.fn()} setErrorState={jest.fn()} />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    const textboxes = screen.getAllByRole("textbox");
    expect(textboxes).toHaveLength(3);
  });

  test("Make sure the clicky bits do clicky things", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ fakeData }]),
      })
    );

    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isLoggedIn: true }}>
          <LocationSearch
            setLoading={jest.fn()}
            setErrorState={jest.fn()}
            start_date="2025-01-01"
            end_date="2027-01-01"
          />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Search by zip-code"), {
      target: { value: "90210" },
    });

    fireEvent.change(
      screen.getByPlaceholderText("Enter Search Radius in Miles"),
      {
        target: { value: "600" },
      }
    );

    const button = screen.getByRole("button");

    fireEvent.click(button);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
  });
});
