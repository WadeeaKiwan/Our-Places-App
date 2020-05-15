import { useCallback, useReducer } from "react";

type FormReducerState = {
  inputs: {
    [x: string]: { value: string; isValid: boolean };
  };
  isValid: boolean;
};

type FormReducerAction = {
  type: string;
  inputId: string;
  isValid: boolean;
  value: string;
};

const formReducer = (state: FormReducerState, action: FormReducerAction) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid }
        },
        isValid: formIsValid
      };
    default:
      return state;
  }
};

export const useForm = (
  initialInputs: FormReducerState["inputs"],
  initialFormValidity: FormReducerState["isValid"]
): [FormReducerState, (id: string, value: string, isValid: boolean) => void] => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity
  });

  const inputHandler = useCallback((id: string, value: string, isValid: boolean) => {
    dispatch({
      type: "INPUT_CHANGE",
      value,
      isValid,
      inputId: id
    });
  }, []);

  return [formState, inputHandler];
};
