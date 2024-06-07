const router = require('express').Router();
const jwt = require('jsonwebtoken');

const users = [
];

let id = 1;

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const newUser = {
        id,
        username,
        password
    };
    id += 1;
    users.push(newUser);
    res.json(newUser);
});

router.post("/login", (req, res) => {
    const { username, password } = req.body
    const user = users.find((user) => user.username === username);
    if (!user) {
        res.status(401).send("Wrong username or password");
        return;
    }
    if (user.password !== password) {
        res.status(401).send("Wrong username or password");
        return;
    }

    console.log(process.env.JWT_SECRET)
    const accessToken = jwt.sign({
        id: user.id,
        username: user.username
    }, process.env.JWT_SECRET
)
    res.send({accessToken});
})

module.exports = router;