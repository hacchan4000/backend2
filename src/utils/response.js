
const response = (res, code, pesan, data) => {
  return res.status(code).json({
    code: code,
    status: code < 400 ? 'success' : 'failed',
    message:pesan,
    data,
  }).end()
}

export default response