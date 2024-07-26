import { ReactNode } from "react";

export interface AppFormProps {
  label: string;
  icon: ReactNode;
  initialTitleValue?: string;
  onSubmit: (title: string) => void;
}
