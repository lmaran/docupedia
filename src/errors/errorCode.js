import { HttpCode } from "./httpCode.js";

export const ErrorCode = {
    // Authentication specific

    // Authorization specific

    // Business rules

    // Not found specific
    USER_NOT_FOUND: "Utilizator negăsit",

    // Rate limiting

    // Server errors

    // Timeout specific

    // File/Upload specific

    // Business specific

    // Gone/Deprecated
};

// Doar ca exemplu
export const ErrorCode2 = {
    // Authentication specific
    INVALID_TOKEN: HttpCode.UNAUTHORIZED,
    EXPIRED_TOKEN: HttpCode.UNAUTHORIZED,
    MISSING_TOKEN: HttpCode.UNAUTHORIZED,
    INVALID_CREDENTIALS: HttpCode.UNAUTHORIZED,
    ACCOUNT_LOCKED: HttpCode.FORBIDDEN,
    ACCOUNT_DISABLED: HttpCode.FORBIDDEN,
    EMAIL_NOT_VERIFIED: HttpCode.FORBIDDEN,

    // Authorization specific
    INSUFFICIENT_PERMISSIONS: HttpCode.FORBIDDEN,
    ROLE_REQUIRED: HttpCode.FORBIDDEN,
    RESOURCE_FORBIDDEN: HttpCode.FORBIDDEN,
    ADMIN_REQUIRED: HttpCode.FORBIDDEN,

    // Validation specific
    INVALID_INPUT: HttpCode.BAD_REQUEST,
    REQUIRED_FIELD_MISSING: HttpCode.BAD_REQUEST,
    INVALID_FORMAT: HttpCode.BAD_REQUEST,
    INVALID_EMAIL: HttpCode.BAD_REQUEST,
    INVALID_PHONE: HttpCode.BAD_REQUEST,
    PASSWORD_TOO_SHORT: HttpCode.BAD_REQUEST,
    INVALID_DATE: HttpCode.BAD_REQUEST,
    INVALID_ENUM_VALUE: HttpCode.BAD_REQUEST,

    // Business rules
    DUPLICATE_ENTRY: HttpCode.CONFLICT,
    RESOURCE_IN_USE: HttpCode.CONFLICT,
    INVALID_STATE_TRANSITION: HttpCode.CONFLICT,
    CONCURRENT_MODIFICATION: HttpCode.CONFLICT,
    DUPLICATE_EMAIL: HttpCode.CONFLICT,
    DUPLICATE_USERNAME: HttpCode.CONFLICT,

    // Not found specific
    USER_NOT_FOUND: HttpCode.NOT_FOUND,
    RESOURCE_NOT_FOUND: HttpCode.NOT_FOUND,
    ENDPOINT_NOT_FOUND: HttpCode.NOT_FOUND,
    PAGE_NOT_FOUND: HttpCode.NOT_FOUND,

    // Rate limiting
    RATE_LIMIT_EXCEEDED: HttpCode.TOO_MANY_REQUESTS,
    QUOTA_EXCEEDED: HttpCode.TOO_MANY_REQUESTS,
    DAILY_LIMIT_EXCEEDED: HttpCode.TOO_MANY_REQUESTS,

    // Server errors
    DATABASE_CONNECTION_FAILED: HttpCode.INTERNAL_SERVER_ERROR,
    EXTERNAL_SERVICE_ERROR: HttpCode.BAD_GATEWAY,
    CONFIGURATION_ERROR: HttpCode.INTERNAL_SERVER_ERROR,
    UNEXPECTED_ERROR: HttpCode.INTERNAL_SERVER_ERROR,

    // Timeout specific
    REQUEST_TIMEOUT: HttpCode.REQUEST_TIMEOUT,
    GATEWAY_TIMEOUT: HttpCode.GATEWAY_TIMEOUT,
    DATABASE_TIMEOUT: HttpCode.GATEWAY_TIMEOUT,
    EXTERNAL_API_TIMEOUT: HttpCode.GATEWAY_TIMEOUT,

    // File/Upload specific
    FILE_TOO_LARGE: HttpCode.PAYLOAD_TOO_LARGE,
    INVALID_FILE_TYPE: HttpCode.UNSUPPORTED_MEDIA_TYPE,
    MALFORMED_FILE: HttpCode.BAD_REQUEST,
    VIRUS_DETECTED: HttpCode.BAD_REQUEST,

    // Business specific
    INSUFFICIENT_FUNDS: HttpCode.UNPROCESSABLE_ENTITY,
    ACCOUNT_SUSPENDED: HttpCode.FORBIDDEN,
    SUBSCRIPTION_EXPIRED: HttpCode.FORBIDDEN,
    FEATURE_NOT_AVAILABLE: HttpCode.FORBIDDEN,
    MAINTENANCE_MODE: HttpCode.SERVICE_UNAVAILABLE,

    // Gone/Deprecated
    RESOURCE_DELETED: HttpCode.GONE,
    ENDPOINT_DEPRECATED: HttpCode.GONE,
    VERSION_NOT_SUPPORTED: HttpCode.GONE,
};
