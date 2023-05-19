const { Telegraf, Markup } = require("telegraf");
const { message } = require("telegraf/filters");
require("dotenv").config();
const text = require("./consts");
const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) =>
  ctx.reply(
    `Hello , ${
      ctx.message.from.first_name ? ctx.message.from.first_name : "user"
    }`
  )
);
bot.help((ctx) => ctx.reply(text.commands));

bot.command("course", async (ctx) => {
  try {
    await ctx.replyWithHTML(
      "<b>Title for content </b>",
      Markup.inlineKeyboard([
        [
          Markup.button.callback("Redactors", "btn_1"),
          Markup.button.callback("Reviews", "btn_2"),
          Markup.button.callback("Java Script", "btn_3"),
        ],
        [Markup.button.callback("HTML", "btn_4")],
        [Markup.button.callback("CSS", "btn_5")],
      ])
    );
  } catch (error) {
    console.log(error, "error while COURSE");
  }
});
// обработчик для любой кнопки с параметрами : имя кнопки, путь изображения, текст описание
function addActionBot(name, src, text) {
  bot.action(name, async (ctx) => {
    try {
      // при нажатии на кнопку заливка кнопки исчезнет
      await ctx.answerCbQuery();
      if (src !== false) {
        await ctx.replyWithPhoto({
          source: src,
        });
      }
      await ctx.replyWithHTML(text, {
        // превью интернет страницы
        disable_web_page_preview: true,
      });
    } catch (error) {
      console.log(error, `error while ${name}`);
    }
  });
}
addActionBot("btn_1", "./img/1.jpg", text.text1);
addActionBot("btn_2", "./img/2.jpg", text.text2);
addActionBot("btn_3", "", text.text3);
bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

//
//

// // обработка отдельной кнопки
// bot.action("btn_1", async (ctx) => {
//   try {
//     // при нажатии на кнопку заливка кнопки исчезнет
//     await ctx.answerCbQuery();
//     await ctx.replyWithHTML("choise btn_1", {
//       // превью интернет страницы
//       disable_web_page_preview: true,
//     });
//   } catch (error) {
//     console.log(error, "error while btn_1");
//   }
// });
