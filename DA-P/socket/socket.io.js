var game = {};

const set_io = (io) => {
    io.on('connection', (socket) => {
        socket.on('get project', (project) => {
            socket.join(project.id);
            socket.join(socket.id);
            game[project.id] = project;
            game[project.id]['player'] = [];
            game[project.id]['index'] = 0;
            game[project.id]['points'] = {};
            delete game[project.id]['id']; 
        })

        socket.on('new person', (data) => {
            socket.join(data[0]);
            socket.join(socket.id);
            game[data[0]]['points'][data[1]] = 0;
            game[data[0]]['player'].push(data[1]);
            io.to(data[0]).emit('new person', (game[data[0]]['player']))
        });

        socket.on('start game', (room) => {
            console.log(game[room]);
            io.to(room).emit('start game', game[room])
        })

        socket.on('next question', (room) => {
            game[room]['index'] += 1
            io.to(room).emit('next question', game[room])
        })

        socket.on('send answer', (data) => {
            let index = parseInt(game[data[1]]['index']);
            if (data[2] == game[data[1]]['correctAnswer'][index]) {
                game[data[1]]['points'][data[0]] += parseInt(data[3]) * 10;
            }
            
        })

        socket.on('rank', (room) => {
            console.log(1);
            io.to(room).emit('rank', game[room]['points']);
        })
    })
}

module.exports = set_io;