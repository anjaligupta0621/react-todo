const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

let todos = {
  "todos" : [
    {
      "id": "0ddf",
      "content": "hejbw1234"
    },
    {
      "id": "0922",
      "content": "wdw"
    },
    {
      "id": "ddc6",
      "content": "hfkhflaw"
    }
  ]
};

router.get('/', (req, res) => {
  // res.send({ message: "Todos sent!"})
  console.log(todos);
    // res.send("MESSAGE");
    res.json(todos);
    // console.log("Todos sent")
})

router.post('/', (req, res) => {
    const { content } = {...req.body}
    const newTodo = {
      id: uuidv4(), 
      content
    };
    console.log(newTodo);
    todos['todos'].push(newTodo);
    res.json(newTodo);
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const index = todos['todos'].find((item) => item.id === id);
    console.log(index)
    if (!index) {
        res.status(400).send({ message: "Post does not exist" });
        return;
      }
    todos['todos'] = todos['todos'].filter((todo) => todo.id !== id)
    res.json({id: id});
})

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { content } = {...req.body};
    const todo = todos['todos'].find((item) => item.id === id);
    if (!todo) {
        res.status(400).send({ message: "Post does not exist" });
        return;
      }
    if (todo) {
        todo.content = content;
        res.json({ id: id, content: content });
    }
})

// router.get('/user/:userId', authentication, (req, res) => {
//     const { userId } = req.params;
//     const user = req.user;
//     if (parseInt(userId) === parseInt(user.id)) {
//         res.status(401).send("wrong user");
//         return;
//     }
//     const usertodos = todos.filter((post) => parseInt(post.userId) === parseInt(user.id));
//     res.send(usertodos);
// })

// function authentication(req, res, next) {
//     const authHeader = req.headers["Authorization"];
//     const token = authHeader.split(' ')[1];

//     if (token === null) {
//         res.status(401).send("Authentication error");
//         return;
//     }
//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//         if (err) {
//             res.status(401).send("Authentication error");
//             return;
//         }
//         req.user = user;
//         next();
//     })
// }

module.exports = router;