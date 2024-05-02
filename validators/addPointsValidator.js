const addPointsValidator = (req, res, next) => {
    try {
        const { points } = req.body;

        let errors = {}

        // check points
        if (!points) {
            errors.points = 'Points is required';
        }

        if (points && !Array.isArray(points)) {
            errors.points = 'Points must be an array';
        }

        if (points && Array.isArray(points) && points.length === 0) {
            errors.points = 'Points must not be empty';
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
    addPointsValidator
}