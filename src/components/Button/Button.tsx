import {
  BaseButton,
  ButtonSpinner,
  GoogleSignInButton,
  InvertedButton,
} from "./Button.styles";
interface buttonProps {
  children: string;
  buttonType: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
  properties: {
    type: "button" | "submit" | "reset" | undefined;
  };
}

/* const buttonTypeClasess = {
  google: "google-sign-in",
  default: "default",
  inverted: "inverted",
}; */

function Button({
  children,
  buttonType,
  onClick,
  disabled,
  ...properties
}: buttonProps) {
  return (
    /*  <button
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
    </button> */
    buttonType === "google" ? (
      <GoogleSignInButton
        disabled={disabled}
        onClick={onClick}
        {...properties.properties}
      >
        {disabled ? <ButtonSpinner /> : children}
      </GoogleSignInButton>
    ) : buttonType === "default" ? (
      <BaseButton
        onClick={onClick}
        disabled={disabled}
        {...properties.properties}
      >
        {disabled ? <ButtonSpinner /> : children}
      </BaseButton>
    ) : (
      <InvertedButton
        onClick={onClick}
        disabled={disabled}
        {...properties.properties}
      >
        {disabled ? <ButtonSpinner /> : children}
      </InvertedButton>
    )
  );
}

export default Button;
