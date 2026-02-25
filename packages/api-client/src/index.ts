// Core
export { createRequestClient } from "./request";
export { RequestClient } from "./modules/request-client";
export { InterceptorManager } from "./modules/interceptor";

// Types
export type {
  RequestClientOptions,
  RequestClientConfig,
  RequestResponse,
  ResponseInterceptorConfig,
  RequestInterceptorConfig,
  HttpResponse,
  MakeErrorMessageFn,
  RequestContentType,
} from "./modules/types";

// Errors
export {
  CriticalError,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
  ErrorCode,
  DefaultErrorMessage,
} from "./error";
export type { CustomError, ErrorParams } from "./error";

// Interceptors
export {
  defaultResponseInterceptor,
  authenticateResponseInterceptor,
} from "./preset-interceptor";
