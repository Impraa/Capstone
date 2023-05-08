import { useContext, useState } from "react";
import { createUserWithInfo, createUser } from "../../utils/Firebase/firebase";
import { UserCredential } from "firebase/auth";
import FormField from "../FormField/FormField";
import "./SignUp.scss";
import Button from "../Button/Button";
import { UserContext } from "../../contexts/UserContext";

interface formDataInter {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function SignUp() {
  const [formData, setFormData] = useState<formDataInter>({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    if (formData.password !== formData.confirmPassword)
      return alert("Password not matching");
    else if (!formData.password || !formData.email)
      return alert("Email and Password not provided");
    try {
      const response: UserCredential = await createUserWithInfo(
        formData.email,
        formData.password
      );
      await createUser(response.user, { displayName: formData.displayName });

      setUser(response.user);

      setFormData({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      if (
        (error as Error).message ===
        "Firebase: Error (auth/email-already-in-use)."
      ) {
        alert("Cannot create user, email in use");
      }
      console.log("Error occured ", (error as Error).message);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          handleSubmit(e);
        }}
      >
        <FormField
          label="Display name:"
          properties={{
            type: "text",
            id: "displayName",
            name: "displayName",
            required: true,
            onChange: handleChange,
            value: formData?.displayName,
          }}
        />
        <FormField
          label="Email:"
          properties={{
            type: "email",
            id: "email",
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
            id: "password",
            name: "password",
            required: true,
            onChange: handleChange,
            value: formData?.password,
          }}
        />
        <FormField
          label="Confirm Password:"
          properties={{
            type: "password",
            id: "confirmPassowrd",
            name: "confirmPassword",
            required: true,
            onChange: handleChange,
            value: formData?.confirmPassword,
          }}
        />
        <Button buttonType={"default"} properties={{ type: "submit" }}>
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default SignUp;
