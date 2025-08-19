export default function LoadingButton({ color = "blue" }: { color?: string }) {
  return <button data-testid="loading-button" style={{ backgroundColor: color }}>Loading</button>;
}
