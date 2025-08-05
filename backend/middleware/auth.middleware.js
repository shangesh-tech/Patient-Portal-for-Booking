const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log('Received token:', token);  // Log the token

  if (!token) return res.status(401).json({ msg: 'No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log('JWT Error:', err);  // Log the actual error if token is invalid
    res.status(401).json({ msg: 'Invalid token' });
  }
};


module.exports = authMiddleware;