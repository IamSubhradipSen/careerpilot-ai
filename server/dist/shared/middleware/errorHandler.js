const errorHandler = (err, _req, res, _next) => {
    res.status(500).json({
        success: false,
        message: err.message,
    });
};
export default errorHandler;
