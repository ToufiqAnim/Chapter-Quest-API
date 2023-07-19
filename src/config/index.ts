import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_round: process.env.BCYYPT_SALT_ROUNDS,
  jwt: {
    secret: process.env.JWT_SECRET,
    secret_expires_in: process.env.JWT_SECRET_EXPIRES_IN,
    refresh: process.env.JWT_REFRESH,
    refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  },
};
