import React from "react";
import { render, screen } from "@testing-library/react";
import SearchSelect from "./SearchSelect";
import { Link, useNavigate } from "react-router-dom";
import "@testing-library/jest-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
}));

import { useLocation } from "react-router-dom";

describe("Ensure the search select button functions properly", () => {
  test("Button should be visible when on  /search page", () => {
    useLocation.mockReturnValue({ pathname: "/search" });
    render(<SearchSelect />);

    expect(screen.getByTestId("searchSelectDropDown")).toBeVisible();
  });

  test("Button should be invisible when not on /search page", () => {
    useLocation.mockReturnValue({ pathname: "/Test" });
    render(<SearchSelect />);

    expect(screen.getByTestId("searchSelectDropDown")).not.toBeVisible();
  });
});
