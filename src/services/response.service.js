
const buildSuccess = (_message, _data) => {
    return {
      status: 'success',
      data: _data,
      message: _message,
    }
  }

  const buildFailure = (_message, _data) => {
    return {
      status: 'failure',
      data: _data,
      message: _message,
    }
  }

  const sendResponse = (
    _response,
    _responseData,
    _options
  ) => {
    let overrideHttpCode = (_options && _options['overrideHttpCode']) || false

    if (overrideHttpCode === false) {
      if (_responseData?.status === 'success') {
        overrideHttpCode = 200
      } else {
        overrideHttpCode = 500
      }
    }

    return _response.status(overrideHttpCode).json(_responseData)
  }


module.exports = {
    buildSuccess,
    buildFailure,
    sendResponse,
};