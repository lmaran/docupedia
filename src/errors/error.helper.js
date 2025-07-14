// Serializează un obiect de tip Error într-un plain object
// Alternativă: https://github.com/sindresorhus/serialize-error
export const serializeError = (error) => {
    if (!error || typeof error !== "object") return { message: String(error) };

    const serialized = {
        // name: error.name,
        message: error.message,
        // stack: error.stack,
        ...(error.stack && { stack: error.stack }),
        //...(error.code && { code: error.code }), // optional custom field
        //...(error.status && { status: error.status }), // optional HTTP status
        ...Object.fromEntries(Object.entries(error).filter(([key]) => !["name", "message", "stack", "code", "status"].includes(key))),
    };

    return serialized;
};
