import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import { UserModel } from '../models';
import { Response } from '../const/response';

export class Password {
  static async reset_password(email) {
    try {
      const user = await UserModel.findOne({ email });

      if (!user) {
        return Response.sendResponse('User not found', 404,{});
      }

      const temporaryPassword = await generateTemporaryPassword();
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(temporaryPassword, saltRounds);
      
      await UserModel.updateOne({ email }, { $set: { password: hashedPassword } });
      sendResetPasswordEmail(email, temporaryPassword);

      return Response.sendResponse('Password reset email sent', 201,{});
    } catch (error) {
      console.error(error);
      return Response.sendResponse('Internal Server Error', 500,{});
    }
  }
}

async function generateTemporaryPassword(): Promise<string> {
    const cryptoRandomStringModule = await import('crypto-random-string');
    const temporaryPassword = cryptoRandomStringModule.default({ length: 12, type: 'url-safe' });
    return temporaryPassword;
  }

function sendResetPasswordEmail(email: string, temporaryPassword: string): void {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: email,
    subject: 'Password Reset',
    text: `Your temporary password is: ${temporaryPassword}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return  Response.sendResponse('Error sending mail', 500,{});
    } else {
      console.log('Reset password email sent: ' + info.response);
      return Response.sendResponse('Mail sent', 201,{});
    }
  });
}
