import { type ReactNode } from "react";

interface LoadingButtonProps {
  color?: string;
  loading?: boolean;
  children?: ReactNode;
  onBtnClick?: () => void;
}

export default function LoadingButton({
  color = "white",
  loading = false,
  children = <></>,
  onBtnClick = () => {},
}: LoadingButtonProps) {
  return (
    <button
      disabled={loading}
      onClick={onBtnClick}
      data-testid="loading-button"
      style={{ backgroundColor: color }}
    >
      {loading ? "loading" : children}
    </button>
  );
}
