import { registerAllServices } from 'features/tools';
import { useCallback, useEffect, useState } from 'react';
import iocContainer from './inversifyContainer';

export const useDependency = <T>(dep: string) => {
  const [resolved, setResolved] = useState(
    iocContainer.get<T>(dep) || ({} as T)
  );

  const reregister = useCallback(() => {
    const newDep = iocContainer.get<T>(dep);

    if (newDep) {
      setResolved(newDep);
    }
  }, [dep, setResolved]);

  useEffect(() => {
    iocContainer.onRegister(dep, reregister);
  }, [dep, reregister]);

  return resolved;
};

export const useIOC = () => {
  const [isIOCReady, setIOCReady] = useState(false);

  useEffect(() => {
    const register = async () => {
      await registerAllServices();
      iocContainer.notifyRegistrars();
      setIOCReady(true);
    };

    register();

    return () => {
      iocContainer.removeAll();
    };
  }, [setIOCReady]);

  return isIOCReady;
};
