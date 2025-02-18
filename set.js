const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUpLSGhqRDhRUUlsbTBDWGpGVmE3OVQ5SG1IdkRVQjAwR2JEb2hiVGJWUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOVFqck5wWUZObjdmcktUM25jbDlRM2tMS1RUM3pNRE04Z1NUbkluMzNrOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwTFR4YUIzMWdLdkZSbWFPZWlxWUIzeGNMS2ZDdGVTZjdtSDU1c2NBem5FPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJIYzdMWENYbGowb1R5YnowaTV1bStic00xejhCa0sySTBNRDhsMHgySUJrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtIYUYySmVrV2F1Rnk5a21JRWJFaW1TS2g5enBzd1I3NzA4TWQ5Q01IVTQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImxhV3FDanpFYlBvR0NDaXI0MVhpc252R1M1VzRSWVNFNytwVUlsT2h1RlE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0JtM21qNHg1NVVPVGlEU2FFamJVdUc4VjVnVkVucFdmTzdZVUQrY3dGZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU3dHOWNXNDZzc3g0M0V5TEFBZWg4d0drZmgwdjVsSmVLZU0wSHJNVTlSdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndsR1M2N0VIZXZlL0xlVmdkR0VOSFBXQkF3RjU2bTR0NUk2NWI3MGZjMlA5ZHhLZHRDQ3l1VFBodWQ3ZjJGaGVmY1FuZlB6RkduY1BjR2FmbERLMGhRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjE5LCJhZHZTZWNyZXRLZXkiOiJreEY4bDExbWN5U3p2ZmFVME1GWThySUJud3JqMlBiZ0JhZU1pMmhTb1d3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJCSFFWUE83QlRRbU9hWldNeEtWaWR3IiwicGhvbmVJZCI6IjY4YTVhYzA4LTU4ZTgtNDFiNC1hMjIzLWZhZDVhZWQzMDZjNiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3Mk9PYUNRTGdPa2o4QktyYXZXZmExcmZUKzA9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS3ZvWUJKdkdqMXJwWmpnYXhZejRaeXUwQ3JVPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjFKODE0TUs2IiwibWUiOnsiaWQiOiIyNTQ3OTEwMTQzMjQ6NzNAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xYcHM5UURFUHZ1MEwwR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkhoWEQ5dTdsaTVmbW9WOUhuTUFPRDBka2R5UGp4MEp0NFJXU25PeDNTVkk9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlM1b3lqVmo5ekZDN0RlbHFNTHJjc3pTcU1wMHdnYlZBYWI5andEQjR4SVA1UC81M2FrNU05MUZXWERGVUNUT2E5MTlEeVpUZFhsalV3WmR5dDFZNkR3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJBTngxRkNQQzM1bTlmaHhUQVFVMDRjcDhXVlZnWFZvYWEwZG1VUi85ZWlUMzlONW9tN1U3T3kvWkE0aE85eHEwS2wxWFdJM2lSZzd1Wis4SXB3Z3pnQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc5MTAxNDMyNDo3M0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJSNFZ3L2J1NVl1WDVxRmZSNXpBRGc5SFpIY2o0OGRDYmVFVmtwenNkMGxTIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM5ODYzOTQ0fQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
