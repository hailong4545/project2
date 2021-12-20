const setCookie = (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    res.cookie('token', username);
    res.redirect('/');
}

module.exports = setCookie;