const sendResponse = (res, status = 200, success = true, data = null, message = "") => {
  return res.status(status).json({ success, data, message });
};

export default sendResponse;