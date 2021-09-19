import {useCallback, useState} from 'react';

const useToggle = (initialValue: boolean): [state: boolean, toggleState: () => void, setState: (e: any) => void] => {
  const [state, setState] = useState(initialValue);

  const toggleState = useCallback((): void => {
    setState(!state);
  }, [state, setState]);

  return [state, toggleState, setState];
};

export default useToggle;
