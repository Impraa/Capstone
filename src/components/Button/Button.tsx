import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from "./Button.styles";
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
      <GoogleSignInButton onClick={onClick} {...properties.properties}>
        {children}
      </GoogleSignInButton>
    ) : buttonType === "default" ? (
      <BaseButton onClick={onClick} {...properties.properties}>
        {children}
      </BaseButton>
    ) : (
      <InvertedButton onClick={onClick} {...properties.properties}>
        {children}
      </InvertedButton>
    )
  );
}

export default Button;
