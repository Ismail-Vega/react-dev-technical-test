import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import AppModal from "./AppModal";

describe("AppModal", () => {
  it("renders correctly when open", () => {
    render(
      <AppModal isOpen={true} onClose={jest.fn()} title="Test Modal">
        <div>Modal Content</div>
      </AppModal>
    );

    expect(screen.getByTestId("modal-container")).toBeInTheDocument();
    expect(screen.getByTestId("modal-box")).toBeInTheDocument();
    expect(screen.getByTestId("modal-title")).toHaveTextContent("Test Modal");
    expect(screen.getByTestId("modal-content")).toHaveTextContent(
      "Modal Content"
    );
  });

  it("does not render when closed", () => {
    render(
      <AppModal isOpen={false} onClose={jest.fn()} title="Test Modal">
        <div>Modal Content</div>
      </AppModal>
    );

    expect(screen.queryByTestId("modal-container")).toBeNull();
  });

  it("calls onClose when clicking outside the modal", async () => {
    const handleClose = jest.fn();
    render(
      <AppModal isOpen={true} onClose={handleClose} title="Test Modal">
        <div>Modal Content</div>
      </AppModal>
    );

    await userEvent.click(screen.getByTestId("modal-container"));
    expect(handleClose).toHaveBeenCalled();
  });

  it("calls onClose when clicking the close button", async () => {
    const handleClose = jest.fn();
    render(
      <AppModal isOpen={true} onClose={handleClose} title="Test Modal">
        <div>Modal Content</div>
      </AppModal>
    );

    await userEvent.click(screen.getByTestId("modal-close-button"));
    expect(handleClose).toHaveBeenCalled();
  });
});
