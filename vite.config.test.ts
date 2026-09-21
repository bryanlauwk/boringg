import { readFileSync } from "node:fs";
import { expect, it } from "vitest";
import config from "./vite.config";

it("keeps the hosted preview reachable on its expected port", () => {
  expect(config.server?.host).toBe("0.0.0.0");
  expect(config.server?.port).toBe(8080);
  expect(config.server?.strictPort).not.toBe(true);
});

it("preserves both production and hosted development build commands", () => {
  const manifest = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));
  expect(manifest.scripts.build).toBe("vite build");
  expect(manifest.scripts["build:dev"]).toBe("vite build --mode development");
});
