import React from "react";
import { render, screen } from "@testing-library/react";
import EditSelect from "./EditSelect";
import {Link, MemoryRouter, useNavigate} from "react-router-dom"
import "@testing-library/jest-dom";
import { AuthContext } from "../provider/AuthProvider";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
}));

const mockToken = "{AA:AA:eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInVpZCI6LTEsIm5iZiI6MTc0ODUwMjQ5MSwiaXNzIjoiZnJhaG8tc2VjdXJpdHkiLCJleHAiOjE3NDg1MDYwOTEsImlhdCI6MTc0ODUwMjQ5MSwiYXV0aG9yaXRpZXMiOlsiQURNSU4iXSwianRpIjoiMTQ2M2M4ZDctYzUyNi00MzFjLThkMzAtMDQ2YmNmNzlmYTg2In0.PTHHaMLvvowrvGyl85NqZZZRTKYzjUe3HZqmTXsYalI,AA}";


import { useLocation } from "react-router-dom";

describe("Ensure the edit select button functions properly", () => {
  test("Button should be visible when isLoggedIn ", () => {
    useLocation.mockReturnValue({ pathname: "/MySings" });
    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isLoggedIn: true , token: mockToken}}>
      <EditSelect isLoggedIn={true}/>;
        </AuthContext.Provider>
</MemoryRouter>
    )
    expect(screen.getByTestId("editSelectDropDown")).toBeVisible();
  });

  test("Button should be invisible when not on /MySings page", () => {
    useLocation.mockReturnValue({ pathname: "/Test" });
    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isLoggedIn: false , token: mockToken}}>
    <EditSelect isLoggedIn={false}/>
          </AuthContext.Provider>  
      </MemoryRouter>
    )

    expect(screen.getByTestId("editSelectDropDown")).not.toBeVisible();
  });
});
