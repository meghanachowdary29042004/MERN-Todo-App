import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';  // Import fileURLToPath from 'url'
dotenv.config();
import routes from './routes.js';
import { connectToDatabase } from './database.js';

// Use import.meta.url to get the current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);  // Get the directory from the filename

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));  // Serving static files from 'dist' folder
app.use('/api', routes);

// Fallback route for SPA (Single Page Application) routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));  // Serving 'index.html' from 'dist' folder
});

const port = process.env.PORT || 4000;

async function startServer() {
    await connectToDatabase();
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

startServer();
