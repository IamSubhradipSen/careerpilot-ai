const sendResponse = (res, statusCode, payload) => {
    return res.status(statusCode).json(payload);
};
export default sendResponse;
