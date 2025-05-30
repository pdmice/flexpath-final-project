import { render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MyRoutes from "./MyRoutes";
import { AuthContext } from "../../provider/AuthProvider";
import "@testing-library/jest-dom";

//Locationsearch has to be mocked as it relied on importing an using meta.ENV.VITE import
//which jest can't do
//(without reconfiguring everything...)

jest.mock("../search/LocationSearch", () => () => (
  <div>Find a Sing to Attend</div>
));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

//AA are added fields so the .split doesn't break
const mockToken =
  "AA:AA:eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInVpZCI6LTEsIm5iZiI6MTc0ODUwMjQ5MSwiaXNzIjoiZnJhaG8tc2VjdXJpdHkiLCJleHAiOjE3NDg1MDYwOTEsImlhdCI6MTc0ODUwMjQ5MSwiYXV0aG9yaXRpZXMiOlsiQURNSU4iXSwianRpIjoiMTQ2M2M4ZDctYzUyNi00MzFjLThkMzAtMDQ2YmNmNzlmYTg2In0.PTHHaMLvvowrvGyl85NqZZZRTKYzjUe3HZqmTXsYalI,AA";

const mockSing = {
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
};

describe("Test routes to ensure proper components are rendered", () => {
  test("Make sure search works", () => {
    render(
      <MemoryRouter initialEntries={["/search"]}>
        <AuthContext.Provider value={{ token: mockToken }}>
          <MyRoutes
            searchType="location"
            setSearchType={jest.fn()}
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

    const header = screen.getByText("Find a Sing to Attend");
    expect(header).toBeInTheDocument();
  });

  test("Make sure /login works", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <AuthContext.Provider value={{ token: mockToken }}>
          <MyRoutes
            searchType="location"
            setSearchType={jest.fn()}
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

    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(1);

    const user = screen.getAllByPlaceholderText("username");
    expect(user[0]).toBeInstanceOf(HTMLInputElement);

    const password = screen.getAllByPlaceholderText("password");
    expect(password[0]).toBeInstanceOf(HTMLInputElement);
  });

  test("Make sure /signup works", () => {
    render(
      <MemoryRouter initialEntries={["/signup"]}>
        <AuthContext.Provider value={{ isLoggedIn: false }}>
          <MyRoutes
            searchType="location"
            setSearchType={jest.fn()}
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

    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(1);

    const user = screen.getAllByPlaceholderText("username");
    expect(user[0]).toBeInstanceOf(HTMLInputElement);

    const password = screen.getAllByPlaceholderText("password");
    expect(password[0]).toBeInstanceOf(HTMLInputElement);
  });

  test("Make sure /MySings works", () => {
    render(
      <MemoryRouter initialEntries={["/MySings"]}>
        <AuthContext.Provider value={{ isLoggedIn: true, token: mockToken }}>
          <MyRoutes
            searchType="location"
            setSearchType={jest.fn()}
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

    const header = screen.getByText("Here are all your upcoming sings.");
    expect(header).toBeInTheDocument();
  });

  test("Make sure /UpdateSing works", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ message: mockSing }),
      })
    );

    render(
      <MemoryRouter initialEntries={["/UpdateSing/1"]}>
        <AuthContext.Provider value={{ isLoggedIn: true, token: mockToken }}>
          <MyRoutes
            searchType="location"
            setSearchType={jest.fn()}
            loading={false}
            setLoading={jest.fn()}
            errorState={false}
            setErrorState={jest.fn()}
            token={mockToken}
            setToken={jest.fn()}
            editType={"created"}
            setEditType={jest.fn()}
          />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      const container = screen.getByTestId("alternateHeading");
      const header = within(container).getAllByText(
        "Update a Sing You Created"
      );
      expect(header[0]).toBeInTheDocument();
    });
  });

  test("Make sure /CreateSing works", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ message: mockSing }),
      })
    );

    render(
      <MemoryRouter initialEntries={["/CreateSing"]}>
        <AuthContext.Provider
          value={{ isLoggedIn: true, token: mockToken, userName: "admin" }}
        >
          <MyRoutes
            searchType="location"
            setSearchType={jest.fn()}
            loading={false}
            setLoading={jest.fn()}
            errorState={false}
            setErrorState={jest.fn()}
            token={mockToken}
            setToken={jest.fn()}
            editType={"created"}
            setEditType={jest.fn()}
          />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      const header = screen.getByText(
        "Publish A New Sing For People To Come To"
      );
      expect(header).toBeInTheDocument();
    });
  });
});
