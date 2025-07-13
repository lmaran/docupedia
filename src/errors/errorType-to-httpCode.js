import { ErrorTypes } from "./errorTypes.js";
import { HttpCode } from "./httpCode.js";

export const ERROR_TYPE_TO_HTTP_STATUS = {
    // 4xx Client Errors
    [ErrorTypes.VALIDATION_ERROR]: HttpCode.BAD_REQUEST, // 400
    [ErrorTypes.AUTHENTICATION_ERROR]: HttpCode.UNAUTHORIZED, // 401
    [ErrorTypes.AUTHORIZATION_ERROR]: HttpCode.FORBIDDEN, // 403
    [ErrorTypes.NOT_FOUND_ERROR]: HttpCode.NOT_FOUND, // 404
    [ErrorTypes.METHOD_NOT_ALLOWED_ERROR]: HttpCode.METHOD_NOT_ALLOWED, // 405
    [ErrorTypes.CONFLICT_ERROR]: HttpCode.CONFLICT, // 409
    [ErrorTypes.GONE_ERROR]: HttpCode.GONE, // 410
    [ErrorTypes.PAYLOAD_TOO_LARGE_ERROR]: HttpCode.PAYLOAD_TOO_LARGE, // 413
    [ErrorTypes.UNSUPPORTED_MEDIA_ERROR]: HttpCode.UNSUPPORTED_MEDIA_TYPE, // 415
    [ErrorTypes.BUSINESS_ERROR]: HttpCode.UNPROCESSABLE_ENTITY, // 422
    [ErrorTypes.RATE_LIMIT_ERROR]: HttpCode.TOO_MANY_REQUESTS, // 429

    // 5xx Server Errors
    [ErrorTypes.SERVER_ERROR]: HttpCode.INTERNAL_SERVER_ERROR, // 500
    [ErrorTypes.DATABASE_ERROR]: HttpCode.INTERNAL_SERVER_ERROR, // 500
    [ErrorTypes.FILE_SYSTEM_ERROR]: HttpCode.INTERNAL_SERVER_ERROR, // 500
    [ErrorTypes.EXTERNAL_API_ERROR]: HttpCode.BAD_GATEWAY, // 502
    [ErrorTypes.CONNECTION_ERROR]: HttpCode.BAD_GATEWAY, // 502
    [ErrorTypes.NETWORK_ERROR]: HttpCode.BAD_GATEWAY, // 502
    [ErrorTypes.TIMEOUT_ERROR]: HttpCode.GATEWAY_TIMEOUT, // 504
};
