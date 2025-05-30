import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoggedInTable from "./LoggedInTable";
import { AuthContext } from "../provider/AuthProvider";
import "@testing-library/jest-dom";

jest.mock("../helpers/sortSings", () => ({
  __esModule: true,
  default: jest.fn(() => fakeData),
}));

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

const mockToken =
  "AA:AA:eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInVpZCI6LTEsIm5iZiI6MTc0ODUwMjQ5MSwiaXNzIjoiZnJhaG8tc2VjdXJpdHkiLCJleHAiOjE3NDg1MDYwOTEsImlhdCI6MTc0ODUwMjQ5MSwiYXV0aG9yaXRpZXMiOlsiQURNSU4iXSwianRpIjoiMTQ2M2M4ZDctYzUyNi00MzFjLThkMzAtMDQ2YmNmNzlmYTg2In0.PTHHaMLvvowrvGyl85NqZZZRTKYzjUe3HZqmTXsYalI,AA";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Make sure LoggedInTable works Properly", () => {
  test("Make sure it renders", () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ ok: true, message: fakeData }),
      })
    );

    render(
      <MemoryRouter initialEntries={["/LoggedInTable"]}>
        <AuthContext.Provider value={{ isLoggedIn: true, token: mockToken }}>
          <LoggedInTable
            data={fakeData}
            setData={jest.fn()}
            modifiable={true}
            loading={false}
            setLoading={jest.fn()}
            errorState={false}
            setErrorState={jest.fn()}
            token={mockToken}
            setToken={jest.fn()}
          />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    const sort = screen.getAllByRole("radio");
    expect(sort).toHaveLength(2);
  });

  test("The modal should pop up when button is clicked", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ ok: true, message: fakeData }),
      })
    );

    render(
      <MemoryRouter initialEntries={["/LoggedInTable"]}>
        <AuthContext.Provider value={{ isLoggedIn: true }}>
          <LoggedInTable
            data={fakeData}
            setData={jest.fn()}
            modifiable={true}
            loading={false}
            setLoading={jest.fn()}
            errorState={false}
            setErrorState={jest.fn()}
            token={mockToken}
            setToken={jest.fn()}
          />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    const tableButton = screen.getAllByTestId("tableButton");
    const modal = screen.getByTestId("modal");

    fireEvent.click(tableButton[0]);

    await waitFor(() => {
      expect(modal).toBeVisible();
    });
  });

  test("Make sure the sort ascneding is ascendant", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ fakeData }]),
      })
    );
    const setOrder = jest.fn();

    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isLoggedIn: true }}>
          <LoggedInTable
            data={fakeData}
            setData={jest.fn()}
            modifiable={true}
            loading={false}
            setLoading={jest.fn()}
            errorState={false}
            setErrorState={jest.fn()}
            token={mockToken}
            setToken={jest.fn()}
            setOrder={setOrder}
          />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    const sortDesc = screen.getByTestId("sortDesc");

    fireEvent.click(sortDesc, { target: { value: "desc" } });

    fireEvent.click(sortDesc);
    expect(sortDesc).toBeChecked();
  });
});
