const model = require('../models/authModel');
const bcrypt = require('bcrypt');


login = async (req, res) => {
    const user = await model.getUser(req.body.email, req.body.password)
    if (!user) {
        return res.status(401).json({ message: 'User not found' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(401).json({ message: 'Invalid password' });
    }
    const rolls = await model.getRole(user);
    const accessToken = jwt.sign({ userId: user.userId, rolls: rolls.map(r => r.rollName) }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId: user.userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    res.json({ accessToken, refreshToken, user });
};
module.exports = { login };

