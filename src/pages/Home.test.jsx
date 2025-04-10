import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Home from "./Home";
import Quotes from "../assets/Quotes";

// Mock react-helmet to avoid warnings/errors
vi.mock("react-helmet", () => ({
  Helmet: ({ children }) => <div data-testid="helmet">{children}</div>,
}));

// Mock the React Router hooks
vi.mock("react-router-dom", () => ({
  useParams: () => {
    // Find the latest quote (with the highest ID) for our test
    const latestQuote = [...Quotes].sort((a, b) => b.id - a.id)[0];
    return { id: latestQuote.id.toString() };
  },
  useNavigate: () => vi.fn(),
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Link: ({ children }) => <a>{children}</a>
}));

describe("Home component", () => {
  it("renders the latest quote correctly", () => {
    // Find the latest quote (with the highest ID)
    const latestQuote = [...Quotes].sort((a, b) => b.id - a.id)[0];
    
    // Render the Home component
    render(<Home />);

    // Wait for the component to finish loading and find the quote element
    const quoteElement = screen.getByText(latestQuote.quote);

    // Assert that the latest quote text is rendered
    expect(quoteElement).toBeInTheDocument();

    // Assert that the quote is rendered inside an emphasized element
    expect(quoteElement.closest("em")).toBeInTheDocument();

    // Assert that the title contains the quote number
    expect(screen.getByTestId("helmet")).toHaveTextContent(
      `Quote #${latestQuote.id}`
    );
  });
});
