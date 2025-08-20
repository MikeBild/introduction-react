import { type ReactNode } from "react";

interface LoadingButtonProps {
  color?: string;
  loading?: boolean;
  children?: ReactNode;
  onBtnClick?: () => void;
  testId?: string;
}

export default function LoadingButton({
  color = "white",
  loading = false,
  children = <></>,
  onBtnClick = () => {},
  testId,
}: LoadingButtonProps) {
  return (
    <button
      disabled={loading}
      onClick={onBtnClick}
      data-testid={testId}
      style={{ backgroundColor: color }}
    >
      {loading ? "loading" : children}
    </button>
  );
}
