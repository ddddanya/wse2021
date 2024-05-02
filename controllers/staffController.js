const {call} = require("../helpers/mysql");
const {generateRandomNumber} = require("../utils/generateRandomNumber");
const {urlencoded} = require("express");

const getStaff = async (req, res) => {
    try {
        // call MySQL
        const staff = await call('SELECT * FROM staff');

        res.send({
            data: staff.map(item => ({
                id: item.id,
                full_name: item.full_name,
                code: item.code,
                photo: encodeURI("http://localhost:3000/uploads/" + item.photo),
            }))
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

const createStaff = async (req, res) => {
    try {
        const { full_name } = req.body;
        const photo = req.files.photo

        // move photo to public/uploads
        photo.mv('public/uploads/' + photo.name);

        // generate code
        const code = generateRandomNumber(32).toUpperCase()

        // insert to MySQL
        const insert = await call('INSERT INTO staff (full_name, code, photo) VALUES (?, ?, ?)', [full_name, code, photo.name]);

        res.send({
            data: {
                id: insert.insertId,
                full_name,
                code
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
    getStaff,
    createStaff
}