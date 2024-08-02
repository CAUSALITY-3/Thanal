"use client";
import { FC, useEffect, useState } from "react";
// import * as stylex from "@stylexjs/stylex";
import { Button } from "@Components/Buttons/Button";
import { Input } from "@Components/Input/Input";
import { formData } from "../type";
import { addValidationFunction } from "../util";
import { useRouter } from "next/navigation";
import "./signupSection.scss";

// const styles = stylex.create({
//   loginOuterDiv: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     width: "100%",
//     minHeight: "70vh",
//     margin: "30px 0",
//   },
//   loginContainer: {
//     display: "flex",
//     alignItems: "center",
//     padding: "40px 20px",
//     flexDirection: "column",
//     // background: "rgba(0, 0, 0, .03)",
//     justifyContent: "center",
//     width: "100%",
//     maxWidth: "500px",
//     minHeight: "40vh",
//   },
//   steps: {
//     color: "grey",
//     marginBottom: "25px",
//   },
//   loginWithhGooleButton: {
//     display: "flex",
//     padding: "5px 10px",
//     background: "rgba(0, 0, 0, .05)",
//     borderRadius: "3px",
//     ":hover": {
//       cursor: "pointer",
//       background: "rgba(0, 0, 0, .1)",
//     },
//   },
//   loginWithhGooleText: {
//     marginRight: "20px",
//   },
//   formContainer: {
//     width: "70%",
//   },
//   formControl: {
//     display: "flex",
//     paddingTop: "16px",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
// });

const SingnupSection: FC<{ formDataProp: formData }> = ({ formDataProp }) => {
  const step = 2;
  const router = useRouter();
  const [submit, setSubmit] = useState(false);
  const [lastOne, setLastOne] = useState(false);
  const [formData, setFormData] = useState(formDataProp);

  //   const loginWithhGooleIcon = {
  //     width: "18px",
  //     height: "18px",
  //   }

  useEffect(() => {
    if (formDataProp) {
      setFormData(addValidationFunction(formDataProp));
    }
  }, []);

  useEffect(() => {
    const invalid = Object.values(formData).filter(
      (form) => form.required && (form.invalid || !form.value)
    );
    if (!invalid.length) {
      setSubmit(true);
    } else {
      setSubmit(false);
      if (invalid.length === 1) {
        setLastOne(true);
      }
    }
  }, [formData]);

  const validate = () => {
    Object.values(formData).forEach((element) => {
      if (element) {
        const isInValid: boolean =
          element.required &&
          !element.disabled &&
          !!element.validation.find((fn: any) => fn(element.value) === false);
        if (isInValid) {
          setFormData((prevState: any) => ({
            ...prevState,
            [element.key]: {
              ...prevState[element.key],
              invalid: true,
            },
          }));
        } else {
          setFormData((prevState: any) => ({
            ...prevState,
            [element.key]: {
              ...prevState[element.key],
              invalid: false,
            },
          }));
        }
      }
    });
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    validate();
    console.log("details", formData);
    if (submit) {
      const email = formData.email.value;
      const payload = {
        phone: formData.phone.value,
        address: {
          house: formData.house.value,
          landmark: formData.landmark.value,
          city: formData.city.value,
          state: formData.state.value,
          pincode: formData.pincode.value,
        },
      };

      const body: any = JSON.stringify({ payload, email });
      console.log("payload", payload, "email", email);
      const response: any = await fetch("/api/addDetails", {
        method: "POST",
        body,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    }
    router.push("/");
  };

  return (
    <>
      <div className="loginOuterDiv">
        <div className="loginContainer">
          <div className="steps">Step {step} of 2</div>
          {/* {step === 1 ? (
            <div className="loginWithhGooleButton">
              <div className="loginWithhGooleText">
                Sign Up with Google
              </div>
              <Image src={googleIcon} alt="" className="loginWithhGooleIcon"/>
            </div>
          ) : ( */}
          <div className="formContainer">
            <div>
              {Object.values(formData).map((data, index) => (
                <Input
                  key={index}
                  formData={data}
                  setFormData={setFormData}
                  lastOne={lastOne}
                />
              ))}
              <div className="formControl">
                <div onClick={handleSubmit}>
                  <Button
                    content="Add Details"
                    color={!submit ? "grey" : ""}
                    disabled={!submit}
                  />
                </div>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => router.push("/")}
                >
                  <Button content="Skip" color="#00aaee" />
                </div>
              </div>
            </div>
          </div>
          {/* )} */}
        </div>
      </div>
    </>
  );
};

export default SingnupSection;
