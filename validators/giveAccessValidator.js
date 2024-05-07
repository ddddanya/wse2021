const giveAccessValidator = (req, res, next) => {
    try {
        const { point_id, time } = req.body;

        let errors = {}

        // check
        if (!point_id) {
            errors.point_id = 'point_id is required';
        }
        if (!time) {
            errors.time = 'time is required';
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
    giveAccessValidator
}