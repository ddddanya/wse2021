const {call} = require("../helpers/mysql");
const authMiddleware = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).send({
                error: {
                    code: 401,
                    message: 'Unauthorized'
                }
            });
        }

        const token = authorization.replace('Bearer ', '');

        // call MySQL
        const user = await call('SELECT * FROM users WHERE api_token = ?', [token]);

        if (user.length === 0) {
            return res.status(401).send({
                error: {
                    code: 401,
                    message: 'Unauthorized'
                }
            });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).send({
            error: {
                code: 500,
                message: 'Internal server error'
            }
        });
    }
}

module.exports = {
    authMiddleware
}