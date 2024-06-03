export interface ButtonProps {
  buttonText?: string;
  onAction?: () => void;
}

export function Button({
  buttonText = "Press Me!",
  onAction = () => {},
}: ButtonProps) {
  return (
    <>
      <button onClick={() => onAction()}>{buttonText}</button>
    </>
  );
}
