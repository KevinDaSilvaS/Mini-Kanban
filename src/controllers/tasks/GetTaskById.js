const execute = async (req, res) => {
    res.send({params: req.params});
}

module.exports = execute;