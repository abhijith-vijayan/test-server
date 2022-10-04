const express = require("express");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 3001;

function getRandomString() {
    return (Math.random() + 1).toString(36).substr(2, 9);
}

function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.get("/api/test", async (req, res) => {
    try {
        const {data: response} = await axios.get("https://jsonplaceholder.typicode.com/photos");

        const defaultFields = Object.keys(response[0]);

        let fields = Array.from({length: 40}, getRandomString);

        let data = [];

        for (let index = 0; index < 1000; index +=1) {
            const field = fields.reduce((prev, curr) => {
                // const randomItem = randomInRange(0, defaultFields.length - 1);
                // const randomField = defaultFields[randomItem];

                prev[curr] = getRandomString();

                return prev;
            }, {})

            data.push(field);
        }

        res.status(200).json(data)
    } catch(err) {
        console.log(err)
        res.sendStatus(500);
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

