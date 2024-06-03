export interface LoadingButtonProps {
  buttonText?: string;
  onAction?: () => void;
  isLoading?: boolean;
}

export function LoadingButton(props: LoadingButtonProps) {
  const {
    buttonText = "Press Me!",
    onAction = () => {},
    isLoading = false,
  } = props;

  return (
    <>
      <button onClick={() => onAction()}>
        {isLoading ? "Loading" : buttonText}
      </button>
    </>
  );
}
