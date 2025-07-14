export const successHandler = (res, code, message, data, count) => {
    return res.status(code).json({
        status: true,
        message: message,
        data: data || null,
        count: count || null
    });
}

export const errorHandler = (res, code, message, error) => {
    return res.status(code).json({
        status: false,
        message: message,
        error: error || "some wrong"
    });
}