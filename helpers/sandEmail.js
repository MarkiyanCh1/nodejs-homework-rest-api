import nodemailer from "nodemailer";
import "dotenv/config";

const { META_PASSWORD } = process.env;

const nodemailreConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: { user: "markch@meta.ua", pass: META_PASSWORD },
};

const transport = nodemailer.createTransport(nodemailreConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: "markch@meta.ua" };
  await transport
    .sendMail(email)
    .then(() => {
      console.log("Email send success");
    })
    .catch((error) => console.log(error.message));
  return true;
};

export default sendEmail;
