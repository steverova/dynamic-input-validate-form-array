import uuid from "react-uuid";

export const element = {
    id: uuid(),
    description: '',
    average: '',
    quantity: '',
    date: '',
  };

export const initialFormFields = [
    {
      id: uuid(),
      description: '',
      average: '',
      quantity: '',
      elements: [element],
    },
  ];