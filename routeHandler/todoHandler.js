const express = require("express");
const router = express.Router();
const todoSchema = require("../schemas/todoSchemas");
const mongoose = require('mongoose');

const Todo = mongoose.model("Todo", todoSchema);

//get active todos
router.get('/active', async (req, res) => {
  try {
    const todo = new Todo();
    const data = await todo.findActive();

    res.status(200).json({
      data,
    });

    
  } catch (error) {
    
  }
  
});

//get active todos
router.get('/js', async (req, res) => {
  try {
    const data = await Todo.findByJs();
    res.status(200).json({
      data,
    });

    
  } catch (error) {
    
  }
  
});


// Get all the todos
router.get('/', async (req, res) => {
  try {
    // Retrieve all todos from the database
    const todos = await Todo.find({status: 'active'}).select({
        _id:0,
        __v:0,
        date: 0
    });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: "There was a server side error" });
  }
});

// Get todo by id
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: "There was a server side error" });
  }
});

// Post todo
router.post('/', async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.status(201).json({ message: "Todo was inserted successfully" });
  } catch (error) {
    res.status(500).json({ error: "There was a server side error" });
  }
});

// Post multiple todos
router.post('/all', async (req, res) => {
  // Implement logic for posting multiple todos
  try{
    await Todo.insertMany(req.body);
    res.status(201).json({ message: "Todo was inserted successfully" });


  }catch (error) {
    res.status(500).json({ error: "There was a server side error" });
  }
  
});

// Update todo
router.put('/:id', async (req, res) => {
  // Implement logic for updating a todo
  try {
    await Todo.updateOne({_id: req.params.id},{
        $set:{
            status:'inactive',
        }
    })
    res.status(201).json({ message: "Todo was updated successfully" });

    
  } catch (error) {
    res.status(500).json({ error: "There was a server side error" });

    
  }
});

// Delete todo
router.delete('/:id', async (req, res) => {
  // Implement logic for deleting a todo
  try {
    await Todo.deleteOne({_id: req.params.id}
    )
    res.status(201).json({ message: "Todo was deleted successfully" });

    
  } catch (error) {
    res.status(500).json({ error: "There was a server side error" });

    
  }
});

module.exports = router;
