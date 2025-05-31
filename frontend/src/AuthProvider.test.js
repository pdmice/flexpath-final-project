import { render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "./provider/AuthProvider";
import "@testing-library/jest-dom";
import AuthProvider from "./provider/AuthProvider";
import App from "./App";

describe("Test the AuthProvider", () => {
  test("Make sure it's providing correct default values", () => {
    render(
      <MemoryRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
      </MemoryRouter>
    );

    //If isLogged defaults properly there should be ONE login button etc...
    expect(screen.getByText(/login/i).toBeInTheDocument);
  });
});
