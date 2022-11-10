import { ChangeEvent } from "react";

interface Props {
  name: string;
  value?: string;
  onChange: (name: string, value: any) => any;
  [key: string]: any;
}

const TextBox = ({ name, value, id, onChange, ...props }: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.name, e.target.value);
  };

  return <input name={name} value={value} onChange={handleChange} {...props} />;
};

export default TextBox;
