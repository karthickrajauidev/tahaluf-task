// Listing.test.js

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Listing from "./Listing";

test("renders search input and sort button", () => {
  render(<Listing setDetails={() => {}} />);
  expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();
  expect(screen.getByText(/Sort/i)).toBeInTheDocument();
});

test("fetches and displays universities", async () => {
  const fakeUniversities = [
    {
      name: "Test University",
      country: "UAE",
      web_pages: ["http://test.com"],
      alpha_two_code: "AE",
    },
  ];
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeUniversities),
    })
  );

  render(<Listing setDetails={() => {}} />);
  const universityElement = await screen.findByText(/Test University/i);
  expect(universityElement).toBeInTheDocument();

  global.fetch.mockRestore();
});
