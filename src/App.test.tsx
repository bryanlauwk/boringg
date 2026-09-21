// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import App from "./App";
vi.mock("./pages/Index", () => ({ default: () => <h1>press me.</h1> }));
afterEach(() => { cleanup(); history.replaceState({}, "", "/"); });
it("keeps the home experience for root URLs with query strings", () => {
  history.replaceState({}, "", "/?from=friend");
  render(<App />);
  expect(screen.getByRole("heading").textContent).toBe("press me.");
});
it("keeps the not-found page and a working home link", () => {
  history.replaceState({}, "", "/missing");
  render(<App />);
  expect(screen.getByRole("heading").textContent).toBe("404");
  expect(screen.getByRole("link").getAttribute("href")).toBe("/");
});
