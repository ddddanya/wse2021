const createStaffValidator = (req, res, next) => {
    const { full_name } = req.body;

    let errors = {}

    // check full_name
    if (!full_name) {
        errors.full_name = 'Full name is required';
    }

    // check photo
    if (!req.files || !req.files.photo) {
        errors.photo = 'Photo is required';
    }

    // check file extension
    if (req.files.photo) {
        const allowedExtensions = ['jpg'];
        const extension = req.files.photo.name.split('.').pop();

        if (!allowedExtensions.includes(extension)) {
            errors.photo = 'Invalid file extension';
        }
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
    createStaffValidator
}