const jwt = require('jsonwebtoken')
const User = require('../models/userModel')


const requireAuth = async (req, res, next) => {

  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'})
  }

  const token = authorization.split(' ')[1]
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    console.log('_id:', _id); // Add this line for debugging
    req.user = await User.findOne({ _id }).select('_id');
    console.log('req.user:', req.user); // Add this line for debugging
    next();
} catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Request is not authorized' });
}
}

module.exports = requireAuth