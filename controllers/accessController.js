const {call} = require("../helpers/mysql");
const checkAccess = async (req, res, next) => {
    try {
        // request
        const { staff, point } = req.body;

        // parent points
        const getPointHierarchy = async (id) => {
            const points = [];
            let currentPoint = id;
            while (currentPoint !== null) {
                const [point] = await call('SELECT * FROM points WHERE id = ?', [currentPoint]);
                points.push(point.id);
                currentPoint = point.parent;
            }
            return points;
        };

        const pointHierarchy = await getPointHierarchy(point);

        // get user
        const [user] = await call('SELECT * FROM staff WHERE code = ?', [staff]);

        if (!user) {
            return res.status(404).send({ error: 'Staff member not found' });
        }

        // get allowed points
        const accessiblePointsQuery = `
            SELECT gp.point_id FROM group_staff gs
            JOIN group_points gp ON gs.group_id = gp.group_id
            WHERE gs.staff_id = ?
        `;
        const accessiblePoints = await call(accessiblePointsQuery, [user.id]);

        const allowedPoints = accessiblePoints.map(p => p.point_id);

        // find in hierarchy
        const hasAccess = pointHierarchy.some(p => allowedPoints.includes(p));

        if (!hasAccess) {
            // Logs
            await call('INSERT INTO logs (staff_id, point_id, access) VALUES (?, ?, ?)', [user.id, point, 0]);
            return res.json({
                data: {
                    access: false,
                    photo: user.photo
                }
            })
        }

        // Logs
        await call('INSERT INTO logs (staff_id, point_id, access) VALUES (?, ?, ?)', [user.id, point, 1]);

        res.send({
            data: {
                access: true,
                photo: user.photo
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            error: 'Internal server error'
        });
    }
};


module.exports = {
    checkAccess
}