const {call} = require("../helpers/mysql");

const viewAllLogs = async (req, res) => {
    try {
        const { type, id } = req.query;

        // call MySQL
        const logs = await call('SELECT * FROM logs');

        let response = []

        // get staff and point
        for (let i = 0; i < logs.length; i++) {
            const log = logs[i];
            const [staff] = await call('SELECT * FROM staff WHERE id = ?', [log.staff_id]);
            const [point] = await call('SELECT * FROM points WHERE id = ?', [log.point_id]);

            // push to response
            response.push({
                staff: {
                    id: staff.id,
                    full_name: staff.full_name,
                    photo: encodeURI("http://localhost:3000/uploads/" + staff.photo),
                    camera: log.camera
                },
                point: {
                    id: point.id,
                    name: point.name
                },
                access: log.access == 1 ? true : false,
                timestamp: log.created_at
            });
        }

        if (type && id) {
            response = response.filter(item => item[type].id == id)
        }

        res.send({
            data: {
                items: response
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
    viewAllLogs
}