const fs = require('fs')
const _cmdUser = JSON.parse(fs.readFileSync('./lib/database/commandUser.json'));

async function addCountCmdUser(nama, sender, u) {
var posi = null
var pos = null
Object.keys(u).forEach((i) => {
if (u[i].jid === sender) {
posi = i
}
})
if (posi === null) {
u.push({jid: m.sender, db: [{nama: nama, count: 0}]})
fs.writeFileSync('./lib/database/commandUser.json', JSON.stringify(u, null, 2));
Object.keys(u).forEach((i) => {
if (u[i].jid === m.sender) {
posi = i
}
})
}
if (posi !== null) {
Object.keys(u[posi].db).forEach((i) => {
if (u[posi].db[i].nama === nama) {
pos = i
}
})
if (pos === null) {
u[posi].db.push({nama: nama, count: 1})
fs.writeFileSync('./lib/database/commandUser.json', JSON.stringify(u, null, 2));
} else {
u[posi].db[pos].count += 1
fs.writeFileSync('./lib/database/commandUser.json', JSON.stringify(u, null, 2));
}
}
}

async function getPosiCmdUser(sender, _db) {
var posi = null
Object.keys(_db).forEach((i) => {
if (_db[i].jid === sender) {
posi = i
}
})
return posi
}

async function addCountCmd(nama, sender, _db) {
addCountCmdUser(nama, sender, _cmdUser)
var posi = null
Object.keys(_db).forEach((i) => {
if (_db[i].nama === nama) {
posi = i
}
})
if (posi === null) {
_db.push({nama: nama, count: 1})
fs.writeFileSync('./lib/database/command.json',JSON.stringify(_db, null, 2));
} else {
_db[posi].count += 1
fs.writeFileSync('./lib/database/command.json',JSON.stringify(_db, null, 2));
}
}

module.exports = { addCountCmd, getPosiCmdUser, addCountCmdUser }