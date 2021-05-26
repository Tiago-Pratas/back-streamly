const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

async function sendEmailToken(userEmail, verificationToken, protocol, host) {
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_ACC,
            pass: process.env.EMAIL_PWD,
        },
    });

    const info = await transporter.sendMail({
        from: '"Streamly" <no-reply@streamly.com>',
        to: `${userEmail}`,
        subject: 'email confirmation',
        text: 'Email verification from the comic books',
        html: encodeURI(`${protocol}://${host}/auth/verify/${userEmail}/${verificationToken}`),
    });

    return info;

}

module.exports = { sendEmailToken };