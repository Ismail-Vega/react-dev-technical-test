import { handleFormValidation } from "../utils";
import { MIN_TITLE_LENGTH, MAX_TITLE_LENGTH } from "../constants";

describe("handleFormValidation", () => {
  it("should return invalid and error message if title is too short", () => {
    const shortTitle = "a".repeat(MIN_TITLE_LENGTH - 1);
    const result = handleFormValidation(shortTitle);
    expect(result).toEqual({
      isValid: false,
      errorMsg: `Title must be at least ${MIN_TITLE_LENGTH} characters.`,
    });
  });

  it("should return invalid and error message if title is too long", () => {
    const longTitle = "a".repeat(MAX_TITLE_LENGTH + 1);
    const result = handleFormValidation(longTitle);
    expect(result).toEqual({
      isValid: false,
      errorMsg: `Title must be no more than ${MAX_TITLE_LENGTH} characters.`,
    });
  });

  it("should return valid and no error message if title length is within range", () => {
    const validTitle = "a".repeat((MIN_TITLE_LENGTH + MAX_TITLE_LENGTH) / 2);
    const result = handleFormValidation(validTitle);
    expect(result).toEqual({
      isValid: true,
      errorMsg: "",
    });
  });
});
