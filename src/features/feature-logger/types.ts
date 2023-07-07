export interface ILoggerService {
  logError: (e: Error, scope?: string) => void;
  logMessage: (message: string) => void;
}

export const LoggerServiceSymbol = 'LoggerServiceSymbol';
