import { useEffect, useRef } from 'react';

const useDidUpdateEffect = (func: () => void, dep: unknown[]): void => {
  const didUpdate = useRef(false);

  useEffect(() => {
    if (didUpdate.current) {
      func();
    } else {
      didUpdate.current = true;
    }
  }, dep);
};

export default useDidUpdateEffect;
