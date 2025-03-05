const {readEnv} = require('../lib/database')
const { cmd } = require('../command')
const os = require("os")
const { runtime } = require('../lib/functions')

cmd({
    pattern: "menu",
    alias: ["list"],
    desc: "Displays the bot menu",
    react: "📜",
    category: "main"
},
async (conn, mek, m, { from, pushname, reply }) => {
    try {
        const config = await readEnv();
        let desc = `
🤩 *HELLOW* ${pushname}
> 🪀 WELLCOME TO DEW-MD 🪀

╭──────────────────━┈⊷
│◦ ✗🤖BOT NAME : DEW-MD™
│◦ ✗👤OWNER NAME : HANSA
│◦ ✗☎ᴏᴡɴᴇʀ ɴᴜᴍʙᴇʀ :
│◦ ✗ 94701515609
│◦ ✗⏰ᴜᴘᴛɪᴍᴇ : ${runtime(process.uptime())}
│◦ ✗💾ʀᴀᴍ : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(os.totalmem() / 1024 / 1024)}MB
│◦ ✗💫ᴘʀᴇғɪx : ${config.PREFIX}
╰──────────────────━┈⊷

> 🔢 ʀᴇᴘʟʏ ᴛʜᴇ ɴᴜᴍʙᴇʀ ʙᴇʟᴏᴡ🗿

1 │❯❯◦ OWNER MENU
2 │❯❯◦ CONVERT MENU MOVIE MENU
3 │❯❯◦ AI MENU
4 │❯❯◦ SEARCH MENU
5 │❯❯◦ DOWNLOAD MENU
6 │❯❯◦ MAIN MENU
7 │❯❯◦ GROUP MENU
8 │❯❯◦ FUN MENU
9 │❯❯◦ TOOLS MENU
10 │❯❯◦ OTHER MENU


*${config.COPYRIGHT}*`;

        // Send the menu with an image
        const menuMessage = await conn.sendMessage(from, { 
            image: { url: config.ALIVE_IMG }, 
            caption: desc 
        }, { quoted: mek });

        // Listen for the reply
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;
            
            const selectedOption = msg.message.extendedTextMessage.text.trim();

            // Check if the reply is in response to the menu message
            if (msg.message.extendedTextMessage.contextInfo?.stanzaId === menuMessage.key.id) {
                let response = "";

                switch (selectedOption) {
                    case '1':
                        response = `*◈ OWNER COMMAND LIST ◈*\n\n╭────────●●►\n│ • *restart*\n╰────────────────────●●►\n\n⭓ *Total Commands: 1*`;
                        break;
                    case '2':
                        response = `*◈ CONVERT COMMAND LIST ◈*\n\n╭────────●●►\n│ • *convert*\n╰────────────────────●●►\n\n⭓ *Total Commands: 1*`;
                        break;
                    case '3':
                        response = `*◈ AI COMMAND LIST ◈*\n\n╭────────●●►\n│ • *ai*\n╰────────────────────●●►\n\n⭓ *Total Commands: 1*`;
                        break;
                    case '4':
                        response = `*◈ SEARCH COMMAND LIST ◈*\n\n╭────────●●►\n│ • *yts*\n│ • *srepo*\n╰────────────────────●●►\n\n⭓ *Total Commands: 2*`;
                        break;
                    case '5':
                        response = `*◈ DOWNLOAD COMMAND LIST ◈*\n\n╭────────●●►\n│ • *apk*\n│ • *twitter*\n│ • *gdrive*\n│ • *mediafire*\n│ • *fb*\n│ • *ig*\n│ • *movie*\n│ • *song*\n│ • *video*\n│ • *play/yt*\n│ • *song2*\n│ • *video2*\n│ • *tiktok*\n│ • *img*\n╰────────────────────●●►\n\n⭓ *Total Commands: 14*`;
                        break;
                    case '6':
                        response = `*◈ MAIN COMMAND LIST ◈*\n\n╭────────●●►\n│ • *alive*\n│ • *about*\n│ • *menu*\n│ • *allmenu*\n│ • *support*\n│ • *system*\n│ • *ping*\n│ • *runtime*\n╰────────────────────●●►\n\n⭓ *Total Commands: 8*`;
                        break;
                    case '7':
                        response = `*◈ GROUP COMMAND LIST ◈*\n\n╭────────●●►\n│ • *promote*\n│ • *demote*\n│ • *kick*\n│ • *add*\n│ • *admins*\n│ • *tagall*\n│ • *getpic*\n│ • *setwelcome*\n│ • *setgoodbye*\n│ • *gname*\n╰────────────────────●●►\n\n⭓ *Total Commands: 10*`;
                        break;
                    case '8':
                        response = `*◈ FUN COMMAND LIST ◈*\n\n╭────────●●►\n│ • *dog*\n│ • *fact*\n│ • *hack*\n│ • *quote*\n╰────────────────────●●►\n\n⭓ *Total Commands: 4*`;
                        break;
                    case '9':
                        response = `*◈ TOOLS COMMAND LIST ◈*\n\n╭────────●●►\n│ • *sticker*\n│ • *toimg*\n│ • *tomp3*\n│ • *qrcode*\n│ • *shortlink*\n│ • *calc*\n╰────────────────────●●►\n\n⭓ *Total Commands: 6*`;
                        break;
                    case '10':
                        response = `*◈ OTHER COMMAND LIST ◈*\n\n╭────────●●►\n│ • *githubstalk*\n│ • *trt*\n│ • *weather*\n╰────────────────────●●►\n\n⭓ *Total Commands: 3*`;
                        break;
                    default:
                        response = "❌ *Invalid option. Please select a valid number.*";
                }

                await conn.sendMessage(from, { text: response }, { quoted: msg });
            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply('⚠️ *An error occurred while processing your request.*');
    }
});
