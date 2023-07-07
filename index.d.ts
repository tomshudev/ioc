/// <reference types="react-scripts" />
declare module "*.png";
declare module "*.svg";

import {
  AxiosRequestConfig as OriginalAxiosRequestConfig,
  AxiosStatic,
} from "axios";

declare module "axios" {
  export interface AxiosRequestConfig<D = any>
    extends OriginalAxiosRequestConfig {
    getRelevantErrorDetails?: (
      error: AxiosError
    ) => { name: string; message: string | undefined } | undefined;
    custom_context?: { [key: string]: { [key: string]: string } };
    error_name?: string;
    catch_error?: boolean;
    scope_name?: string;
  }
}
