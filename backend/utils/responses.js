const sendResponse = (message, res, statusCode = 200) => {
    if (statusCode >= 200 && statusCode <= 299) {
        console.log(`Result (${statusCode}) : ${message}`)
    }
    else {
        console.error(`Error (${statusCode}) : ${message}`)
    }
    return res.status(statusCode).json( {result : message} )
}

module.exports = { sendResponse }