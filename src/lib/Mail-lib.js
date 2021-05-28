import nodeMailer from "nodemailer";
import mailConfig from "../config/mail-config";

export default nodeMailer.createTransport(mailConfig);
