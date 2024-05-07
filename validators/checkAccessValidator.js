const checkAccessValidator = (req, res, next) => {
    try {
        const { staff, point } = req.body;

        let errors = {}

        // check name
        if (!staff) {
            errors.staff = 'staff is required';
        }
        if (!point) {
            errors.point = 'point is required';
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
    checkAccessValidator
}