import React from "react";
import { render, screen } from "@testing-library/react";
import EditSelect from "./EditSelect";
import {Link, useNavigate} from "react-router-dom"
import "@testing-library/jest-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
}));

import { useLocation } from "react-router-dom";

describe("Ensure the edit select button functions properly", () => {
  test("Button should be visible when not  /MySings page", () => {
    useLocation.mockReturnValue({ pathname: "/MySings" });
    render(<EditSelect />);

    expect(screen.getByTestId("editSelectDropDown")).toBeVisible();
  });

  test("Button should be invisible when not on /MySings page", () => {
    useLocation.mockReturnValue({ pathname: "/Test" });
    render(<EditSelect />);

    expect(screen.getByTestId("editSelectDropDown")).not.toBeVisible();
  });
});
