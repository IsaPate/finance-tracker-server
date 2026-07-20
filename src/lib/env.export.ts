import dotenv from "dotenv";
dotenv.config();

const config = {
  clientUrl: process.env.CLIENT_URL,
  secret: process.env.SECRET,
  refreshKey: process.env.REFRESH_SECRET_KEY,
  databaseUrl: process.env.DATABASE_URL,
  nodemailer: {
    host: process.env.NODE_MAILER_HOST,
    username: process.env.NODE_MAILER_USERNAME,
    password: process.env.NODE_MAILER_PASSWORD,
    auth: process.env.NODE_MAILER_AUTH,
    port: process.env.NODE_MAILER_PORT,
  },
};

export default config;
