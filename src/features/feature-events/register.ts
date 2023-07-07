import iocContainer from 'features/feature-ioc/inversifyContainer';
import { eventsServiceFactory } from './eventsService';
import { EventsServiceSymbol } from './types';

export const register = () => {
  iocContainer.register(EventsServiceSymbol, eventsServiceFactory);
};
