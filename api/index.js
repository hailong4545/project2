const express = require('express')
const bodyParser = require('body-parser')
const Router = require('router')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const shortid = require('shortid');


// port
const port = process.env.PORT || 3000

// require data
const users = require('./data/users')
const projects = require('./data/projects')
const history = require('./data/history')
const deltails = require('./data/details')

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());



app.post('/api/users', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let id = req.body.id;

    users.push({id: id, username: username, password: password});

    res.json(users);
})

app.get('/api/users', (req, res) => {

    res.json(users);
})

app.get('/api/projects', (req, res) => {
    res.json(projects);
})

app.get('/api/projects/:id', (req, res) => {
    let project = projects.filter(p => p.id == req.params.id);
    res.json(project);
})

app.get('/api/history', (req, res) => {
    res.json(history);
})
app.post('/api/projects', (req, res) => {
    project = req.body;
    project.id = shortid.generate();
    projects.push(project);

    res.json(projects);
})


app.put('/api/projects', (req, res) => {
    let project = req.body;
    let index = projects.findIndex(p => p.id == project.id);
    if (index == - 1) {
        res.status(404);
        return;
    }
    else {
        projects[index] = project;
    }

    res.json(projects);
})

app.listen(port, () => {
    console.log(`Server listen ${port}`);
});


