function verify(req, res) {
  res.status(200)
    .json({
      dados: {
        mensagem: 'ON'
      }
    });
}

export default {
  verify
};
