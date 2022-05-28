require("dotenv").config();

const { env } = process;

module.exports = {
    PORT: env.PORT,
    DB_URL: env.DB_URL,
    SECRET_WORD: env.SECRET_WORD,
    EMAIL: env.EMAIL,
    E_PASS: env.E_PASS
}