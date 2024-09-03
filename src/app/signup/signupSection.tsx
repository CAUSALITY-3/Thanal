// "use client";
// import { FC, useEffect, useState } from "react";
// import { Button } from "@Components/Buttons/Button";
// import { Input } from "@Components/Input/Input";
// import { formData } from "../type";
// import { addValidationFunction, getUserAuth } from "../util";
// import { redirect, useRouter } from "next/navigation";
// import "./signupSection.scss";

// const SingnupSection: FC = async () => {
//   const data = await getUserAuth();
//   console.log("ha ha", { data });
//   data ? localStorage.setItem("user", data) : null;
//   const user = data ? JSON.parse(data) : null;

//   if (user?.phone) {
//     return redirect("/"); // need to update this to profile page
//   }
//   const formDataMain: formData = {
//     name: {
//       required: true,
//       label: "Name",
//       key: "name",
//       value: user?.name || "",
//       disabled: !!user?.name,
//       type: "input",
//       invalid: false,
//       validationArray: [{ method: "length", value: [2, 20] }],
//       // validation: [(value: string) => value.length > 2 && value.length < 20],
//       message: "Please provide valid name.",
//     },
//     phone: {
//       label: "Phone (+91)",
//       key: "phone",
//       value: "",
//       type: "input",
//       required: true,
//       invalid: false,
//       validationArray: [{ method: "length", value: 10 }],
//       // validation: [(value: string) => value.length === 10],
//       message: "Please provide valid 10 digit phone number.",
//     },
//     email: {
//       required: true,
//       label: "email",
//       key: "email",
//       value: user?.email || "",
//       disabled: !!user?.email,
//       type: "input",
//       invalid: false,
//       validationArray: [
//         { method: "length", value: [2, 20] },
//         { method: "includes", value: "@" },
//       ],
//       // validation: [(value: string) => value.length > 2 && value.length < 20 && value.includes("@")],
//       message: "Please provide valid name.",
//     },
//     house: {
//       required: true,
//       label: "House, Building, Company",
//       key: "house",
//       value: "",
//       type: "input",
//       invalid: false,
//       validationArray: [{ method: "length", value: [2, 30] }],
//       // validation: [(value: string) => value.length > 2 && value.length < 30],
//       message: "Invalid Entry",
//     },
//     landmark: {
//       type: "input",
//       label: "Landmark",
//       key: "landmark",
//       value: "",
//       required: true,
//       invalid: false,
//       validationArray: [{ method: "length", value: [2, 30] }],
//       // validation: [(value: string) => value.length > 2 && value.length < 30],
//       message: "Invalid Entry",
//     },
//     city: {
//       type: "dropDown",
//       dropDownValues: [
//         "Adoor",
//         "Alappuzha (Alleppey)",
//         "Aluva",
//         "Angamaly",
//         "Attingal",
//         "Calicut (Kozhikode)",
//         "Changanassery",
//         "Chavakkad",
//         "Chengannur",
//         "Cherthala",
//         "Cherthala",
//         "Cheruthuruthi",
//         "Chittur-Thathamangalam",
//         "Ernakulam",
//         "Guruvayoor",
//         "Idukki",
//         "Irinjalakuda",
//         "Kanhangad",
//         "Kannur",
//         "Kasaragod",
//         "Kayamkulam",
//         "Kochi (Cochin)",
//         "Kollam (Quilon)",
//         "Koothuparamba",
//         "Kottarakkara",
//         "Kottayam",
//         "Kozhikode (Calicut)",
//         "Kunnamkulam",
//         "Kuthuparamba",
//         "Malappuram",
//         "Mananthavady",
//         "Manjeri",
//         "Mannarkkad",
//         "Mattanur",
//         "Mavelikara",
//         "Muvattupuzha",
//         "Nedumangad",
//         "Nedumbassery",
//         "Neyyattinkara",
//         "Nilambur",
//         "North Paravur",
//         "Ottappalam",
//         "Palakkad (Palghat)",
//         "Pandalam",
//         "Pathanamthitta",
//         "Payyannur",
//         "Perinthalmanna",
//         "Perumbavoor",
//         "Ponnani",
//         "Punalur",
//         "Shoranur",
//         "Taliparamba",
//         "Thalassery",
//         "Thiruvalla",
//         "Thiruvananthapuram (Trivandrum)",
//         "Thiruvankulam",
//         "Thodupuzha",
//         "Thrissur",
//         "Tirur",
//         "Tiruvalla",
//         "Tiruvananthapuram (Trivandrum)",
//         "Tiruvannamalai",
//         "Tiruvattur",
//         "Tiruvottiyur",
//         "Vaikom",
//         "Varkala",
//         "Vatakara",
//       ],
//       required: true,
//       label: "City",
//       key: "city",
//       value: "",
//       disabled: false,
//       invalid: false,
//       validationArray: [{ method: "dropDown" }],
//       // validation: [
//       //   (value: string) => {
//       //     const rr = !!(
//       //       value &&
//       //       [
//       //         "Adoor",
//       //         "Alappuzha (Alleppey)",
//       //         "Aluva",
//       //         "Angamaly",
//       //         "Attingal",
//       //         "Calicut (Kozhikode)",
//       //         "Changanassery",
//       //         "Chavakkad",
//       //         "Chengannur",
//       //         "Cherthala",
//       //         "Cherthala",
//       //         "Cheruthuruthi",
//       //         "Chittur-Thathamangalam",
//       //         "Ernakulam",
//       //         "Guruvayoor",
//       //         "Idukki",
//       //         "Irinjalakuda",
//       //         "Kanhangad",
//       //         "Kannur",
//       //         "Kasaragod",
//       //         "Kayamkulam",
//       //         "Kochi (Cochin)",
//       //         "Kollam (Quilon)",
//       //         "Koothuparamba",
//       //         "Kottarakkara",
//       //         "Kottayam",
//       //         "Kozhikode (Calicut)",
//       //         "Kunnamkulam",
//       //         "Kuthuparamba",
//       //         "Malappuram",
//       //         "Mananthavady",
//       //         "Manjeri",
//       //         "Mannarkkad",
//       //         "Mattanur",
//       //         "Mavelikara",
//       //         "Muvattupuzha",
//       //         "Nedumangad",
//       //         "Nedumbassery",
//       //         "Neyyattinkara",
//       //         "Nilambur",
//       //         "North Paravur",
//       //         "Ottappalam",
//       //         "Palakkad (Palghat)",
//       //         "Pandalam",
//       //         "Pathanamthitta",
//       //         "Payyannur",
//       //         "Perinthalmanna",
//       //         "Perumbavoor",
//       //         "Ponnani",
//       //         "Punalur",
//       //         "Shoranur",
//       //         "Taliparamba",
//       //         "Thalassery",
//       //         "Thiruvalla",
//       //         "Thiruvananthapuram (Trivandrum)",
//       //         "Thiruvankulam",
//       //         "Thodupuzha",
//       //         "Thrissur",
//       //         "Tirur",
//       //         "Tiruvalla",
//       //         "Tiruvananthapuram (Trivandrum)",
//       //         "Tiruvannamalai",
//       //         "Tiruvattur",
//       //         "Tiruvottiyur",
//       //         "Vaikom",
//       //         "Varkala",
//       //         "Vatakara",
//       //       ].find((txt) => txt === value)
//       //     );
//       //     return rr;
//       //   },
//       // ],
//       message: "Invalid Entry",
//     },
//     state: {
//       type: "input",
//       label: "State",
//       key: "state",
//       value: "Kerala",
//       required: false,
//       invalid: false,
//       disabled: true,
//       validationArray: [{ method: "length", value: [2, 20] }],
//       // validation: [(value: string) => value.length > 2 && value.length < 20],
//       message: "Invalid Entry",
//     },
//     pincode: {
//       type: "input",
//       required: true,
//       label: "Pincode",
//       key: "pincode",
//       value: "",
//       invalid: false,
//       validationArray: [{ method: "length", value: 6 }],
//       // validation: [(value: string) => value.length === 6],
//       message: "Please provide valid 6 digit pincode.",
//     },
//   };

//   const step = 2;
//   const router = useRouter();
//   const [submit, setSubmit] = useState(false);
//   const [lastOne, setLastOne] = useState(false);
//   const [formData, setFormData] = useState(formDataMain);

//   // useEffect(() => {
//   //   if (formDataProp) {
//   //     setFormData(addValidationFunction(formDataProp));
//   //   }
//   // }, []);

//   useEffect(() => {
//     const invalid = Object.values(formData).filter(
//       (form) => form.required && (form.invalid || !form.value)
//     );
//     if (!invalid.length) {
//       setSubmit(true);
//     } else {
//       setSubmit(false);
//       if (invalid.length === 1) {
//         setLastOne(true);
//       }
//     }
//   }, [formData]);

//   const validate = () => {
//     Object.values(formData).forEach((element) => {
//       if (element) {
//         const isInValid: boolean =
//           element.required &&
//           !element.disabled &&
//           !!element.validation.find((fn: any) => fn(element.value) === false);
//         if (isInValid) {
//           setFormData((prevState: any) => ({
//             ...prevState,
//             [element.key]: {
//               ...prevState[element.key],
//               invalid: true,
//             },
//           }));
//         } else {
//           setFormData((prevState: any) => ({
//             ...prevState,
//             [element.key]: {
//               ...prevState[element.key],
//               invalid: false,
//             },
//           }));
//         }
//       }
//     });
//   };

//   const handleSubmit = async (event: React.SyntheticEvent) => {
//     validate();
//     console.log("details", formData);
//     if (submit) {
//       const email = formData.email.value;
//       const payload = {
//         phone: formData.phone.value,
//         address: {
//           house: formData.house.value,
//           landmark: formData.landmark.value,
//           city: formData.city.value,
//           state: formData.state.value,
//           pincode: formData.pincode.value,
//         },
//       };

//       const body: any = JSON.stringify({ payload, email });
//       console.log("payload", payload, "email", email);
//       const response: any = await fetch("/api/addDetails", {
//         method: "POST",
//         body,
//       });
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//     }
//     router.push("/");
//   };

//   return (
//     <>
//       <div className="loginOuterDiv">
//         <div className="loginContainer">
//           <div className="steps">Step {step} of 2</div>
//           {/* {step === 1 ? (
//             <div className="loginWithhGooleButton">
//               <div className="loginWithhGooleText">
//                 Sign Up with Google
//               </div>
//               <img src={googleIcon} alt="" className="loginWithhGooleIcon"/>
//             </div>
//           ) : ( */}
//           <div className="formContainer">
//             <div>
//               {Object.values(formData).map((data, index) => (
//                 <Input
//                   key={index}
//                   formData={data}
//                   setFormData={setFormData}
//                   lastOne={lastOne}
//                 />
//               ))}
//               <div className="formControl">
//                 <div onClick={handleSubmit}>
//                   <Button
//                     content="Add Details"
//                     color={!submit ? "grey" : ""}
//                     disabled={!submit}
//                   />
//                 </div>
//                 <div
//                   style={{ cursor: "pointer" }}
//                   onClick={() => router.push("/profile")}
//                 >
//                   <Button content="Skip" color="#00aaee" />
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* )} */}
//         </div>
//       </div>
//     </>
//   );
// };

// export default SingnupSection;
