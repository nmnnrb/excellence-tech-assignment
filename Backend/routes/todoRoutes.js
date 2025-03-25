const express = require('express');
const Todo = require('../models/Todo');
const auth = require('../middleware/auth');

const router = express.Router();



router.post("/", auth, async (req, res) => {
    const { title, description, category } = req.body;

    if (!title || typeof title !== "string") {
        return res.status(400).json({ error: "Title is required" });
    }

    try {
        const newTodo = new Todo({ 
            title, 
            description, 
            category, 
            userId: req.user.id // Ensure the userId is associated with the authenticated user
        });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ error: "Failed to create todo" });
    }
});


router.get('/', auth, async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.user.id });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.json({ message: 'Todo deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.json(todo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;