import TextBox from "components/TextBox";
import FormItemStyled from "./FormItemStyled";

interface Props {
  name: string;
  label: string;
  value?: string;
  className?: string;
  error?: string;
  onChange: (name: string, value: string) => any;
  [key: string]: any;
}

const FormItem = ({
  name,
  label,
  value,
  onChange,
  error,
  className,
  ...props
}: Props) => {
  const labelFor = "id" in props ? props.id : null;
  return (
    <FormItemStyled hasError={!!error} className={className}>
      <label className="input-label" htmlFor={labelFor}>
        {label}
      </label>
      <TextBox
        className="input-box"
        value={value}
        name={name}
        onChange={onChange}
        {...props}
      />
      {error && <span className="error">{error}</span>}
    </FormItemStyled>
  );
};

export default FormItem;
