"use client"

import { FC, HTMLInputTypeAttribute, useEffect, useState } from "react";
import Image from "next/image";
import * as stylex from "@stylexjs/stylex";
import googleIcon from "../../assets/google_icon.svg";
import { Button } from "@Components/Buttons/Button";
import { Input } from "@Components/Input/Input";

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
  }
});

const SignUp: FC = () => {
  const step = 2;

  const [submit, setSubmit] = useState(false);
  const [lastOne, setLastOne] = useState(false);
  const [formData, setFormData] = useState({
    name: {
      required: true,
      label: "Name",
      key: "name",
      value: "",
      type: "input",
      invalid: false,
      validation: [(value: string) => value.length > 2 && value.length < 20],
      message: "Please provide valid name.",
    },
    phone: {
      label: "Phone (+91)",
      key: "phone",
      value: "",
      type: "input",
      required: false,
      invalid: false,
      validation: [(value: string) => value.length === 10],
      message: "Please provide valid 10 digit phone number.",
    },
    house: {
      required: true,
      label: "House, Building, Company",
      key: "house",
      value: "",
      type: "input",
      invalid: false,
      validation: [(value: string) => value.length > 2 && value.length < 30],
      message: "Invalid Entry",
    },
    landmark: {
      type: "input",
      label: "Landmark",
      key: "landmark",
      value: "",
      required: true,
      invalid: false,
      validation: [(value: string) => value.length > 2 && value.length < 30],
      message: "Invalid Entry",
    },
    city: {
      type: "input",
      // dropDownValues: [
      //   "Tiruvannamalai",
      //   "Tiruvattur",
      //   "Tiruvottiyur",
      //   "Vaikom",
      //   "Varkala",
      //   "Vatakara",
      // ],
      required: true,
      label: "City",
      key: "city",
      value: "Kozhikode",
      disabled: true,
      invalid: false,
      validation: [
        (value: string) => {
          const rr = !!(
            value &&
            [
              "Adoor",
              "Alappuzha (Alleppey)",
              "Aluva",
              "Angamaly",
              "Attingal",
              "Calicut (Kozhikode)",
              "Changanassery",
              "Chavakkad",
              "Chengannur",
              "Cherthala",
              "Cherthala",
              "Cheruthuruthi",
              "Chittur-Thathamangalam",
              "Ernakulam",
              "Guruvayoor",
              "Idukki",
              "Irinjalakuda",
              "Kanhangad",
              "Kannur",
              "Kasaragod",
              "Kayamkulam",
              "Kochi (Cochin)",
              "Kollam (Quilon)",
              "Koothuparamba",
              "Kottarakkara",
              "Kottayam",
              "Kozhikode (Calicut)",
              "Kunnamkulam",
              "Kuthuparamba",
              "Malappuram",
              "Mananthavady",
              "Manjeri",
              "Mannarkkad",
              "Mattanur",
              "Mavelikara",
              "Muvattupuzha",
              "Nedumangad",
              "Nedumbassery",
              "Neyyattinkara",
              "Nilambur",
              "North Paravur",
              "Ottappalam",
              "Palakkad (Palghat)",
              "Pandalam",
              "Pathanamthitta",
              "Payyannur",
              "Perinthalmanna",
              "Perumbavoor",
              "Ponnani",
              "Punalur",
              "Shoranur",
              "Taliparamba",
              "Thalassery",
              "Thiruvalla",
              "Thiruvananthapuram (Trivandrum)",
              "Thiruvankulam",
              "Thodupuzha",
              "Thrissur",
              "Tirur",
              "Tiruvalla",
              "Tiruvananthapuram (Trivandrum)",
              "Tiruvannamalai",
              "Tiruvattur",
              "Tiruvottiyur",
              "Vaikom",
              "Varkala",
              "Vatakara",
            ].find((txt) => txt === value)
          );
          return rr;
        },
      ],
      message: "Invalid Entry",
    },
    state: {
      type: "input",
      label: "State",
      key: "state",
      value: "Kerala",
      required: false,
      invalid: false,
      disabled: true,
      validation: [(value: string) => value.length > 2 && value.length < 20],
      message: "Invalid Entry",
    },
    pincode: {
      type: "input",
      required: true,
      label: "Pincode",
      key: "pincode",
      value: "",
      invalid: false,
      validation: [(value: string) => value.length === 6],
      message: "Please provide valid 6 digit pincode.",
    },
  });
  
  const loginWithhGooleIcon = {
    width: "18px",
    height: "18px",
  }
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

  const submitButton:any = {
    pointerEvents: !submit ? "none" : "true",
  }
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
                  <div
                    style = {submitButton}
                    onClick={handleSubmit}
                  >
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

export default SignUp;
