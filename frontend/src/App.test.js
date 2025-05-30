import React from "react";
import { render, screen } from "@testing-library/react";
import { Link } from "react-router-dom";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import "@testing-library/jest-dom";

jest.mock("./buttons/LoginButton", () => () => <div>Loginbutton</div>);
jest.mock("./buttons/SearchSelect", () => () => <div>SearchSelect</div>);
jest.mock("./buttons/EditSelect", () => () => <div>EditSelect</div>);
jest.mock("./components/generic/MyRoutes", () => () => <div>MyRoutes</div>);

describe("Ensure that basic rendering and links are functional with mock components", () => {
  test("Ensure corner links can render", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const searchLink = screen.getByRole("link", { name: /search/i });
    expect(searchLink).toBeInTheDocument();

    const homelink = screen.getByRole("link", { name: /home/i });
    expect(homelink).toBeInTheDocument();
  });
});
