import React from "react";
import { render, screen } from "@testing-library/react";
import LoadingTable from "./LoadingTable";
import "@testing-library/jest-dom";

describe("Make sure the error header displays properly", () => {
  var errorState = true;
  var loading = true;

  test("Displays DB Error when errorState", () => {
    render(<LoadingTable errorState={errorState} />);

    var message = screen.getByText("Database Communication Error");
    expect(message).toBeVisible();
  });

  test("Displays Loading when loading is true", () => {
    render(<LoadingTable loading={loading} />);

    var message = screen.getByText("Loading...");
    expect(message).toBeVisible();
  });

  test("Displays No data message when loading is false", () => {
    render(<LoadingTable loading={(loading = false)} />);

    var message = screen.getByText("No Data Returned");
    expect(message).toBeVisible();
  });

  test("Doesn't display DB Error when errorState is false", () => {
    render(<LoadingTable errorState={(errorState = false)} />);

    var message = screen.queryByText("Database Communication Error");
    expect(message).not.toBeVisible();
  });

  test("Doesnt display Loading when loading is false", () => {
    render(<LoadingTable loading={(loading = false)} />);

    var message = screen.queryByText("Loading...");
    expect(message).not.toBeVisible;
  });

  test("Doesn't display data message when loading is true", () => {
    render(<LoadingTable loading={(loading = true)} />);
    var message = screen.queryByText("No Data Returned");
    expect(message).not.toBeVisible();
  });
});
