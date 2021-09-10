import {useCallback, useState} from 'react';

const useToggle = (initialValue: boolean): [state: boolean, toggleState: (value?: any) => void] => {
  const [state, setState] = useState(initialValue);

  const toggleState = useCallback(
    (value?: boolean): void => {
      if (typeof value === 'boolean') {
        setState(value);
      } else {
        setState(!state);
      }
    },
    [state, setState],
  );

  return [state, toggleState];
};

export default useToggle;
