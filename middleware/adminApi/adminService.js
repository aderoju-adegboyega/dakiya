const bcrypt = require('bcryptjs');
const Admin = require('../adminApi/adminSchema'); // Assuming you have an Admin schema

const adminLoginService = async (email, password) => {
    try {
        const admin = await Admin.findOne({ email });

        if (!admin) {
            let err= new Error('Admin not Found');
            err.status=401;
            throw err;
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            let err= new Error('Invalid Email or Password');
            err.status=402;
            throw err;
        }

        await Admin.updateOne(
            { _id: admin._id },
            { $set: { status: 'online' } }
        );

        return { name: admin.name };
    } catch (error) {
        let err= new Error('Login Failed.');
        err.status=401;
        throw err;
    }
};

module.exports = adminLoginService;

