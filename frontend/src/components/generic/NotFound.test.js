import React from "react";
import { render, screen } from "@testing-library/react";
import NotFound from "./NotFound";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "/blarg",
  }),
}));

describe("Not found should render and display the 404d path", () => {
  test("The page should render the not found path", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(
      screen.getByText((content) => content.includes("blarg"))
    ).toBeInTheDocument();
  });
});
