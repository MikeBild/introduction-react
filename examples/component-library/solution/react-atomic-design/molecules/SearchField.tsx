import { useId } from 'react';
import { Input } from '../atoms/Input';
import { Label } from '../atoms/Label';

type SearchFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export const SearchField = ({ label, value, onChange }: SearchFieldProps) => {
  const inputId = useId();
  return (
    <div>
      <Label htmlFor={inputId}>{label}</Label>{' '}
      <Input
        id={inputId}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
};
