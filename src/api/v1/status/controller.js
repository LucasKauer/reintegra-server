function verify(req, res) {
  res.status(200)
    .json({
      dados: {
        status: true,
      },
    });
}

export default {
  verify,
};
