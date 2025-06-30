
function errorHandler(err, req, res, next) {
  console.error(`[${new Date().toISOString()}]`, err.stack);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
}

module.exports = { errorHandler }