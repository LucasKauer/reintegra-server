import authService from '../services/authentication';

export default function authenticated(req, res, next) {
  const token = req.get('authorization');

  authService.verifyToken(token)
    .then((decodedToken) => {
      req.user = decodedToken;
      next();
    })
    .catch(next);
}
