const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const UserRouter = require('./routes/user');
const OptionsRouter = require('./routes/options');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const url = process.env.URL;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
mongoose.connection.once('open', () => {
    console.log('MongoDB connected successfully!');
});

app.use('/users', UserRouter);
app.use('/options', OptionsRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});