import nodemailer from "nodemailer";
import { RequestHandler } from "./http-request-handler.";

export class sendEmail {

    static sendEmail(email: any, subject: any, text: any, html: string = '') {

        try {
            const transporter = nodemailer.createTransport({
                host: process.env.HOST,
                service: process.env.SERVICE,
                port: 587,
                secure: true,
                auth: {
                    user: process.env.USER,
                    pass: process.env.PASS,
                },
            });
            setTimeout(() => {
                try {
                    transporter.sendMail({
                        from: process.env.USER,
                        to: email,
                        subject: subject,
                        text: text,
                        html: html ? html : text
                    }, (err: any, res: any) => {
                        if (err)
                            RequestHandler.logErr(res);
                        if (res)
                            console.log("res", res);
                    })
                } catch (error) {
                    RequestHandler.logErr(error);
                }
            }, 2000);
            console.log("email sent successfully");
        } catch (error) {
            RequestHandler.logErr(error);
        }
    };



    static generatePassword = (length = 10, specialChars = true) => {
        const alphaCodesArray = Array.from(Array(26)).map((e, i) => i + 65);
        const uppercaseAlphabetArray = alphaCodesArray.map((letterCode) => String.fromCharCode(letterCode));
        const lowercaseAlphabetArray = uppercaseAlphabetArray.map(e => e.toLowerCase());

        const uppercaseAlphabet = [...uppercaseAlphabetArray].join('');
        const lowercaseAlphabet = [...lowercaseAlphabetArray].join('');
        const specialSymbols = typeof specialChars === 'string' ? specialChars : (specialChars ? "!@#$%^&*?" : "");

        const characters = `${lowercaseAlphabet}${uppercaseAlphabet}${specialSymbols}`;

        return [...Array(length)].reduce(acc => acc.concat(characters.charAt(Math.floor(Math.random() * characters.length))), '');
    }

}
