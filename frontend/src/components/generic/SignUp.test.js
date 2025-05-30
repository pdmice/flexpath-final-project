import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SignUp from "./Signup";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Make sure that the signup page works", () => {
  test("Make sure it renders properly", () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isLoggedIn: false }}>
          <SignUp />
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
});

describe("Make sure that the login button works", () => {
  test("Login should hit the auth/login api", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ message: authResponse }),
      })
    );

    const mockSetLoginFailed = jest.fn();
    const mockSetIsLoggedIn = jest.fn();
    const mockSetToken = jest.fn();

    render(
      <MemoryRouter>
        <AuthContext.Provider
          value={{
            isLoggedIn: false,
            setLoginFailed: mockSetLoginFailed,
            setIsLoggedIn: mockSetIsLoggedIn,
            setToken: mockSetToken,
          }}
        >
          <SignUp />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    const button = screen.getByRole("button");

    fireEvent.click(button);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalled();
    });
  });
});
