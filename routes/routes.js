const router = require("express").Router();
const db = require("../models");

router.get("/list/:user", (req, res) => {
  db.ToDo.find({user: req.params.user})
  .then(todos => {
      console.log(todos);
      res.status(200).json(todos)
  })
});

router.post("/todo", (req, res) => {
    db.ToDo.create({user: req.body.todo.user, todo: req.body.todo.todo})
    .then(todo => {
        res.status(200).json(todo);
    }).catch(err => console.log(err))
})

router.delete("/todo/:id", (req,res) => {
    const id = req.params.id;
    db.ToDo.findByIdAndDelete({_id:id})
    .then(response => {
        res.status(200).json(response);
    })
})

module.exports = router;