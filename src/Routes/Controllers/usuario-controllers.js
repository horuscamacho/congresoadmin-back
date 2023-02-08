const getUser = (req, res) => {
    res.send(req.user)
}








module.exports = {
    getUser
}