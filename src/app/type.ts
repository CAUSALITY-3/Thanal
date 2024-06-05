export interface formData {
  name: formInput;
  phone: formInput;
  email: formInput;
  house: formInput;
  landmark: formInput;
  city: formInput;
  state: formInput;
  pincode: formInput;
  [key: string]: any
}
export interface formInput {
  required: boolean;
  label: string;
  key: string;
  value: any;
  disabled?: boolean;
  type: string;
  invalid: boolean;
  dropDownValues?: string[],
  validationArray?: {method: "includes" | "length" | "dropDown", value?: string[] | number[] | string | number}[],
  validation?: ((value: string) => boolean)[];
  message: string;
}
