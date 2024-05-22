import Input from "./Input";
import Label from "./Label";

export default function InputForm({
  name,
  type,
  placeholder,
  label,
  onChange = () => {},
  defaultValue = "",
  disabled = false,
  ...props
}: {
  name: string;
  type: string;
  placeholder: string;
  label: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
  disabled?: boolean;
  props?: any;
}) {
  return (
    <div>
      <Label name={name} label={label} />
      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        defaultValue={defaultValue}
        disabled={disabled}
        {...props}
      />
    </div>
  );
}
