require('dotenv').config();
const Discord = require('discord.js');
const axios = require('axios');
const TOKEN = process.env.TOKEN;
const bot = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

const targets = ['sad', 'angry', 'unhappy', 'miserable', 'down'];

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}`);
});

bot.on('message', (msg) => {
  if (msg.author.bot) return;

  const foundWord = targets.find((target) => msg.content.includes(target));
  if (foundWord) {
    axios.get('https://type.fit/api/quotes').then((response) => {
      const randomQuote =
        response.data[Math.floor(Math.random() * response.data.length)];

      msg.channel.send(
        `Don't be ${foundWord}\n${randomQuote.author} once said:\n${randomQuote.text}`
      );
    });
  }
});


const http = require('http');
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World!\n')
});

server.listen(3000, () => {
  console.log("Server running!");
})
