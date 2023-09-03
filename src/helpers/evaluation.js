import uuid from 'react-uuid';

export const element = {
  id: '',
  description: '',
  average: '',
  quantity: '',
  date: '',
};

export function getID() {
  return uuid();
}


export function initialForm(){
  return {
    id: uuid(),
    description: '',
    average: '',
    quantity: '',
    elements: [element],
  }
}