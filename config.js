//import { writeFile } from 'fs';
const fs = require('fs');
const colors = require('colors');
const targetPath = './src/environments/environment.ts';

require('dotenv').config();

const envConfigFile = `export const environment = {
   googleAnalyticsToken: '${process.env.GOOGLE_ANALYTICS_TOKEN}',
   emailjsTemplate: '${process.env.EMAILJS_TEMPLATE}',
   emailjsToken: '${process.env.EMAILJS_TOKEN}',
   emailjsServiceId: '${process.env.EMAILJS_SERVICE_ID}',
   production: ${process.env.PRODUCTION}
};`;

console.log(colors.magenta('The file `environment.ts` will be written with the following content: \n'));
console.log(colors.grey(envConfigFile));
fs.writeFile(targetPath, envConfigFile, function (err) {
   if (err) {
       throw console.error(err);
   } else {
       console.log(colors.magenta(`Angular environment.ts file generated correctly at ${targetPath} \n`));
   }
});
