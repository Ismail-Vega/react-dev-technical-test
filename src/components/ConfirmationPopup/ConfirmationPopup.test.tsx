import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ConfirmationPopup from "./ConfirmationPopup";
import { ConfirmationPopupProps } from "./ConfirmationPopupProps";

describe("ConfirmationPopup", () => {
  const setup = (props: ConfirmationPopupProps) => {
    render(<ConfirmationPopup {...props} />);
  };

  it("renders with correct title and description", () => {
    setup({
      open: true,
      onClose: jest.fn(),
      onConfirm: jest.fn(),
      title: "Confirm Action",
      description: "Are you sure you want to proceed?",
      anchorEl: document.body,
    });

    expect(screen.getByTestId("confirmation-popup-title")).toHaveTextContent(
      "Confirm Action"
    );
    expect(
      screen.getByTestId("confirmation-popup-description")
    ).toHaveTextContent("Are you sure you want to proceed?");
  });

  it("calls onClose when clicking outside the popup", async () => {
    const onClose = jest.fn();
    setup({
      open: true,
      onClose,
      onConfirm: jest.fn(),
      title: "Confirm Action",
      description: "Are you sure you want to proceed?",
      anchorEl: document.body,
    });

    await userEvent.click(document.body);

    expect(onClose).toHaveBeenCalled();
  });

  it("calls onConfirm when Confirm button is clicked", async () => {
    const onConfirm = jest.fn();
    setup({
      open: true,
      onClose: jest.fn(),
      onConfirm,
      title: "Confirm Action",
      description: "Are you sure you want to proceed?",
      anchorEl: document.body,
    });

    await userEvent.click(screen.getByTestId("confirm-button"));

    expect(onConfirm).toHaveBeenCalled();
  });

  it("calls onClose when Cancel button is clicked", async () => {
    const onClose = jest.fn();
    setup({
      open: true,
      onClose,
      onConfirm: jest.fn(),
      title: "Confirm Action",
      description: "Are you sure you want to proceed?",
      anchorEl: document.body,
    });

    await userEvent.click(screen.getByTestId("cancel-button"));

    expect(onClose).toHaveBeenCalled();
  });
});
