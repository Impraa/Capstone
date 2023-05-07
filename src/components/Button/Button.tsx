import "./Button.scss";
interface buttonProps {
  children: string;
  buttonType: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  properties: {
    type: "button" | "submit" | "reset" | undefined;
  };
}

/* const buttonTypeClasess = {
  google: "google-sign-in",
  default: "default",
  inverted: "inverted",
}; */

function Button({ children, buttonType, onClick, ...properties }: buttonProps) {
  return (
    <button
      className={`button-container ${
        buttonType === "google"
          ? "google-sign-in"
          : buttonType === "default"
          ? "default"
          : "inverted"
      }`}
      onClick={onClick}
      {...properties.properties}
    >
      {children}
    </button>
  );
}

export default Button;
