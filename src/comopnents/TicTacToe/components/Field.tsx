import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import {
  fieldsValues,
  FieldsValuesInterface,
} from "../recoil/atoms/fieldsValues";

interface FieldPropsInterface {
  currentPlayer: number;
  id: number;
  clearFields: boolean;
  setCurrentPlayer: React.Dispatch<React.SetStateAction<number>>;
}

export const Field = ({
  currentPlayer,
  setCurrentPlayer,
  id,
  clearFields,
}: FieldPropsInterface) => {
  const [fieldInfo, setFieldInfo] = useState({
    value: "",
    errorMessage: "It already has a value!",
  });

  const setFieldValues = useSetRecoilState(fieldsValues) as any;

  const addItem = (content: string, id: number) => {
    setFieldValues((oldVals: FieldsValuesInterface[]) => [
      ...oldVals,
      { id, content },
    ]);
  };

  const clearVals = () => {
    setFieldValues([]);
  };
  useEffect(() => {
    if (clearFields) clearVals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        width: "30%",
        height: "30%",
        backgroundColor: "whitesmoke",
        margin: 10,
        display: "grid",
        placeItems: "center",
      }}
      onClick={() => {
        if (fieldInfo.value !== "") throw new Error(fieldInfo.errorMessage);
        if (currentPlayer === 1) {
          setFieldInfo({ ...fieldInfo, value: "X" });
          setCurrentPlayer(2);
          addItem("X", id);
        } else {
          setFieldInfo({ ...fieldInfo, value: "O" });
          setCurrentPlayer(1);
          addItem("O", id);
        }
      }}
    >
      {fieldInfo.value}
    </div>
  );
};
