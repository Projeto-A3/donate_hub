import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const port = process.env.API_PORT || 3333;

app.listen(port, () => console.log(`Server started! http://localhost:${port}`));
