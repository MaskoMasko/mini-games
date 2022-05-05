import { atom } from "recoil";

export interface FieldsValuesInterface {
  id: number;
  content: string;
}

export const fieldsValues = atom({
  key: "fieldsValues", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
