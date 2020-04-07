const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const exphbs = require('express-handlebars');
const { db_url, PORT } = require('./config/configuration');
const defaultRoutes = require('./routes/defaultRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

/* Configure Mongoose to connect white MongoDB */
mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(response => {
        console.log('Database has been connected successfully.');
    }).catch(error => {
        console.log('Database connection failed.', error);
    });

/* Configure express */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

/* Template Engine */
app.engine('handlebars', exphbs({ defaultLayout: 'default' }));
app.set('view engine', 'handlebars');

/* Routes */
app.use('/', defaultRoutes);
app.use('/admin', adminRoutes);



app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}.`)
});