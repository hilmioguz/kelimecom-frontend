module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (req.session.user) {
            return next();
        }
        req.flash('error', 'Yetkili değilsiniz veya henüz login olmadınız.');
        res.redirect('/');
    }
}