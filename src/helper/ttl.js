const ms = require("ms"); // optional helper
// npm i ms
const refreshTTL = Math.floor(ms(process.env.REFRESH_TOKEN_EXPIRES) / 1000);
module.exports = { refreshTTL };
