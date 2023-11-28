// src/app.ts
import express from 'express';
import routes from './routes';
import sequelize from './sequelize';
import cors from 'cors';

const app = express();

app.use(cors())

app.use(express.json());


app.use('/api', routes); 

sequelize.sync();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
