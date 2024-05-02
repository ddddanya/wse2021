const addStaffValidator = (req, res, next) => {
    try {
        const { staff } = req.body;

        let errors = {}

        // check points
        if (!staff) {
            errors.staff = 'Staff is required';
        }

        if (staff && !Array.isArray(staff)) {
            errors.staff = 'Staff must be an array';
        }

        if (staff && Array.isArray(staff) && staff.length === 0) {
            errors.staff = 'Staff must not be empty';
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
    addStaffValidator
}