import React from "react";
import { render, cleanup, fireEvent, screen } from "@testing-library/react";
import App from "./App";
import Login from "./Login";
import "@testing-library/jest-dom";

afterEach(cleanup);

describe("Login", () => {
  test("display login button and login", async () => {
    const { getByText } = render(<Login />);
    expect(getByText("Login With Spotify")).toBeInTheDocument();

    await fireEvent.click(screen.getByText("Login With Spotify"));
  });
});
