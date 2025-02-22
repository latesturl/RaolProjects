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
case 'ping': {
    const used = process.memoryUsage();
    const cpus = os.cpus().map(cpu => {
        cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0);
        return cpu;
    });

    const cpu = cpus.reduce((last, cpu, _, { length }) => {
        last.total += cpu.total;
        last.speed += cpu.speed / length;
        last.times.user += cpu.times.user;
        last.times.nice += cpu.times.nice;
        last.times.sys += cpu.times.sys;
        last.times.idle += cpu.times.idle;
        last.times.irq += cpu.times.irq;
        return last;
    }, {
        speed: 0,
        total: 0,
        times: {
            user: 0,
            nice: 0,
            sys: 0,
            idle: 0,
            irq: 0
        }
    });

    let timestamp = speed();
    let latensi = speed() - timestamp;
    let neww = performance.now();
    let oldd = performance.now();
    let respon = Raol(`
Response Speed ${latensi.toFixed(4)} _Second_\n${oldd - neww} _miliseconds_\n\nRuntime: ${runtime(process.uptime())}

💻 Info Server
RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}

_NodeJS Memory Usage_
${Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v => v.length)), ' ')}: ${formatp(used[key])}`).join('\n')}

${cpus[0] ? `_Total CPU Usage_
${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}
_CPU Core(s) Usage (${cpus.length} Core CPU)_
${cpus.map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}`).join('\n\n')}` : ''}
    `.trim());

    Raol404.relayMessage(m.chat, {
        requestPaymentMessage: {
            currencyCodeIso4217: 'USD',
            amount1000: 50000,
            requestFrom: m.sender,
            noteMessage: {
                extendedTextMessage: {
                    text: respon,
                    contextInfo: {
                        externalAdReply: {
                            showAdAttribution: true
                        }
                    }
                }
            }
        }
    }, {});
    break;
}
//============= OWNER MENU =============//
case 'get': {
  if (!isOwner) return reply('*Owner only*');
  if (!text) return reply('Awali *URL* dengan http:// atau https://');

  try {
    const gt = await axios.get(text, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Referer": "https://www.google.com/",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
      },
      responseType: 'arraybuffer'
    });

    const contentType = gt.headers['content-type'];
    console.log(`Content-Type: ${contentType}`);

    if (/json/i.test(contentType)) {
      const jsonData = JSON.parse(Buffer.from(gt.data, 'binary').toString('utf8'));
      return reply(JSON.stringify(jsonData, null, 2));
    } else if (/text/i.test(contentType)) {
      const textData = Buffer.from(gt.data, 'binary').toString('utf8');
      return reply(textData);
    } else if (text.includes('webp')) {
      return Raol404.imgToSticker(m.chat, text, m, { packname: "", author: "Hann Universe!!" });
    } else if (/image/i.test(contentType)) {
      return Raol404.sendMessage(m.chat, { image: { url: text }}, { quoted: m });
    } else if (/video/i.test(contentType)) {
      return Raol404.sendMessage(m.chat, { video: { url: text }}, { quoted: m });
    } else if (/audio/i.test(contentType) || text.includes(".mp3")) {
      return Raol404.sendMessage(m.chat, { audio: { url: text }}, { quoted: m });
    } else if (/application\/zip/i.test(contentType) || /application\/x-zip-compressed/i.test(contentType)) {
      return Raol404.sendFile(m.chat, text, '', text, m);
    } else if (/application\/pdf/i.test(contentType)) {
      return Raol404.sendFile(m.chat, text, '', text, m);
    } else {
      return reply(`MIME : ${contentType}\n\n${gt.data}`);
    }
  } catch (error) {
    console.error(`Terjadi kesalahan: ${error}`);
    return reply(`Terjadi kesalahan saat mengakses URL: ${error.message}`);
  }
}
break;
case 'getcase': {
  if (!isOwner) return reply(mess.owner);

  try {
    const getCase = (cases) => {
      const fileContent = fs.readFileSync("case.js").toString();
      const caseStart = fileContent.split('case \'' + cases + '\'')[1];
      if (!caseStart) throw new Error("Case not found");
      return "case" + `'${cases}'` + caseStart.split("break")[0] + "break";
    };

    if (!q) return reply('Please enter the case name you want to retrieve!');
    const raolgetcase = `${getCase(q)}`;
    await reply(`${raolgetcase}`);
  } catch (error) {
    reply(`Case ${q} does not exist in the directory!`);
  }
}
break;
case "swgc": {
    if (!isCreator) return reply('*owner only*');

    let media = null;
    let options = {};
    const jids = [m.sender, m.chat];

    if (quoted) {
        const mime = quoted.mtype || quoted.mediaType;
        if (mime.includes('image')) {
            media = await m.quoted.download();
            options = {
                image: media,
                caption: text || '',
            };
        } else if (mime.includes('video')) {
            media = await m.quoted.download();
            options = {
                video: media,
                caption: text || '',
            };
        } else if (mime.includes('audio')) {
            media = await m.quoted.download();
            options = {
                audio: media,
            };
        } else {
            if (!text) return reply("Text is required for text-only status.");
            options = {
                text: text,
            };
        }
    } else {
        if (!text) return reply("Text is required for text-only status.");
        options = {
            text: text,
        };
    }

    const backgroundColors = [
        "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF", "#FFA500", "#800080", "#008000", "#000080",
        "#800000", "#008080", "#808000", "#FF4500", "#DA70D6", "#FFD700", "#7CFC00", "#40E0D0", "#FF6347", "#8A2BE2",
        "#DC143C", "#00CED1", "#FF8C00", "#9932CC", "#8B0000", "#2E8B57", "#DAA520", "#FF69B4", "#1E90FF", "#B22222",
        "#228B22", "#4B0082", "#FF1493", "#00BFFF", "#696969", "#FF7F50", "#6A5ACD", "#20B2AA", "#F08080", "#7B68EE",
        "#00FA9A", "#FF00FF", "#3CB371", "#8B008B", "#FFDAB9", "#0000CD", "#BA55D3", "#9370DB", "#00FF7F", "#7FFF00",
        "#D2691E", "#8FBC8F", "#483D8B", "#2F4F4F", "#556B2F", "#CD853F", "#6495ED", "#FFDEAD", "#00008B", "#B8860B"
    ];

    const randomColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];

    try {
        await Raol404.sendMessage("status@broadcast", options, {
            backgroundColor: randomColor,
            textArgb: 0xffffffff,
            font: 1,
            statusJidList: await (await Raol404.groupMetadata(m.chat)).participants.map((a) => a.id),
            additionalNodes: [
                {
                    tag: "meta",
                    attrs: {},
                    content: [
                        {
                            tag: "mentioned_users",
                            attrs: {},
                            content: jids.map((jid) => ({
                                tag: "to",
                                attrs: { jid: m.chat },
                                content: undefined,
                            })),
                        },
                    ],
                },
            ],
        });

        reply("Status sent successfully!");
    } catch (error) {
        reply("Failed to send status. Please try again.");
        console.error("Error sending status:", error);
    }
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
      if (!isCreator) return;
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