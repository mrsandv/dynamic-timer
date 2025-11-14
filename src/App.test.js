import { act, fireEvent, render, screen } from "@testing-library/react";
import Timer from "./App";

test("renders the initial timer state correctly", () => {
  render(<Timer />);
  // check renders
  // title
  const titleElement = screen.getByText(/dynamic counter/i);
  expect(titleElement).toBeInTheDocument();
  // initial 0 value
  const counterElement = screen.getByText("0");
  expect(counterElement).toBeInTheDocument();
  // play button
  const playButton = screen.getByText(/play/i);
  expect(playButton).toBeInTheDocument();
});

test("starts counting when play button is clicked", () => {
  jest.useFakeTimers();

  render(<Timer />);

  const playButton = screen.getByText(/play/i);

  fireEvent.click(playButton);

  // check logic for button name change
  expect(screen.getByText(/pause/i)).toBeInTheDocument();
  // simulation of 3 seconds
  act(() => {
    jest.advanceTimersByTime(3000);
  });

  expect(screen.getByText("3")).toBeInTheDocument();

  // clean timers
  jest.useRealTimers();
});

test("updates the delay value when input changes", () => {
  render(<Timer />);

  const speedInput = screen.getByLabelText(/speed \(ms\):/i);

  // check initial value
  expect(speedInput.value).toBe("1000");

  // simulate user input
  fireEvent.change(speedInput, { target: { value: "500" } });

  // check change of input value
  expect(speedInput.value).toBe("500");
});

test("return to default values when reset button is clicked", () => {
  jest.useFakeTimers();

  render(<Timer />);

  const playButton = screen.getByText(/play/i);
  const resetButton = screen.getByText(/reset/i);

  fireEvent.click(playButton);

  // simulation of 2 seconds
  act(() => {
    jest.advanceTimersByTime(2000);
  });

  fireEvent.click(resetButton);

  // expect 0 on showend on the counter
  expect(screen.getByText("0")).toBeInTheDocument();
  //
  expect(screen.getByText(/play/i)).toBeInTheDocument();

  // clean timers
  jest.useRealTimers();
});
