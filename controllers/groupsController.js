const {call} = require("../helpers/mysql");
const getGroups = async (req, res) => {
    try {
        // call MySQL
        const groups = await call('SELECT * FROM groups');

        res.send({
            data: {
                items: groups.map(group => ({
                    id: group.id,
                    name: group.name
                }))
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

const createGroup = async (req, res) => {
    try {
        const { name } = req.body;

        // insert to MySQL
        const insert = await call('INSERT INTO groups (name) VALUES (?)', [name]);

        res.send({
            data: {
                id: insert.insertId,
                name
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

const addPoints = async (req, res) => {
    try {
        const { points } = req.body;

        // insert to MySQL
        for (const point of points) {
            await call('INSERT INTO group_points (group_id, point_id) VALUES (?, ?)', [req.params.id, point]);
        }

        res.status(201).send()
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

const addStaff = async (req, res) => {
    try {
        const { staff } = req.body;

        // insert to MySQL
        for (const staffs of staff) {
            await call('INSERT INTO group_staff (group_id, staff_id) VALUES (?, ?)', [req.params.id, staffs]);
        }

        res.status(201).send()
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
    getGroups,
    createGroup,
    addPoints,
    addStaff
}