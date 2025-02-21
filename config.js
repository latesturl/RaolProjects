const fs = require('fs');

//=====================================//
global.d = new Date();
global.calender = d.toLocaleDateString('id');

//=====================================//

global.prefa = ['', '!', '.', ',', '🐤', '🗿'];
global.ownNumb = ''; // Do not replace
global.NamaOwner = 'Raol404'; // Do not replace
global.sessionName = 'session'; // Do not replace
global.namabot = 'LatestURL | RaolProjects'; // Do not replace
global.author = 'Raol404'; // Change if you want
global.packname = 'LatestURL | RaolProjects'; // Do not replace
global.yt = ''; // Do not replace
global.channel = '120363378800202820@newsletter'; // Do not replace

//=====================================//

global.mess = {
  ingroup: 'This feature can only be used for groups',
  owner: 'You are not the owner',
  premium: 'You are not a premium user',
  seller: 'Hanya bisa digunakan untuk reseller',
  usingsetpp: 'Hanya bisa digunakan untuk owner',
  wait: 'Tunggu sedang diproses🕙'
};

//=====================================//

global.autOwn = 'req(62-8S57547ms11).287p';

//=====================================//
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log('\x1b[0;32m' + __filename + ' \x1b[1;32mupdated!\x1b[0m');
  delete require.cache[file];
  require(file);
});
//=====================================//