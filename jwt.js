const jwt = require('jsonwebtoken')

const jwtAuthMiddleware = (req, res, next) => {

    // First check request headers has authorization or not:
    const authorization = req.headers.authorization
    if (!authorization) return res.status(401).json({ error: 'Token Not FOund!' });

    // Extract the jwt token from request headers:
    const token = req.headers.authorization.split(' ')[1];
    if (!token)
        return res.status(401).json({ error: 'Unauthorized' });

    try {
        //Verify the jwt Token:
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({ error: 'Invalid Token:' })
    }
}

const generationToken = (userData) => {
    // Generate a new token using user data with expery time:
    return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: 15 });

}

module.exports = { jwtAuthMiddleware, generationToken }