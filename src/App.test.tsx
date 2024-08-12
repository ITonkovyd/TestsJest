/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { render, screen, fireEvent } from "@testing-library/react";
import TopModal from "./components/TopModal/TopModal";

interface defaultProps {
  autoId: number;
  setModalShow: (show: boolean) => void;
  topLevel: { top: number; expire?: string };
  langId: number;
  salonDateClosed: string;
  vin: string;
}

const renderTopModal = (props: Partial<defaultProps> = {}) => {
  const defaultProps = {
    autoId: 1,
    setModalShow: jest.fn(),
    topLevel: { top: 5, expire: "2024-12-31" },
    langId: 4,
    salonDateClosed: "2024-12-31",
    vin: "1234567890ABCDEFG",
  };

  return render(<TopModal {...{ ...defaultProps, ...props }} />);
};

describe("TopModal component", () => {
  it("should be render successfully", () => {
    renderTopModal();
  });

  it("Should be top input", () => {
    renderTopModal();
    const topInputs = screen.getAllByRole("spinbutton");
    topInputs.forEach(input => {
      expect(input).toBeInTheDocument();
    });
  });

  it("should display the correct position in search", () => {
    renderTopModal({ topLevel: { top: 3, expire: "2024-11-30" } });

    const position = screen.getByText("№");
    expect(position).toHaveTextContent("№");
  });

  it("Should render 4 topLevel", () => {
    const { container } = renderTopModal({ topLevel: { top: 0, expire: "2024-12-31" } });

    const levelTopInput = container.querySelector("#levelTop") as HTMLInputElement;

    expect(levelTopInput.value).toBe("4");
  });

  it("Level period should be until 17", () => {
    renderTopModal({ topLevel: { top: 0, expire: "2024-08-17" } });

    const container = screen.getByText(/Термін дії до/i);
    expect(container).toHaveTextContent("Термін дії до 17 серп.");
  });

  it("Shoul be price 160", () => {
    renderTopModal({ topLevel: { top: 0, expire: "" } });

    const priceButton = screen.getByText(/До оплати:/i);
    expect(priceButton).toHaveTextContent("До оплати: 160 грн");
  });

  it("should call CloseModal function after click on pay button", () => {
    const mockSetModalShow = jest.fn();
    renderTopModal({ setModalShow: mockSetModalShow });

    const payButton = screen.getByText("До оплати");
    expect(payButton).toBeDefined();
    fireEvent.click(payButton);
    expect(mockSetModalShow).toHaveBeenCalledWith(false);
  });

  it("should update expiration date when timePeriod changes", () => {
    renderTopModal({ topLevel: { top: 2, expire: "2024-10-01" } });

    const timePeriodInput = document.getElementById("timePeriod") as HTMLElement;
    fireEvent.change(timePeriodInput, { target: { value: "10" } });

    const expireDate = screen.getByText(/Термін дії до/i);
    expect(expireDate).toHaveTextContent("Термін дії до 21 серп.");
  });
});
