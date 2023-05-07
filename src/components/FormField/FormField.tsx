import "./FormField.scss";

interface formFieldPropInter {
  label: string;
  properties: {
    type: string;
    id: string;
    name: string;
    required?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
  };
}

function FormField({ label, ...properties }: formFieldPropInter) {
  return (
    <div className="group">
      <input className="form-input" {...properties.properties} />{" "}
      {label && (
        <label
          className={`${
            properties.properties.value.length > 0 ? "shrink" : ""
          } form-input-label`}
          htmlFor={properties.properties.id}
        >
          {label}
        </label>
      )}
    </div>
  );
}

export default FormField;
