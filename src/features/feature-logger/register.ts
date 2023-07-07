import iocContainer from 'features/feature-ioc/inversifyContainer';
import { loggerServiceFactory } from './loggerService';
import { LoggerServiceSymbol } from './types';

export const register = () => {
  iocContainer.register(LoggerServiceSymbol, loggerServiceFactory);
};
