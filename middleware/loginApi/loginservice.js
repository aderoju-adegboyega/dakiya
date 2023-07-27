const bcrypt = require('bcryptjs');
const User = require('../registrationApi/registrationschema');

const loginService = async (email, password) => {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            let err= new Error('User not Found');
            err.status=401;
            throw err;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            let err= new Error('Invalid Email or Password');
            err.status=402;
            throw err;
        }

        await User.updateOne(
            { _id: user._id },
            { $set: { status: 'online' } }
        );

        return { name: user.name };
    } catch (error) {
        let err= new Error('Login Failed.');
        err.status=401;
        throw err;
    }
};

module.exports = loginService;
