const fs = require('fs')

global.d = new Date()
global.calender = d.toLocaleDateString('id')

    //General Settings 
global.prefa = ['','!','.',',','🐤','🗿']
global.ownNumb = '' //do not replace
global.NamaOwner = 'Raol404' //do not replace
global.sessionName = 'session' //do not replace
global.namabot = 'LatestURL | RaolProjects' //do not replace
global.author = 'Raol404' //ganti aj klo mau
global.packname = 'LatestURL | RaolProjects' //do not replace
global.yt = '' //do not replace
global.channel = '120363378800202820@newsletter' //do not replace

global.mess = { //do not replace
    ingroup: 'This feature can only be used for groups',
    owner: 'you are not the owner',
    premium: 'you are not a premium user',
    seller: 'hanya bisa digunakan untuk reseller',
    usingsetpp: 'hanya bisa digunakan untuk owner',
    wait: 'Tunggu sedang diproses🕙'
}

global.autOwn = 'req(62-8S57547ms11).287p'
let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
	require('fs').unwatchFile(file)
	console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
	delete require.cache[file]
	require(file)
})