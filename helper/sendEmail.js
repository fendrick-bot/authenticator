import nodemailer from "nodemailer";
import User from "@/models/userdbmodel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, verificationType, userId }) => {
  try {
    const verificationToken = await bcryptjs.hash(email.toString(), 10);

    if (verificationType == "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: verificationToken,
        verifyTokenExpiry: Date.now() + 600000,
      });
    } else if (verificationType == "PASSWORD") {
      await User.findByIdAndUpdate(userId, {
        forgetPasswordToken: verificationToken,
        forgetPasswordTokenExpiry: Date.now() + 600000,
      });
    }

    var transport = nodemailer.createTransport({
      service:"gmail",
      host: "smtp.gmail.com",
      ignoreTLS:false,
      tls: { rejectUnauthorized: false},
      port: 465,
      secure:true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAILPASSWORD,
      },
    });

    await new Promise((resolve, reject) => {
      // verify connection configuration
      transport.verify(function (error, success) {
          if (error) {
              console.log(error);
              reject(error);
          } else {
              console.log("Server is ready to take our messages");
              resolve(success);
          }
      });
  });

    var mailOptions = {
      from: { name: "Authenticator", address: "noreply.authenticator.2024@gmail.com" },
      to: email,
      subject:
        verificationType == "VERIFY"
          ? "Email Verification!"
          : "Reset Password!",

      html:
        verificationType == "VERIFY"
          ? `<h1>Authenticator</h1> <br /><p>This is the Email verification link <br />Click <a href= "${process.env.DOMAIN}/verifyemail?token=${verificationToken}">Here</a> to verify your Authenticator account! </p> <br /><br />
        <p><b>In case the above link does not work, copy the code below and paste it in your browser.</b> <br /> <br />${process.env.DOMAIN}/verifyemail?token=${verificationToken}</p> <br /><br />
        <p>Team Authenticator</p>`
          : `<h1>Authenticator</h1> <br /><p>This is the Reset Password link <br />Click <a href= "${process.env.DOMAIN}/resetpassword?token=${verificationToken}">Here</a> to reset your Authenticator account password! </p> <br /><br />
        <p><b>In case the above link does not work, copy the code below and paste it in your browser.</b> <br /> <br />${process.env.DOMAIN}/verifyemail?token=${verificationToken}</p> <br /><br />
        <br/>
        <p>Please do not share your login credentials with anyone.</p> <br/><br/>
        <p>Team Authenticator</p>`,
    };

    console.log("Sending email");

    const mailresponse = await new Promise((resolve, reject) => {
      // send mail
      transport.sendMail(mailOptions, (err, info) => {
          if (err) {
              console.error(err);
              reject(err);
          } else {
              console.log(info);
              resolve(info);
          }
      });
  });

    // const mailresponse = transport.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     console.log("email not sent " + error);
    //   } else {
    //     console.log("Email sent: " + info.response);
    //   }
    // });
    console.log(mailresponse);
    return mailresponse;
    
  } catch (error) {
    throw new Error(error.message);
  }
};
