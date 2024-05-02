const createGroupValidator = (req, res, next) => {
    try {
        const { name } = req.body;

        let errors = {}

        // check name
        if (!name) {
            errors.name = 'Name is required';
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
    createGroupValidator
}