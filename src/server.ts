import app from './app';
import { connectDB } from './config/db';

const PORT = process.env.PORT || 4000;
const start = async () => {
await connectDB();
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
};

start();