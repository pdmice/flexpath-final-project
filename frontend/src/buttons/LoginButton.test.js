import React from "react";
import { render, screen } from "@testing-library/react";
import LoginButton from "./LoginButton";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

describe("Ensure the login button functions", () => {
  test("Link to login page is rendered when not logged in", () => {
    var isLoggedIn = false;
    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isLoggedIn: false }}>
          <LoginButton isLoggedIn={isLoggedIn} />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    var loginLink = screen.getByRole("link", { name: /login/i });
    expect(loginLink).toBeInTheDocument();
  });

  test("Link to login page is not rendered when not logged in", () => {
    var isLoggedIn = true;
    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isLoggedIn: true }}>
          <LoginButton isLoggedIn={isLoggedIn} />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    const loginlink = screen.queryByRole("link", { name: /login/i });

    expect(loginlink).not.toBeInTheDocument();
  });

  test("Logged in dropdown is rendered when logged in", () => {
    var isLoggedIn = true;
    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isLoggedIn: true }}>
          <LoginButton isLoggedIn={isLoggedIn} />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    const loginDropDown = screen.getByTestId("loggedInDropDown");

    expect(loginDropDown).toBeInTheDocument();
  });
});
