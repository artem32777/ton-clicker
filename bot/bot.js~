import { Telegraf, Markup } from 'telegraf'

console.log(import.meta.env);

const token = '7397394315:AAHqDNsQQjbCdt3on2-CWucHMLKEKaXHkaw'
const webAppUrl = 'https://ton-pet-clicker.web.app/'

const bot = new Telegraf(token)

bot.command('start', (ctx) => {
  ctx.reply(
    `Hello - ${ctx.payload}`,
    Markup.inlineKeyboard([
      Markup.button.webApp('Open app', `${webAppUrl}?ref=${ctx.payload}`),
    ]),
  )
})

bot.launch()
