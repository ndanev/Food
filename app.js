const { globalVariables } = require('./config/configuration');

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const { db_url, PORT } = require('./config/configuration');
const flash = require('connect-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const { selectOption } = require('./config/customFunctions');
const fileUpload = require('express-fileupload');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { registerHelper } = require('./config/customFunctions');


const app = express();

handlebars.registerHelper('dateFormat', require('handlebars-dateformat'));

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

/* Flash and Session */
app.use(session({
    secret: 'anysecret',
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

/* Passport initialize */
app.use(passport.initialize());
app.use(passport.session());

/* Global variables */
app.use(globalVariables);

/* File upload middleware */
app.use(fileUpload());

/* Template Engine */
app.engine('handlebars', exphbs({ defaultLayout: 'default', helpers: { select: selectOption, trimString: registerHelper } }));
app.set('view engine', 'handlebars');

// override with POST having ?_method=DELETE
app.use(methodOverride('newMethod'));

/* Routes */
const defaultRoutes = require('./routes/defaultRoutes');
const adminRoutes = require('./routes/adminRoutes');
app.use('/', defaultRoutes);
app.use('/admin', adminRoutes);



app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}.`)
});