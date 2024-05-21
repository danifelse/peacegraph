import Input from "./Input";
import Label from "./Label";

export default function InputForm({
  name,
  type,
  placeholder,
  label,
  ...props
}: {
  name: string;
  type: string;
  placeholder: string;
  label: string;
}) {
  return (
    <div>
      <Label name={name} label={label} />
      <Input name={name} type={type} placeholder={placeholder} {...props} />
    </div>
  );
}
