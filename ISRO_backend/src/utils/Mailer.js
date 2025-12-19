import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendOTP = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP for Verification',
      html: `<p>Your OTP is: <b>${otp}</b></p><p>Valid for 10 minutes</p>`
    });
    return true;
  } catch (error) {
    console.error('Email error:', error);
    return false;
  }
};

export default sendOTP