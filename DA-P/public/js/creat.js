const projectName = document.querySelector('#project');
const content = document.querySelector('#content');
const count = document.querySelector('#count');
const btnSubmit = document.querySelector('#btn-submit');

const btnCloseToast = document.querySelector('.btn-close');
btnCloseToast.addEventListener('click', (e) => {
    document.querySelector('.toast').style.display = 'none';
})


var admin = '';
var cookie = document.cookie.split(';');
for(let i = 0; i< cookie.length; i++) {
    cookie[i] = cookie[i].split('=');
    if (cookie[i][0] == 'token') {
        admin = cookie[i][1];
    }
}

const project = {
    admin: admin,
    projectName: '',
    content: '',
    count: 0,
    questions: [],
    answers: [],
    correctAnswer: [],
    setTime: [],
}

async function getProjects() {
    let data = await fetch('http://localhost:3000/api/projects');
    let projects = await data.json();
    return projects;
}

btnSubmit.addEventListener('click', async (e) => {
    // e.preventDefault();
    console.log('1');
    let projects = await getProjects();
    let index = await projects.findIndex(ele => ele.projectName == projectName.value);
    if (index == -1) {
        project['projectName'] = projectName.value;
        project['content'] = content.value;
        project['count'] = count.value;
        if (project['count'] == 1) {
            btnNext.innerText = 'Submit';
        }
        document.querySelector('#form-question').style.display = 'block';
        document.querySelector('#form-project').style.display = 'none';
    }
    else {
        document.querySelector('.toast').style.display = 'block';
        document.querySelector('.toast-body').innerText = 'Project Name đã tồn tại';
    }

})

const ques = document.querySelector('#question');
const a = document.querySelector('#a');
const b = document.querySelector('#b');
const c = document.querySelector('#c');
const d = document.querySelector('#d');

const correctAnswer = document.querySelector('#correct-answer');
const setTime = document.querySelector('#set-time');


const btnNext = document.querySelector('#btn-next');

var i = 1;

btnNext.addEventListener('click', (e) => {
    if (btnNext.innerText != 'Submit') {
        i++;
        project['questions'].push(ques.value);
        project['answers'].push([a.value, b.value, c.value, d.value]);
        project['correctAnswer'].push(correctAnswer.value);
        project['setTime'].push(setTime.value);
        a.value = '';
        b.value = '';
        c.value = '';
        d.value = '';
        ques.value = '',
        correctAnswer.value = '';
        setTime.value = '';
        document.querySelector('#number-question').innerText = i;

        if (i == project['count']) {
            btnNext.innerText = 'Submit';
        }
    }
    else {
        i++;
        project['questions'].push(ques.value);
        project['answers'].push([a.value, b.value, c.value, d.value]);
        project['correctAnswer'].push(correctAnswer.value);
        project['setTime'].push(setTime.value);
        a.value = '';
        b.value = '';
        c.value = '';
        d.value = '';
        ques.value = '',
        correctAnswer.value = '';
        setTime.value = '';
        document.querySelector('#number-question').innerText = i;
        project['status'] = 'pending';

        fetch('http://localhost:3000/api/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        }).then(data => data.json())
        .then(data => window.location = 'http://localhost:3003/creat')
    }
})