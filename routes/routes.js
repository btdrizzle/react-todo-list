const router = require("express").Router();
const db = require("../models");

router.get("/list", (req, res) => {
  db.ToDo.where({user: req.body.user})
  .then(todos => {
      res.status(200).json(todos)
  })
});

router.post("/todo", (req, res) => {
    const info = {user: req.body.user, todo: req.body.todo}
    db.ToDo.create(info)
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