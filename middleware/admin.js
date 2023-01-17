module.exports = function(req, res, next) {
    if(!req.teacher.isAdmin) return res.status(403).json("not authorized");

    next();
}
