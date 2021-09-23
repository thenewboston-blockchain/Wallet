import {useReducer} from 'react';

const toggler = (currentValue: boolean, newValue: boolean | undefined) => {
  return typeof newValue === 'boolean' ? newValue : !currentValue;
};

// toggle's param value is typed as any so that this can be passed as an onClick event handler
const useToggle = (initialValue: boolean): [state: boolean, toggle: (value?: any) => void] => {
  return useReducer(toggler, initialValue);
};

export default useToggle;
