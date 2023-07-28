const bcrypt = require('bcryptjs');
const User = require('./registrationschema');

const registerUser = async (name, email, password) => {
    try {
        const hashed_password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

        // Get a reference to the "users" collection
        const usersCollection = User.collection;

        // Query the collection for documents that match the email
        const user = await usersCollection.findOne({ email });

        if (user) {
            let err= new Error('Email already exists');
            err.status=541;
            throw err;
        }

        // Insert the new registration document into the collection
        await usersCollection.insertOne({
            name,
            email,
            password: hashed_password,
            status: 'offline',
        });

        return { message: 'Registration details stored successfully.', name };
    } catch (error) {
        let err= new Error('Failed to store registration details.');
        err.status=540;
        throw err;

    }
};

module.exports = registerUser;
