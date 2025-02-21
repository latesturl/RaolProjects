require('./config');

const {
  smsg, getGroupAdmins, formatp, tanggal, formatDate, getTime, isUrl, await, sleep, 
  clockString, msToDate, sort, toNumber, enumGetKey, runtime, fetchJson, getBuffer, 
  jsonformat, delay, format, logic, generateProfilePicture, parseMention, getRandom, 
  pickRandom, reSize
} = require('./lib/myfunction');

const {
  makeWASocket, downloadContentFromMessage, emitGroupParticipantsUpdate, emitGroupUpdate, 
  generateWAMessageContent, generateWAMessage, makeInMemoryStore, prepareWAMessageMedia, 
  generateWAMessageFromContent, MediaType, areJidsSameUser, WAMessageStatus, 
  downloadAndSaveMediaMessage, AuthenticationState, GroupMetadata, initInMemoryKeyStore, 
  getContentType, MiscMessageGenerationOptions, useSingleFileAuthState, BufferJSON, 
  WAMessageProto, MessageOptions, WAFlag, WANode, WAMetric, ChatModification, 
  MessageTypeProto, WALocationMessage, ReRaol404ectMode, WAContextInfo, proto, 
  WAGroupMetadata, ProxyAgent, waChatKey, MimetypeMap, MediaPathMap, WAContactMessage, 
  WAContactsArrayMessage, WAGroupInviteMessage, WATextMessage, WAMessageContent, 
  WAMessage, BaileysError, WA_MESSAGE_STATUS_TYPE, MediaConnInfo, URL_REGEX, WAUrlInfo, 
  WA_DEFAULT_EPHEMERAL, WAMediaUpload, mentionedJid, processTime, Browser, MessageType, 
  Presence, WA_MESSAGE_STUB_TYPES, Mimetype, relayWAMessage, Browsers, GroupSettingChange, 
  DisRaol404ectReason, WASocket, getStream, WAProto, isBaileys, AnyMessageContent, 
  fetchLatestBaileysVersion, useMultiFileAuthState, templateMessage 
} = require('@whiskeysockets/baileys');
//=====================================//
const axios = require('axios');
const os = require('os');
const fs = require('fs');
const util = require('util');
const fetch = require('node-fetch');
const speed = require('performance-now');
const moment = require('moment-timezone');
const { spawn, exec } = require('child_process');
const { Primbon } = require('scrape-primbon');
const primbon = new Primbon();
const { performance } = require('perf_hooks');
const path = require('path');
const ytdl = require("ytdl-core");
const colors = require('@colors/colors/safe');
const chalk = require('chalk');
const { toPTT, toAudio } = require("./lib/converter");

const from = m.key.remoteJid;
const isGroup = from.endsWith("@g.us");
const upchUsage = require('./lib/database/upchUsage.json') || {};

const _cmd = JSON.parse(fs.readFileSync('./lib/database/command.json'));
const _cmdUser = JSON.parse(fs.readFileSync('./lib/database/commandUser.json'));
const { addCountCmd, getPosiCmdUser, addCountCmdUser } = require('./temporary/helpers/command');

const downloadFile = async (url, path) => {
  const response = await axios.get(url, { responseType: 'stream' });
  const writer = fs.createWriteStream(path);
  response.data.pipe(writer);
  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
};

const getFileTimestamp = async (filePath) => {
  try {
    const stats = await fs.promises.stat(filePath);
    return stats.mtimeMs;
  } catch (error) {
    return null;
  }
};

const isValidUrl = (url) => {
  try {
    new URL(url);
    return url.endsWith('.js');
  } catch (error) {
    return false;
  }
};
//=====================================//

// BASE
module.exports = Raol404 = async (Raol404, m, chatUpdate, store) => {
    try {
        var body = 
            (m.mtype === 'conversation') ? m.message.conversation :
            (m.mtype == 'imageMessage') ? m.message.imageMessage.caption :
            (m.mtype == 'videoMessage') ? m.message.videoMessage.caption :
            (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text :
            (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId :
            (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
            (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId :
            (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : '';

        var budy = (typeof m.text == 'string' ? m.text : '');
        var prefix = prefa ? /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : "" : prefa ?? global.prefix;

        const isCmd = body.startsWith(prefix);
        const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase();
        const args = body.trim().split(/ +/).slice(1);
        const pushname = m.pushName || "No Name";
        const text = q = args.join(" ");
        const fatkuns = (m.quoted || m);
        const quoted = 
            (fatkuns.mtype == 'buttonsMessage') ? fatkuns[Object.keys(fatkuns)[1]] :
            (fatkuns.mtype == 'templateMessage') ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]] :
            (fatkuns.mtype == 'product') ? fatkuns[Object.keys(fatkuns)[0]] :
            m.quoted ? m.quoted : m;

        const mime = (quoted.msg || quoted).mimetype || '';
        const qmsg = (quoted.msg || quoted);
        const isMedia = /image|video|sticker|audio/.test(mime);

        // USER
        var isAuthor = global.ownNumb.replace(/[^0-9]/g, '').includes(m.sender.split("@")[0]);
        const botNumber = await Raol404.decodeJid(Raol404.user.id);
        const globalelit = `${global.ownNumb}@s.whatsapp.net`;
        const isOwner = globalelit.includes(m.sender);
        const itsMe = m.sender == botNumber ? true : false;
        const isCreator = [botNumber, ...global.ownNumb]
          .map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net')
          .includes(m.sender);

        // GROUP
        let groupMetadata = null;
        let groupName = '';

        if (m.isGroup) {
          try {
            groupMetadata = await Raol404.groupMetadata(m.chat);
            groupName = groupMetadata?.subject || 'Unknown Group';
          } catch (error) {
            console.error('Failed to fetch group metadata:', error);
            groupName = 'Unknown Group';
          }
        }

        const participants = m.isGroup ? (groupMetadata?.participants || []) : [];
        const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : [];
        const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false;
        const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false;
        const groupOwner = m.isGroup && groupMetadata ? groupMetadata.owner : '';
        const isGroupOwner = m.isGroup ? (groupOwner ? groupOwner : groupAdmins).includes(m.sender) : false;

        // ACCESS

        // REACT
        const moji = ['📚', '💭', '💫', '🌌', '🌏', '〽️', '🌷', '🍁', '🪻'];
        const randomemoji = moji[Math.floor(Math.random() * moji.length)];

        // TIME
        const moment = require('moment-timezone');
        const time2 = moment().tz("Asia/Jakarta").format("HH:mm:ss");

        if (time2 < "19:00:00") {
          var ucapanWaktu = "Selamat Malam🌃";
        }
        if (time2 < "15:00:00") {
          var ucapanWaktu = "Selamat Sore🌄";
        }
        if (time2 < "11:00:00") {
          var ucapanWaktu = "Selamat Siang🏞️";
        }
        if (time2 < "06:00:00") {
          var ucapanWaktu = "Selamat Pagi🏙️";
        }
        if (time2 < "23:59:00") {
          var ucapanWaktu = "Selamat Subuh🌆";
        }

        const wib = moment(Date.now()).tz("Asia/Jakarta").locale("id").format("HH:mm:ss z");
        const wita = moment(Date.now()).tz("Asia/Makassar").locale("id").format("HH:mm:ss z");
        const wit = moment(Date.now()).tz("Asia/Jayapura").locale("id").format("HH:mm:ss z");
        const salam2 = moment(Date.now()).tz("Asia/Jakarta").locale("id").format("a");

        // STATUS
        if (!Raol404.public) {
          if (!m.key.fromMe) return;
        }

        try {
          ppuser = await Raol404.profilePictureUrl(m.sender, 'image');
        } catch (err) {
          ppuser = 'https://files.catbox.moe/j9k007.jpg';
        }
        ppnyauser = await getBuffer(ppuser);

        const reSize = async (buffer, ukur1, ukur2) => {
          return new Promise(async (resolve, reject) => {
            let jimp = require('jimp');
            var baper = await jimp.read(buffer);
            var ab = await baper.resize(ukur1, ukur2).getBufferAsync(jimp.MIME_JPEG);
            resolve(ab);
          });
        };

        const fkethmb = await reSize(ppuser, 300, 300);
        let jimp = require("jimp");

        const resize = async (image, width, height) => {
          const read = await jimp.read(image);
          const data = await read.resize(width, height).getBufferAsync(jimp.MIME_JPEG);
          return data;
        };

        const ftroli = { 
          key: { 
            remoteJid: '6285736178354-1625305606@g.us',
            participant: '6283822021601@s.whatsapp.net' 
          },
          message: { 
            orderMessage: { 
              itemCount: 2025,
              status: 1,
              thumbnail: fkethmb,
              surface: 1,
              message: "LatestURL | RaolProjects",
              orderTitle: "Raol404",
              sellerJid: '0@s.whatsapp.net' 
            } 
          } 
        };

        // PENGUBAH TEXT
        const Raol = (text, style = 1) => {
          const abc = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('');
          const raol = { 1: 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘqʀꜱᴛᴜᴠᴡxʏᴢ1234567890' };
          const replacer = [];

          abc.map((v, i) => replacer.push({
            original: v,
            convert: raol[style].split('')[i]
          }));

          return text.toLowerCase().split('').map((v) => {
            const find = replacer.find((x) => x.original == v);
            return find ? find.convert : v;
          }).join('');
        };

        // REPLY
        const reply = async (teks) => {
          const Thezy = {
            contextInfo: {
              forwardingScore: 20,
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterName: `LatestURL | RaolProjects`,
                newsletterJid: `120363378800202820@newsletter`,
              },
              externalAdReply: {
                showAdAttribution: true,
                title: `LatestURL | RaolProjects`,
                body: `${ucapanWaktu}`,
                thumbnailUrl: `https://files.catbox.moe/rrv9rt.jpg`,
                thumbnail: '',
                sourceUrl: 'https://whatsapp.com/channel/0029VazeUE92Jl8KuVcHIC46',
              },
            },
            text: teks,
          };

          return Raol404.sendMessage(m.chat, Thezy, {
            quoted: ftroli,
            ephemeralExpiration: 1,
          });
        };

        //=====================================//

        const pluginsLoader = async (directory) => {
          let plugins = [];
          const folders = fs.readdirSync(directory);

          folders.forEach(file => {
            const filePath = path.join(directory, file);

            if (filePath.endsWith(".js")) {
              try {
                const resolvedPath = require.resolve(filePath);
                if (require.cache[resolvedPath]) {
                  delete require.cache[resolvedPath];
                }
                const plugin = require(filePath);
                plugins.push(plugin);
              } catch (error) {
                console.log(`${filePath}:`, error);
              }
            }
          });

          return plugins;
        };

        const pluginsDisable = true;
        const plugins = await pluginsLoader(path.resolve(__dirname, "./plugins"));

        const plug = {
          Raol404,
          isOwner,
          command,
          isCmd,
          reply,
          addCountCmd,
          getPosiCmdUser,
          randomemoji,
          text,
          args,
          botNumber,
          pushname,
          isGroup: m.isGroup,
          isPrivate: !m.isGroup
        };

        for (let plugin of plugins) {
          if (plugin.command.find(e => e === command.toLowerCase())) {
            if (plugin.owner && !isOwner) {
              return reply(mess.owner);
            }
            if (plugin.premium && !isPremium) {
              return reply(mess.premium);
            }
            if (plugin.group && !plug.isGroup) {
              return reply(mess.ingroup);
            }
            if (plugin.private && !plug.isPrivate) {
              return reply(mess.private);
            }
            if (typeof plugin !== "function") return;
            await plugin(m, plug);
          }
        }

        if (!pluginsDisable) return;

        if (m.message) {
          if (isCmd && !m.isGroup) {
            console.log(chalk.black(chalk.bgHex('#ff5e78').bold(`\n🌟 ${ucapanWaktu} 🌟`)));
            console.log(chalk.white(chalk.bgHex('#4a69bd').bold(`🚀 There is a new message ! �`)));
            console.log(chalk.black(chalk.bgHex('#fdcb6e')(`📅 DATE: ${new Date().toLocaleString()}
💬 MESSAGE: ${m.body || m.mtype}
🗣️ SENDERNAME: ${pushname}
👤 JIDS: ${m.sender}`)));
          } else if (m.isGroup) {
            console.log(chalk.black(chalk.bgHex('#ff5e78').bold(`\n🌟 ${ucapanWaktu} 🌟`)));
            console.log(chalk.white(chalk.bgHex('#4a69bd').bold(`🚀 There is a new message! �`)));
            console.log(chalk.black(chalk.bgHex('#fdcb6e')(`📅 DATE: ${new Date().toLocaleString()}
💬 MESSAGE: ${m.body || m.mtype}
🗣️ SENDERNAME: ${pushname}
👤 JIDS: ${m.sender}
🔍 MESS LOCATION: ${groupName}`)));
          }
        }

//=====================================//
        switch (command) {
//=====================================//
case "menu": case "help": {
    Raol404.sendMessage(m.chat, { react: { text: `${randomemoji}`, key: m.key }});
    addCountCmd('#menu', m.sender, _cmd);

    const owned = global.ownNumb + "@s.whatsapp.net";

    const botInfo = {
        status: Raol404.public ? "Public Mode" : "Self Mode",
        version: "3.1.0",
        uptime: runtime(process.uptime())
    };

    const newsletterInfo = {
        newsletterName: "LatestURL | RaolProjects",
        newsletterJid: "120363378800202820@newsletter",
        thumbnailUrl: 'https://github.com/latesturl/dbRaolProjects/raw/refs/heads/main/media/menu.jpg',
        sourceUrl: 'https://whatsapp.com/channel/0029VazeUE92Jl8KuVcHIC46'
    };

    await Raol404.sendMessage(m.chat, {
        video: { url: 'https://github.com/latesturl/dbRaolProjects/raw/refs/heads/main/media/menuv2.mp4' },
        gifPlayback: true,
        caption: `Halo kak *${pushname}*, ini adalah menu bot!\n\n` +
                 `─ Waktu: *${ucapanWaktu}*\n` +
                 `─ Runtime: *${botInfo.uptime}*\n` +
                 `─ Status: *${botInfo.status}*\n` +
                 `─ Versi Bot: *${botInfo.version}*\n\n` +
                 `To see the full features, type:\n` +
                 `- *.allmenu*\n`,
        footer: `Powered by Raol404`,
        contextInfo: {
            mentionedJid: [m.sender, owned],
            forwardingScore: 0,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterName: newsletterInfo.newsletterName,
                newsletterJid: newsletterInfo.newsletterJid,
            },
            externalAdReply: {
                showAdAttribution: true,
                title: "Your Bot Name",
                body: "Your Bot Description",
                thumbnailUrl: newsletterInfo.thumbnailUrl,
                sourceUrl: newsletterInfo.sourceUrl,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: ftroli });

    await Raol404.sendMessage(m.chat, {
        audio: fs.readFileSync("./temporary/media/audio.mp3"),
        mimetype: 'audio/mp4',
        ptt: true
    }, { quoted: ftroli });
}
break;

//=====================================//
  case 'public': {
    if (!isCreator) return reply('*owner only*');
    Raol404.sendMessage(m.chat, { react: { text: `${randomemoji}`, key: m.key }});
    Raol404.public = true;
    reply('succes');
    break;
  }

  case 'self': {
    if (!isCreator) return reply('*owner only*');
    Raol404.sendMessage(m.chat, { react: { text: `${randomemoji}`, key: m.key }});
    Raol404.public = false;
    reply('succes');
    break;
  }
//=====================================//
  case 'restart': {
    if (!isCreator) return reply(mess.owner);
    reply(`Restarting will be completed in seconds`);
    await sleep(3000);
    process.exit();
    break;
  }
//=====================================//
  case 'update': {
    if (!isCreator) return reply(mess.owner);

    const defaultIndexUrl = 'https://raw.githubusercontent.com/latesturl/RaolProjects/refs/heads/master/index.js';
    const defaultCaseUrl = 'https://raw.githubusercontent.com/latesturl/RaolProjects/refs/heads/master/case.js';

    if (!args[0]) {
      try {
        const localIndexTimestamp = await getFileTimestamp('./index.js');
        const localCaseTimestamp = await getFileTimestamp('./case.js');

        const remoteIndexResponse = await axios.head(defaultIndexUrl);
        const remoteCaseResponse = await axios.head(defaultCaseUrl);

        const remoteIndexTime = new Date(remoteIndexResponse.headers['last-modified']).getTime();
        const remoteCaseTime = new Date(remoteCaseResponse.headers['last-modified']).getTime();

        if (localIndexTimestamp >= remoteIndexTime && localCaseTimestamp >= remoteCaseTime) {
          return reply('All files are already up-to-date.');
        }

        await downloadFile(defaultIndexUrl, './index.js');
        await downloadFile(defaultCaseUrl, './case.js');
        reply('Successfully updated all files! Restarting...');
        await sleep(3000);
        process.exit(0);
      } catch (error) {
        reply('Failed to update default: ' + error.message);
      }
      break;
    }

    const inputUrl = args[0];
    if (!isValidUrl(inputUrl)) {
      return reply('Invalid URL format! Example: https://example.com/index.js');
    }

    const targetFile = inputUrl.includes('index.js') ? 'index.js' : 
                       inputUrl.includes('case.js') ? 'case.js' : 
                       null;

    if (!targetFile) {
      return reply('URL must point to index.js or case.js!');
    }

    try {
      const localTime = await getFileTimestamp(`./${targetFile}`);
      const remoteResponse = await axios.head(inputUrl);
      const remoteTime = new Date(remoteResponse.headers['last-modified']).getTime();

      if (localTime >= remoteTime) {
        return reply(`File ${targetFile} is already the latest version.`);
      }

      await downloadFile(inputUrl, `./${targetFile}`);
      reply(`Successfully updated ${targetFile}! Restarting...`);
      await sleep(3000);
      process.exit(0);
    } catch (error) {
      reply(`Failed to update ${targetFile}: ` + error.message);
    }
    break;
  }
  case 'donate': {
    if (!isCmd) return; // Pastikan ini adalah command

    // Validasi input
    if (args.length < 3) {
        return reply('Format salah! Contoh: .donate <jumlah> <nama> <pesan>');
    }

    const amount = parseInt(args[0]);
    const name = args[1];
    const message = args.slice(2).join(' ');

    if (isNaN(amount) || amount < 1000) {
        return reply('Jumlah donasi minimal Rp 1.000');
    }

    // Gunakan email dan password dari env atau config
    const email = 'latesturltech@gmail.com'; // Ganti dengan email Saweria Anda
    const password = 'LatestURLTech12345678'; // Ganti dengan password Saweria Anda

    try {
        // Login ke Saweria
        const loginResponse = await login(email, password);
        if (loginResponse.error) {
            return reply('Gagal login ke Saweria: ' + loginResponse.error);
        }

        // Buat pembayaran
        const paymentResponse = await createPayment(loginResponse.user_id, amount, name, email, message);
        if (paymentResponse.error) {
            return reply('Gagal membuat pembayaran: ' + paymentResponse.error);
        }

        // Kirim pesan konfirmasi
        const paymentUrl = paymentResponse.payment_url; // URL pembayaran dari Saweria
        await reply(`Terima kasih atas donasinya! Silakan lanjutkan pembayaran di: ${paymentUrl}`);
    } catch (error) {
        console.error('Error in donate command:', error);
        reply('Terjadi kesalahan saat memproses donasi. Silakan coba lagi.');
    }

    break;
}
//=====================================//
  default: {
    if (budy.startsWith('=>')) {
      if (!isCreator) return reply(mess.owner);

      function Return(sul) {
        let sat = JSON.stringify(sul, null, 2);
        let bang = util.format(sat);
        if (sat == undefined) {
          bang = util.format(sul);
        }
        return reply(bang);
      }

      try {
        reply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)));
      } catch (e) {
        reply(String(e));
      }
    }

    if (budy.startsWith('>')) {
      if (!isCreator) return;
      try {
        let evaled = await eval(budy.slice(2));
        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
        await reply(evaled);
      } catch (err) {
        await reply(String(err));
      }
    }

    if (budy.startsWith('$')) {
      if (!isOwner) return;
      require("child_process").exec(budy.slice(2), (err, stdout) => {
        if (err) return reply(`${err}`);
        if (stdout) return reply(stdout);
      });
    }
  }
}
    } catch (err) {
        const errId = `${global.ownNumb}@s.whatsapp.net`;
        Raol404.sendMessage(errId, { text: require('util').format(err) }, { quoted: m });
        console.log('\x1b[1;31m' + err + '\x1b[0m');
    }
};





// Auto Clear Session System
function autoClearSession() {
    const sessionDir = './session'; // Sesuaikan dengan path session
    const clearInterval = 2 * 60 * 60 * 1000; // 2 jam dalam milidetik
    
    setInterval(async () => {
        try {
            const files = fs.readdirSync(sessionDir);
            const filteredFiles = files.filter(file => 
                file.startsWith('pre-key') ||
                file.startsWith('sender-key') ||
                file.startsWith('session-') ||
                file.startsWith('app-state')
            );

            if (filteredFiles.length === 0) return;

            console.log(chalk.yellow('[AUTO CLEAN] Starting auto session cleanup...'));
            
            filteredFiles.forEach(file => {
                fs.unlinkSync(path.join(sessionDir, file));
            });

            console.log(chalk.green(`[AUTO CLEAN] Removed ${filteredFiles.length} session files`));
        } catch (error) {
            console.error(chalk.red('[AUTO CLEAN ERROR]'), error);
        }
    }, clearInterval);
}

// Jalankan saat panel start
autoClearSession();

// JANGAN UBAH KODE DI BAWAH INI
let file = require.resolve(__filename);
require('fs').watchFile(file, () => {
    require('fs').unwatchFile(file);
    console.log(`\x1b[0;32m${__filename} \x1b[1;32mupdated!\x1b[0m`);
    delete require.cache[file];
    require(file);
});