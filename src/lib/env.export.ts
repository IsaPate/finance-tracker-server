import dotenv from "dotenv";
dotenv.config();

const config = {
  clientUrl: process.env.CLIENT_URL,
  nodemailer: {
    host: process.env.NODE_MAILER_HOST,
    username: process.env.NODE_MAILER_USERNAME,
    password: process.env.NODE_MAILER_PASSWORD,
    auth: process.env.NODE_MAILER_AUTH,
    port: process.env.NODE_MAILER_PORT,
  },
};

export default config;
