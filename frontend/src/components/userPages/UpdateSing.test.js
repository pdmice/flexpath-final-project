import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UpdateSing from "./UpdateSing";
import { AuthContext } from "../../provider/AuthProvider";
import "@testing-library/jest-dom";

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

const mockToken =
  "AA:AA:eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInVpZCI6LTEsIm5iZiI6MTc0ODUwMjQ5MSwiaXNzIjoiZnJhaG8tc2VjdXJpdHkiLCJleHAiOjE3NDg1MDYwOTEsImlhdCI6MTc0ODUwMjQ5MSwiYXV0aG9yaXRpZXMiOlsiQURNSU4iXSwianRpIjoiMTQ2M2M4ZDctYzUyNi00MzFjLThkMzAtMDQ2YmNmNzlmYTg2In0.PTHHaMLvvowrvGyl85NqZZZRTKYzjUe3HZqmTXsYalI,AA";

describe("Make sure UpdateSing works", () => {
  test("Check header is correct", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ ok: true, message: mockSing }),
      })
    );

    render(
      <MemoryRouter initialEntries={["/UpdateSing/1"]}>
        <AuthContext.Provider value={{ isLoggedIn: true, token: mockToken }}>
          <UpdateSing editType={"attended"} setEditType={jest.fn()} />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    const updateButton = screen.getByTestId("handleUpdate");

    const container = screen.getByTestId("alternateHeading");
    const header = within(container).getAllByText(
      "Remove from Sings you Attended"
    );
    expect(header[0]).toBeInTheDocument();
  });
});
