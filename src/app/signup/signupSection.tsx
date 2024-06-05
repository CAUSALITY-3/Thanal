"use client";
import { FC, useEffect, useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { Button } from "@Components/Buttons/Button";
import { Input } from "@Components/Input/Input";
import { formData } from "../type";
import { addValidationFunction } from "../util";

const styles = stylex.create({
  loginOuterDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    minHeight: "70vh",
    margin: "30px 0",
  },
  loginContainer: {
    display: "flex",
    alignItems: "center",
    padding: "40px 20px",
    flexDirection: "column",
    // background: "rgba(0, 0, 0, .03)",
    justifyContent: "center",
    width: "100%",
    maxWidth: "500px",
    minHeight: "40vh",
  },
  steps: {
    color: "grey",
    marginBottom: "25px",
  },
  loginWithhGooleButton: {
    display: "flex",
    padding: "5px 10px",
    background: "rgba(0, 0, 0, .05)",
    borderRadius: "3px",
    ":hover": {
      cursor: "pointer",
      background: "rgba(0, 0, 0, .1)",
    },
  },
  loginWithhGooleText: {
    marginRight: "20px",
  },
  formContainer: {
    width: "70%",
  },
  formControl: {
    display: "flex",
    paddingTop: "16px",
    flexDirection: "column",
  },
});

const SingnupSection: FC<{ formDataProp: formData }> = ({ formDataProp }) => {
  const step = 2;

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

  const submitButton: any = {
    pointerEvents: !submit ? "none" : "true",
  };
  const validate = () => {
    Object.values(formData).forEach((element) => {
      if (element) {
        const isInValid =
          element.required &&
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

  const handleSubmit = (event: React.SyntheticEvent) => {
    validate();
  };

  return (
    <>
      <div {...stylex.props(styles.loginOuterDiv)}>
        <div {...stylex.props(styles.loginContainer)}>
          <div {...stylex.props(styles.steps)}>Step {step} of 2</div>
          {/* {step === 1 ? (
            <div {...stylex.props(styles.loginWithhGooleButton)}>
              <div {...stylex.props(styles.loginWithhGooleText)}>
                Sign Up with Google
              </div>
              <Image src={googleIcon} alt="" style={loginWithhGooleIcon}/>
            </div>
          ) : ( */}
          <div {...stylex.props(styles.formContainer)}>
            <div>
              {Object.values(formData).map((data, index) => (
                <Input
                  key={index}
                  formData={data}
                  setFormData={setFormData}
                  lastOne={lastOne}
                />
              ))}
              <div {...stylex.props(styles.formControl)}>
                <div style={submitButton} onClick={handleSubmit}>
                  <Button content="Login" color={!submit ? "grey" : ""} />
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
