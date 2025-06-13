import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";

const authResponse = {
  accessToken: {
    token:
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInVpZCI6LTEsIm5iZiI6MTc0ODUwMjQ5MSwiaXNzIjoiZnJhaG8tc2VjdXJpdHkiLCJleHAiOjE3NDg1MDYwOTEsImlhdCI6MTc0ODUwMjQ5MSwiYXV0aG9yaXRpZXMiOlsiQURNSU4iXSwianRpIjoiMTQ2M2M4ZDctYzUyNi00MzFjLThkMzAtMDQ2YmNmNzlmYTg2In0.PTHHaMLvvowrvGyl85NqZZZRTKYzjUe3HZqmTXsYalI",
    expiresIn: 3600,
  },
  refreshToken: null,
};

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Ensure that login page is working as expected", () => {
  test("Make sure input fields and submit button are present", () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isLoggedIn: false }}>
          <Login />
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
          <Login />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    const button = screen.getByRole("button");

    fireEvent.click(button);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
  });
});
