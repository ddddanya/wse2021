const {call} = require("../helpers/mysql");
const createControlPoint = async (req, res) => {
    try {
        const { name, parent } = req.body;

        // call MySQL
        const insert = await call('INSERT INTO points (name, parent) VALUES (?, ?)', [name, parent]);

        res.status(201).send({
            data: {
                id: insert.insertId,
                name,
                parent: parent || null
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

const getPoints = async (req, res) => {
    try {
        // call MySQL
        const points = await call('SELECT * FROM points');

        // return points. there can be parent in the points and parent in the parent points and so on
        const getPoints2 = (points, parent = null) => {
            return points
                .filter(point => point.parent === parent)
                .map(point => {
                    const children = getPoints2(points, point.id);
                    return {
                        id: point.id,
                        name: point.name,
                        points: children.length > 0 ? children : []
                    }
                });
        }

        res.send({
            data: {
                items: getPoints2(points)
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
    createControlPoint,
    getPoints
}