import { ReactNode } from "react";

export interface AppFormProps {
  label: string;
  icon: ReactNode;
  initialNameValue?: string;
  initialDescriptionValue?: string;
  onSubmit: (name: string, description: string) => void;
}
