import {
  LoggerServiceSymbol,
  ILoggerService,
} from "features/feature-logger/types";
import { withServiceDependencies } from "features/feature-ioc/inversifyContainer";
import { IEventsService } from "./types";

const eventsService = ([loggerService]: [ILoggerService]): IEventsService => {
  return {
    fetchEvents: () => {
      loggerService.logMessage("logging from events");

      return {
        events: [],
        hasNext: true,
        offset: 0,
      };
    },
  };
};

export const eventsServiceFactory = withServiceDependencies(eventsService, [
  LoggerServiceSymbol,
]);
