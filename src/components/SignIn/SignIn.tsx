import { UserCredential } from "firebase/auth";
import {
  signInWithGooglePopup,
  createUser,
  signInUserWithInfo,
} from "../../utils/Firebase/firebase";
import { useContext, useState } from "react";
import FormField from "../FormField/FormField";
import "./SignIn.scss";
import Button from "../Button/Button";
import React from "react";
import { UserContext } from "../../contexts/UserContext";

interface formDataInter {
  email: string;
  password: string;
}

const logUserWithGoogle = async () => {
  const response: UserCredential = await signInWithGooglePopup();
  const userDocRef = await createUser(response.user, {});
};

function SignIn() {
  const [formData, setFormData] = useState<formDataInter>({
    email: "",
    password: "",
  });

  const { setUser } = useContext(UserContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevFormData: formDataInter) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.password || !formData.email)
      return alert("Email and Password not provided");
    try {
      const response = await signInUserWithInfo(
        formData.email,
        formData.password
      );
      setUser(response.user);
      console.log(response.user);
      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      switch ((error as Error).message) {
        case "Firebase: Error (auth/user-not-found).":
          alert("User doesn't exist");
          break;
        case "Firebase: Error (auth/wrong-password).":
          alert("Wrong email or password");
          break;
        default:
          (error as Error).message;
          break;
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign up with your email and password</span>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          handleSubmit(e);
        }}
      >
        <FormField
          label="Email:"
          properties={{
            type: "email",
            id: "signInEmail",
            name: "email",
            required: true,
            onChange: handleChange,
            value: formData?.email,
          }}
        />
        <FormField
          label="Password:"
          properties={{
            type: "password",
            id: "signInPassword",
            name: "password",
            required: true,
            onChange: handleChange,
            value: formData?.password,
          }}
        />
        <div className="buttons-container">
          <Button buttonType={"default"} properties={{ type: "submit" }}>
            Sign In
          </Button>
          <Button
            buttonType={"google"}
            properties={{ type: "button" }}
            onClick={logUserWithGoogle}
          >
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
