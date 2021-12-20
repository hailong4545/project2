var admin = '';
var cookie = document.cookie.split(';');
for(let i = 0; i< cookie.length; i++) {
    cookie[i] = cookie[i].split('=');
    if (cookie[i][0] == 'token') {
        admin = cookie[i][1];
    }
}

function show(project) {
    const creatTd = (index) => {
        let td = '';
        for(let i = 0; i < 4; i++) {
            td += `<td>${project.answers[index][i]}</td>`;
        }
        return td;
    }
    const creatTr = () => {
        let tr = '';
        for(let i = 0; i < parseInt(project.count); i++) {
            tr += `
                <tr>
                    <th scope="row">${i+1}</th>
                    <td>${project.questions[i]}</td>
                    ${creatTd(i)}
                    <td>${project.correctAnswer[i]}</td>
                </tr>
            `
        }
        return tr;
    }

    return `
        <details class='detail-project'>
            <summary class='name-project'>${project.projectName} &nbsp;&nbsp;&nbsp;&nbsp;<button class='btnStart'>Start</button></summary>
            <h5>Code: ${project.id}</h5>
            <p>Content: ${project.content}</p>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Question</th>
                        <th scope="col">A</th>
                        <th scope="col">B</th>
                        <th scope="col">C</th>
                        <th scope="col">D</th>
                        <th scope="col">Correct Answer</th>
                    </tr>
                </thead>
                <tbody>
                    ${creatTr()}
                </tbody>
            </table>
        </details>
    `
}


async function getProjects() {
    let data = await fetch('http://localhost:3000/api/projects');
    let projects = await data.json();
    return projects;
}

async function append() {
    let projects = await getProjects();
    projects = await projects.filter(p => p.admin == admin);
    for(let i = 0; i < projects.length; i++) {
        document.querySelector('.creat').innerHTML +=  show(projects[i]);
    }

    const btnStarts = document.querySelectorAll('.btnStart');
    for(let i = 0; i < btnStarts.length; i++) {
        btnStarts[i].addEventListener('click', async(e) => {
            console.log(btnStarts[i]);
            let projects = await getProjects();
            let index = await projects.findIndex(p => e.path[2].querySelector('h5').innerText.split(': ')[1] == p.id && p.status == 'pending');
            if (index != -1) {
                projects[index]['status'] = 'start';
                await fetch('http://localhost:3000/api/projects', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projects[index]),
                })
            }
        })
    }
}

append();

