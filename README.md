# React IOC

This repostiory adds the functionality to use IOC as part of a React application
It gives a general idea of what I think is the best way to use IOC and React together

The idea is pretty simple, there is one hook called `useIOC` once this hook is called, there is a code running that registers all the services defined in `services.json`

The entire solution is working with hot module reloading, even when adding new services, if you'll use the generator, all you need is to enter the name of your service, and that's it your service will be available for use in your react code

This repository also adds some functionality to custom `axios` configuration to show an example of a service

## useIOC

When you create a new feature/service you must have a file named `register.ts`, this file should expose a `register` function, this function basically adds the implementation of the service and bind it to you relevant symbol
The services are defined in a JSON, therefore the services are dynamically loaded, which means we don't know which register functions will be needed, so only when the hook is used we are importing each `register` file in its turn and registering the service
This is an asynchronous function, once the registaration is done we can set a state to note that the IOC is ready, during this time the user can use the indication to show a loader
You should use this hook at your top component, which suppose to be `App.tsx` or something similar

## useDependency

The basic and most used hook, this hook will give you the instance of the relevant service, it accepts one parameter - the symbol, it should be use as something like that:

```
import { useDependency } from 'features/feature-ioc/hooks';
import {
  ILoggerService,
  LoggerServiceSymbol,
} from 'features/feature-logger/types';

export const useLogger = () => {
  const logger = useDependency<ILoggerService>(LoggerServiceSymbol);
  return logger;
};
```

## Using services in services

In a lot of cases you will need to use other services within your service, therefore I decided to use factories as a way to inject the relevant implementation into your services
_Please make sure that if the service is dependant on another service it comes after it in the array inside `services.json`_

In our case, please make sure logger is defined in the array before events

This is an example of how to use services in your service:

```
import { withServiceDependencies } from 'features/feature-ioc/inversifyContainer';
import {
  LoggerServiceSymbol,
  ILoggerService,
} from 'features/feature-logger/types';
import { IEventsService } from './types';

// The array here is the resolved dependencies, it's the same order as the passed symbols in the next part
const eventsService = ([loggerService]: [ILoggerService]): IEventsService => {
  return {
    ADD YOUR IMPLEMENTATION HERE
  };
};

// `withServiceDependencies` is an high order function that accepts the factory and a list of dependencies, it then
// looks for the symbols required and passes the resolved services into the factory
// The array here should match the array in the factory, this array should accept the symbols you need in order
export const eventsServiceFactory = withServiceDependencies(eventsService, [
  LoggerServiceSymbol,
]);
```

## Generating a new feature

This repository also comes with a predefined script that by running it create the relevant folders with populated names according to the given name and type
The generator also updates the `services.json`, so basically you can just use the script, and while your application is using `useIOC`, you will always have access to your new services, even without restarting the server or refreshing the application
You should use the script defined in `package.json`, and then you can use: `yarn generate-feature`
This will make everything work as needed
