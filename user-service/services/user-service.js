const User = require('../models/User');
const Message = require("../messages/Message")
const Httpcode = require("../codes/httpCodes")
const generateOTP = require("../middleware/otpgenerater");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRETKEY } = process.env;
const { Op } = require('sequelize');
// const nodemailer = require('nodemailer');  // Add this for email functionality
const {sendMessage,sendsms} = require("../middleware/rabbitMq")

class UserService {
  static async signup(payload) {
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ where: { email_id: payload.email_id } });
      if (existingUser) {
        return { success: false, status: 400, message: 'User already exists' };
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(payload.password, 10);

      // Create the new user
      const user = await User.create({
        user_name: payload.user_name,
        email_id: payload.email_id,
        phone_number: payload.phone_number,
        password: hashedPassword,
        role: payload.role || 'user',
      });

      return { success: true, status: 201, data: user, message: 'User created successfully' };
    } catch (err) {
      console.error(err);
      return { success: false, status: 500, message: 'Internal Server Error' };
    }
  }

  static async login(payload) {
    try {
      // Find the user by email
      const user = await User.findOne({ where: { email_id: payload.email_id } });
      if (!user) {
        return { success: false, status: 404, message: 'User not found' };
      }

      // Verify the password
      const isPasswordValid = await bcrypt.compare(payload.password, user.password);
      if (!isPasswordValid) {
        return { success: false, status: 401, message: 'Invalid credentials' };
      }

      // Generate a JWT token
      const payloads = {
        user_id: user.user_id,
        user_name: user.user_name,
        email_id: user.email_id,
        phone_number: user.phone_number,
        user_role:user.role

      };
      const token = jwt.sign(payloads,SECRETKEY);
      // const token = jwt.sign({ user_id: user.id }, SECRETKEY, { expiresIn: '1h' });

      return { success: true, status: 200, data: { token }, message: 'Login successful' };
    } catch (err) {
      console.error(err);
      return { success: false, status: 500, message: 'Internal Server Error' };
    }
  }

  static async updateProfile(request) {
    try {
      const userId = request.user.user_id;
      const { email_id } = request.payload;

      // Update user profile
      const user = await User.update({ email_id }, { where: { user_id: userId } });
      if (user[0] === 0) {
        return { success: false, status: 404, message: 'User not found' };
      }

      return { success: true, status: 200, message: 'Profile updated successfully' };
    } catch (err) {
      console.error(err);
      return { success: false, status: 500, message: 'Internal Server Error' };
    }
  }

  static async forgetPassword(payload) {
    try {
      // Find user by email
      const isUserExist = await User.findOne({ where: { email_id: payload.email_id } });
      console.log(isUserExist)
      // if (!isUserExist) {
      //   return {
      //     sucess: false,
      //     status: Httpcode.HTTP_NOT_FOUND,
      //     message: Message[104]
      //   }
      // }

      const user_id  = isUserExist.dataValues.user_id;

      // if (!isUserExist) {
      //   return {
      //     sucess: false,
      //     status: Httpcode.HTTP_BAD_REQUEST,
      //     message: Message[101],
      //   };
      // }

      // if (isUserExist.is_active === 0) {
      //   return {
      //     sucess: false,
      //     status: Httpcode.HTTP_BAD_REQUEST,
      //     message: Message[109],

      //   };
      // }

      // if (isUserExist.is_deleted === 1) {
      //   return {
      //     sucess: false,
      //     status: Httpcode.HTTP_NOT_FOUND,
      //     message: Message[110],
      //   };
      // }

      // await sendMail(email_id, user_id);
      //  const orderMessage = { email_id, user_id };
      console.log(payload.email_id, user_id)
       await sendMessage(payload.email_id, user_id);

      

      return { success: true, status: 200, message: 'OTP sent to email' };
    } catch (err) {
      console.error(err);
      return { success: false, status: 500, message: 'Internal Server Error' };
    }
  }

  static async resetPassword(request) {
    try {
      const userId = request.user.user_id;
      console.log(userId)
      const { password } = request.payload;

      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Update the password
      await User.update({ password: hashedPassword }, { where: { user_id: userId } });

      return { success: true, status: 200, message: 'Password updated successfully' };
    } catch (err) {
      console.error(err);
      return { success: false, status: 500, message: 'Internal Server Error' };
    }
  }

  static async generateAndSendOTP(request) {
    try {
      const userId = request.user.user_id;
      const user = await User.findByPk(userId);

      if (!user) {
        return { success: false, status: 404, message: 'User not found' };
      }
      const phonenumber=  user.phone_number;

      // Generate OTP (dummy implementation)
      const otp = generateOTP(); // 6-digit OTP

      await sendsms(phonenumber, otp);

      const validtime = Date.now()

      await User.update({ otp: otp ,validtime:validtime}, {
        where: {
          user_id: userId
  
        },
      })

      // Send OTP (dummy implementation)
      console.log(`OTP for ${user.email_id}: ${otp}`);

      return { success: true, status: 200, data: { otp }, message: 'OTP generated and sent' };
    } catch (err) {
      console.error(err);
      return { success: false, status: 500, message: 'Internal Server Error' };
    }
  }

  static async verifypassword(request) {
    try {
      const userId = request.user.user_id;
      const { otp } = request.payload;

      const result = await User.findOne({ where: { user_id: userId } });
    const opts = result.dataValues.otp
    if (opts !== otp) {
      return {
          sucess: false,
          status: Httpcode.HTTP_NOT_FOUND,
          message: Message[124],
        };
      }

      const payload = {
        user_id: result.dataValues.user_id,
        otp:result.dataValues.otp
      };
      const acess_token = jwt.sign(payload,SECRETKEY);

      // Verify OTP (dummy implementation)
      console.log(`OTP verification for user ID ${userId}: ${otp}`);

      return { success: true, status: 200, message: 'OTP verified',data: acess_token };
    } catch (err) {
      console.error(err);
      return { success: false, status: 500, message: 'Internal Server Error' };
    }
  }

  static async getAllUsers(request) {
    try {
      const users = await User.findAll();
      return { success: true, status: 200, data: users, message: 'Users retrieved successfully' };
    } catch (err) {
      console.error(err);
      return { success: false, status: 500, message: 'Internal Server Error' };
    }
  }
  static async getspecficUserByuserid(request){
    try {
      const user_id = request.params.id
    
      const user = await User.findByPk(user_id);

      if (!user) {
        return { success: false, status: 404, message: 'User not found' };
      }

      return { success: true, status: 200, data: user, message: 'User retrieved successfully' };
    } catch (err) {
      console.error(err);
      return { success: false, status: 500, message: 'Internal Server Error' };
    }
  
  }
  static async getspecficUser(request) {
    try {
      const userId = request.user.user_id;
      const user = await User.findByPk(userId);

      if (!user) {
        return { success: false, status: 404, message: 'User not found' };
      }

      return { success: true, status: 200, data: user, message: 'User retrieved successfully' };
    } catch (err) {
      console.error(err);
      return { success: false, status: 500, message: 'Internal Server Error' };
    }
  }
}

module.exports = UserService;

