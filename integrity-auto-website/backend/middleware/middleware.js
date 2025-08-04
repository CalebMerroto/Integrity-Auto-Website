
function errorHandler(err, req, res, next) {
  console.error(`[${new Date().toISOString()}]`, err.stack);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
}
function getToday(req, res, next) {
  const now = new Date();
  req.today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  next();
}
module.exports = { errorHandler, getToday }