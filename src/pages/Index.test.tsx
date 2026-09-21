// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Index from "./Index";
import { playPress } from "@/lib/swoleAudio";

vi.mock("@/lib/swoleAudio", () => ({ playPress: vi.fn() }));
vi.mock("@/components/SwoleToy", () => ({
  default: ({ growth, tick, tiny, reducedMotion }: { growth: number; tick: number; tiny: boolean; reducedMotion: boolean }) =>
    <div data-testid="toy" data-growth={growth} data-tick={tick} data-tiny={String(tiny)} data-reduced={String(reducedMotion)} />,
}));

let mediaChange: (() => void) | undefined;
let media: { matches: boolean; addEventListener: ReturnType<typeof vi.fn>; removeEventListener: ReturnType<typeof vi.fn> };
beforeEach(async () => {
  vi.clearAllMocks();
  media = { matches: false, addEventListener: vi.fn((_, fn) => { mediaChange = fn; }), removeEventListener: vi.fn() };
  vi.stubGlobal("matchMedia", () => media);
  render(<Index />);
  await screen.findByTestId("toy");
});
afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });
const press = () => fireEvent.click(screen.getByRole("button", { name: "Press the button" }));
const toy = () => screen.getByTestId("toy");

describe("the one-button experience", () => {
  it("has exactly one action, starts small, and grows on a press", () => {
    expect(screen.getAllByRole("button")).toHaveLength(1);
    expect(screen.getByRole("heading").textContent).toBe("press me.");
    expect(toy().dataset.growth).toBe("0");
    expect(screen.getByRole("main").className).toContain("mood-small");
    press();
    expect(Number(toy().dataset.growth)).toBeCloseTo(1 / 24);
    expect(toy().dataset.tick).toBe("1");
    expect(playPress).toHaveBeenCalledWith(1 / 24, false);
  });
  it("reaches full size on 24 and squeaks on 25, blocking clicks during the cooldown", () => {
    vi.useFakeTimers();
    vi.spyOn(performance, "now").mockReturnValue(1000);
    for (let i = 0; i < 24; i++) press();
    expect(toy().dataset.growth).toBe("1");
    expect(screen.getByRole("main").className).toContain("mood-huge");
    expect(screen.getByRole("status").textContent).toBe("One more press.");
    press();
    expect(toy().dataset.growth).toBe("0");
    expect(toy().dataset.tiny).toBe("true");
    expect(screen.getByRole("main").className).toContain("mood-reset");
    expect(playPress).toHaveBeenLastCalledWith(25 / 24, true);
    press();
    expect(toy().dataset.tick).toBe("25");
    vi.spyOn(performance, "now").mockReturnValue(1900);
    press();
    expect(toy().dataset.tick).toBe("26");
    expect(toy().dataset.tiny).toBe("false");
    act(() => vi.advanceTimersByTime(2000));
    expect(toy().dataset.growth).toBe(String(1 / 24));
  });
  it("clears the squeak after its display interval", () => {
    vi.useFakeTimers();
    for (let i = 0; i < 25; i++) press();
    act(() => vi.advanceTimersByTime(1800));
    expect(toy().dataset.tiny).toBe("false");
    expect(screen.getByRole("status").textContent).toBe("");
  });
  it("supports Space without repeats, modifier shortcuts, or stealing focused controls", () => {
    fireEvent.keyDown(window, { code: "Space" });
    expect(toy().dataset.tick).toBe("1");
    fireEvent.keyDown(window, { code: "Space", repeat: true });
    fireEvent.keyDown(window, { code: "Space", ctrlKey: true });
    fireEvent.keyDown(screen.getByRole("button"), { code: "Space" });
    fireEvent.keyDown(screen.getByRole("link"), { code: "Space" });
    expect(toy().dataset.tick).toBe("1");
  });
  it("keeps working when audio cannot start", () => {
    vi.mocked(playPress).mockImplementationOnce(() => { throw new Error("Audio unavailable"); });
    press();
    expect(toy().dataset.tick).toBe("1");
  });
  it("responds to reduced motion and removes its listener on unmount", () => {
    act(() => { media.matches = true; mediaChange?.(); });
    expect(toy().dataset.reduced).toBe("true");
    cleanup();
    expect(media.removeEventListener).toHaveBeenCalledWith("change", mediaChange);
  });
});
