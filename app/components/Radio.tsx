import type { ReactNode } from "react";
import { useField } from "remix-validated-form";

type RadioProps = {
  name: string;
  value: string;
  text?: ReactNode;
};

const Radio = ({ name, value, text }: RadioProps) => {
  const { error, getInputProps } = useField(name);
  const id = `${name}-${value}`;

  return (
    <div className="flex">
      <input
        {...getInputProps({ type: "radio", id, value })}
        className="ds-radio"
        aria-describedby={error && `${name}-error`}
      />
      {<label htmlFor={id}>{text}</label>}
    </div>
  );
};

export default Radio;
