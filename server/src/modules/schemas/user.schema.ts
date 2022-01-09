import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';


//export type UserDocument = User & Document;

/*
  The @Schema() decorator marks a class as a schema definition. 
  It maps the User class to a MongoDB collection of the same name, 
  but with an additional “s” at the end - so the final mongo collection
  name will be users.

  For additional info, visit: https://docs.nestjs.com/techniques/mongodb
*/

export const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    unique: true,
    required: false
  },
   userName: {
    type: String,
    unique: true,
    required: false
  },
   email: {
    type: String,
    unique: true,
    required: true
  },
   phone: {
    type: Number,
    unique: true,
    required: false
  },
  password: {
    type: String,
    required: true
  },
  studentId: {
    type: Number,
    required: true
  }
  
});


UserSchema.pre('save', function (next) {

  let user = this;

  // Make sure not to rehash the password if it is already hashed
  if (!user.isModified('password')) return next();

  // Generate a salt and use it to hash the user's password
  bcrypt.genSalt(10, (err, salt) => {

    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {

      if (err) return next(err);
      user.password = hash;
      next();

    });

  });

});

UserSchema.methods.checkPassword = function (attempt, callback) {

  let user = this;

  bcrypt.compare(attempt, user.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
  
};
UserSchema.methods.getStudentId = function(id){
  let user = this;
  return user.studentId;
}