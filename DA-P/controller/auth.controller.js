const auth = (req, res, next) => {
    try {
        let token = req.cookies['token'];
        if (token) {
            next();
        }
        else {
            res.redirect('/introduce');
        }
    }
    catch (err) {
        res.redirect('/introduce');
    }
}

module.exports = auth;