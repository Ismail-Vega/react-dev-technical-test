import { ReactNode } from "react";

export interface ListNavItemProps {
  path: string;
  value: string;
  icon: ReactNode;
  onClick?: () => void;
  navigate: (path: string) => void;
}
