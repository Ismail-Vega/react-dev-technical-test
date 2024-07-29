import { MAX_TITLE_LENGTH, MIN_TITLE_LENGTH } from "../constants";

export const handleFormValidation = (
  title: string
): { isValid: boolean; errorMsg: string } => {
  if (title.trim().length < MIN_TITLE_LENGTH) {
    return {
      isValid: false,
      errorMsg: `Title must be at least ${MIN_TITLE_LENGTH} characters.`,
    };
  }

  if (title.trim().length > MAX_TITLE_LENGTH) {
    return {
      isValid: false,
      errorMsg: `Title must be no more than ${MAX_TITLE_LENGTH} characters.`,
    };
  }

  return { isValid: true, errorMsg: "" };
};
