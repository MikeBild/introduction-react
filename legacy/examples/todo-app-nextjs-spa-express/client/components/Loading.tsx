export interface Loading {
  isLoading?: boolean;
  hasError?: boolean;
  children?: React.ReactNode;
  renderErrorMessage?: React.ReactNode;
}

export default function Loading({
  isLoading,
  hasError,
  children,
  renderErrorMessage,
}: Loading) {
  return (
    <>
      {isLoading && <span data-testid="loading-text">Loading</span>}
      {hasError && (
        <span data-testid="loading-error">{renderErrorMessage}</span>
      )}

      {!isLoading && <div data-testid="loading-content">{children}</div>}
    </>
  );
}
