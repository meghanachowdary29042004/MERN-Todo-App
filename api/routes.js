import express from 'express';
const router = express.Router();
import { getDatabase } from './database.js';
import { ObjectId } from 'mongodb'; // Import ObjectId for MongoDB operations

const getcollection = async () => {
    const client = await getDatabase();
    const collection = client.db('mern').collection('todo');
    return collection;
}

// GET /todo DISPLAY all todos
router.get('/todo', async (req, res) => {
    try {
        const collection = await getcollection();  // Await the collection
        const todos = await collection.find({}).toArray();  // Fetch all todos
        res.status(200).json(todos);  // Return todos in the response
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
});

// POST /todo CREATE a new todo
router.post('/todo', async (req, res) => {
    try {
        const collection = await getcollection();  // Await the collection
        const { todo } = req.body;  // Get todo from the request body
        const newTodo = await collection.insertOne({ todo, status: false });  // Insert new todo
        res.status(201).json({ todo, status: false, _id: newTodo.insertedId });  // Return new todo with insertedId
    } catch (error) {
        res.status(500).json({ error: 'Failed to create todo' });
    }
});

// DELETE /todo/:id DELETE a todo by ID
router.delete('/todo/:id', async (req, res) => {
    try {
        const collection = await getcollection();  // Await the collection
        const { id } = req.params;  // Get id from request params
        const result = await collection.deleteOne({ _id: new ObjectId(id) });  // Delete the todo by id
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.status(200).json({ mssg: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete todo' });
    }
});

// PUT /todo/:id UPDATE a todo by ID
router.put('/todo/:id', async (req, res) => {
    try {
        const collection = await getcollection();  // Await the collection
        const { id } = req.params;  // Get id from request params
        const { todo, status } = req.body;  // Get updated data from request body
        const result = await collection.updateOne(
            { _id: new ObjectId(id) },  // Match by ObjectId
            { $set: { todo, status } }  // Update the todo and status fields
        );
        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.status(200).json({ mssg: 'Todo updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update todo' });
    }
});

export default router;
