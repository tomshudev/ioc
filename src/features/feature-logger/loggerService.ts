import { captureException, captureMessage } from '@sentry/react';
import { AxiosError } from 'axios';
import { ILoggerService } from './types';

const getRequestURI = (error: Error) => {
  const axiosError = error as AxiosError;

  let URI: string | undefined = undefined;
  if (axiosError.config) {
    URI = (axiosError.config.baseURL || '') + (axiosError.config.url || '');

    const apiPosition = URI.indexOf('/v1/');
    if (apiPosition !== -1) {
      URI = URI.substring(apiPosition + 1);
    }

    const queryParams = URI.indexOf('?');
    if (queryParams !== -1) {
      URI = URI.substring(0, queryParams);
    }
  }

  return URI;
};

export const loggerServiceFactory = (): ILoggerService => {
  return {
    logError: (e, scope) => {
      const uri = getRequestURI(e);

      captureException(e, {
        tags: {
          scope: (e as AxiosError)?.config?.scope_name || scope,
          uri,
        },
        contexts: {
          response: {
            'trace-id': (e as AxiosError).response?.headers['trace-id'],
          },
          ...(e as AxiosError)?.config?.custom_context,
        },
      });
    },
    logMessage: (m) => captureMessage(m),
  };
};
