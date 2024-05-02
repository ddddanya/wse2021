const loginValidator = (req, res, next) => {
    const { login, password } = req.body;

    let errors = {}

    // check login
    if (!login) {
        errors.login = 'Login is required';
    }
    // check password
    if (!password) {
        errors.password = 'Password is required';
    }

    // if there are errors, return 422 status code with errors
    if (Object.keys(errors).length > 0) {
        return res.status(422).send({
            error: {
                code: 422,
                message: 'Validation error',
                errors
            }
        });
    }

    next();
}

module.exports = {
    loginValidator
}