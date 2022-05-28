const nodemailer = require("nodemailer");
const { EMAIL, E_PASS } = require("../../config");

module.exports = async function email(to, subject, text, html){
    try{
        const transport = nodemailer.createTransport({
            host: 'smpt.mail.ru',
            port: 587,
            secure: false,
            auth: {
                user: EMAIL,
                pass: E_PASS
            }
        })


        return await transport.sendMail({
            from: '"Photos websiete", <sendemailformail@mail.ru>',
            to,
            subject,
            text,
            html
        })
    }catch(e){
        console.log("email: " + e);
    }
}