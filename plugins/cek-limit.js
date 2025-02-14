const axios = require('axios')

let handler = async (m, { Raol404, text, reply }) => {
    reply(`Hello Worlds`) 
}

handler.command = ["limit", "cek-limit"];
handler.owner = true

module.exports = handler;