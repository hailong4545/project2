const homeController = {
    index : (req, res, next) => {
        res.render('home');
    },
    introduce : (req, res, next) => {
        res.render('introduce');
    },

    creat : (req, res, next) => {
        res.render('creat');
    },

    history : (req, res, next) => {
        res.render('history');
    },

    joinGame : (req, res, next) => {
        res.render('joingame');
    }
}

module.exports = homeController;
