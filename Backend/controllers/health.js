exports.healthCheck = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Server is awake",
    timestamp: Date.now(),
  });
};
