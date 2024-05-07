const {call} = require("../helpers/mysql");
const {generateRandomString} = require("../utils/generateRandomString");
const login = async (req, res, next) => {
    try {
        const { login, password } = req.body;

        // call MySQL
        const user = await call('SELECT * FROM users WHERE login = ? AND password = ?', [login, password]);

        // check if user not found
        if (user.length === 0) {
            return res.status(401).send({
                error: {
                    code: 401,
                    message: 'Unauthorized',
                    errors: {
                        login: "invalid credentials"
                    }
                }
            });
        }

        // generate token
        const token = generateRandomString(32);
        await call('UPDATE users SET api_token = ? WHERE id = ?', [token, user[0].id]);

        res.send({
            data: {
                token,
                full_name: user[0].full_name,
            }
        });
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
    login
}