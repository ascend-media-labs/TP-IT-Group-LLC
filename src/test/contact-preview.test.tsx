import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ContactForm } from "@/components/corporate/sections";

afterEach(() => vi.restoreAllMocks());

function submit() {
  render(<ContactForm />);
  const fill = (placeholder: RegExp, value: string) =>
    fireEvent.change(screen.getByPlaceholderText(placeholder), { target: { value } });
  fill(/John Doe/, "Preview Tester");
  fill(/john@company\.com/, "tester@example.com");
  fill(/digital goals/, "A business enquiry");
  fireEvent.click(screen.getByRole("button", { name: /Submit Request/ }));
}

describe("Contact form", () => {
  it("thanks the visitor when the enquiry is saved", async () => {
    vi.spyOn(window, "open").mockReturnValue(window);
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("{}", { status: 201 }));
    submit();
    expect(await screen.findByText("Thank you!")).toBeInTheDocument();
  });

  it("says so, and keeps the text, when saving fails", async () => {
    vi.spyOn(window, "open").mockReturnValue(window);
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ error: "Too many requests." }), { status: 429 }),
    );
    submit();
    expect(await screen.findByText("We could not save your request.")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/John Doe/)).toHaveValue("Preview Tester");
  });
});
