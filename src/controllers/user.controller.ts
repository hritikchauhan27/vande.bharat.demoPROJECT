import { UserModel } from "../models/user.model";
import { SessionModel } from '../models/session.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Sessions } from './session.controller';
import { get_otp, logout_session_redis, maintainSession } from '../middleware/redis.middleware';
import { Auth } from '../middleware/decode';
import { Response } from '../const/response';
import * as redis from 'redis';
import { SetOptions } from "redis";
import nodemailer from 'nodemailer';

export class UserOperation {

  static async userSignUp(payload) {
    const details = payload;
    try {
      const user = await UserModel.findOne({ username: details.username });
      console.log("user  ", user);
      if (!user) {
        const hashpassword = await Auth.generate_hash_pass(details.password);
        const user_details = new UserModel({
          username: details.username,
          password: hashpassword,
          email: details.email,
          role: details.role,
        });
        const Details = await user_details.save();
        console.log(Details);
        return Response.sendResponse("User Register Successfully", 201, {});
      }
      else {
        console.log("user  12");
        return Response.sendResponse("User already exist", 403, {});
      }
    }
    catch (err) {
      console.log("user  ", err);
      return Response.sendResponse("Server Error", 500, {});
    }
  }


  static async userLogin(email, password, device) {
    const user = await UserModel.findOne({ email: email });
    const role = user.role;
    console.log(role);

    const forToken = { email, role };
    try {
      if (user) {
        const userSession = await SessionModel.findOne({ user_id: user._id });
        console.log(userSession);
        if (!userSession?.status) {
          const hash = user.password;
          if (await bcrypt.compare(password, hash)) {
            const token = jwt.sign(forToken, process.env.SECRET_KEY);
            console.log(token);
            await Sessions.sessionEntry(device, user, userSession);
            await maintainSession(user, device);
            return Response.sendResponse("login successfully", 201, { user, token });
          }
          else {
            return Response.sendResponse("password is incorrect", 404, {});
          }
        }
        else {
          return Response.sendResponse("User is already active", 404, {});
        }
      } else {
        return Response.sendResponse("user not found", 404, {});
      }
    } catch (error) {
      console.log(error);
      return Response.sendResponse("Server Error", 500, {});
    }
  }



  static async logout_user(token) {
    try {
      const userToken: any = await Auth.verify_token(token);
      const user = await UserModel.findOne({ email: userToken.email });
      console.log(user);
      if (user) {
        const userSession = await SessionModel.findOne({ user_id: user.id });
        console.log(userSession);
        if (userSession) {
          if (userSession.status) {
            await logout_session_redis(user);
            const updatedUserSession = await SessionModel.findOneAndUpdate(
              { _id: userSession.id },
              { status: !userSession.status }
            );
            console.log(updatedUserSession);
            return Response.sendResponse("User logOut Successfully", 201, {});
          } else {
            return Response.sendResponse("User is already inactive", 404, {});
          }
        }
      } else {
        return Response.sendResponse("User not found", 404, {});
      }
    } catch (err) {
      return Response.sendResponse("Server Error", 500, {});
    }
  }


  static async getUser(token) {
    try {
      const userToken: any = await Auth.verify_token(token);
      const user = await UserModel.findOne({ email: userToken.email });
      if (user) {
        return Response.sendResponse("User detail", 201, { user });
      }
      else {
        return Response.sendResponse("user doesn't exist", 403, {});
      }
    } catch (error) {
      return Response.sendResponse("Server Error", 500, {});
    }
  }




  static async forgotPassword(details) {
    return new Promise(async (resolve, reject) => {
      try {

        const client = await redis.createClient();
        await client.connect();

        const user = await UserModel.findOne({ email: details.email });
        console.log(user)
        if (!user) {
          return 0;
        }
        let OTP = Math.floor(1000 + Math.random() * 9000);
        const options: SetOptions = { EX: 100 };
        await client.set(details.email, OTP.toString(),options);
        console.log("otp set to redis")

        const transporter = nodemailer.createTransport({
          service: "gmail",
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD,
          },
        });

        const mailOptions = {
          from: process.env.EMAIL_ADDRESS,
          to: details.email,
          subject: 'Password Reset Request',
          text: `You are receiving this email because you (or someone else) has requested a password reset for your account.\n\n
                Please click on the following link, or paste this into your browser to complete the process:\n\n
                ${process.env.CLIENT_URL}/RESET PASSWORD OTP: ${OTP}\n\n
                If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
            return resolve(Response.sendResponse("error sending mail", 500, {}));
          } else {
            console.log("Email sent: " + info.response);
            return resolve(Response.sendResponse("mail send", 201, {}));
          }
        });
      }
      catch (err) {
        return resolve(Response.sendResponse("Server Error", 500, {}))
      }
    });
  }


  static async reset_password(payload) {
    return new Promise(async (resolve, reject) => {
    try {
      const user: any = await UserModel.findOne({ email: payload.email });

      if (!user) {
        return resolve(Response.sendResponse("Invalid User", 403, {}))
      }

      const userOTP = await get_otp(payload.email);
      console.log("--------",userOTP);
      if (!userOTP || userOTP !== payload.otp) {
        return resolve(Response.sendResponse("Invalid OTP", 403, {}))
      }

      console.log(user.password);
      const salt = await bcrypt.genSalt(10);
      const hashpassword = await bcrypt.hash(payload.newPassword, salt);
      user.password = hashpassword
      console.log(user.password);
      await user.save();
      return resolve(Response.sendResponse("password reset successfully",201,{}))
    }
    catch (error) {
      console.log(error);
      return resolve(Response.sendResponse("Server error", 500, {}))
    }
  });
}
}




