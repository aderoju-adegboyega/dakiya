const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
});

// Hash the password before saving the admin model
AdminSchema.pre('save', function(next) {
  const admin = this;

  if (!admin.isModified('password')) return next();

  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(admin.password, salt, function(err, hash) {
      if (err) return next(err);

      admin.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model('Admin', AdminSchema);

