const {Telegraf, session} = require("telegraf");
require("dotenv").config(); 
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const connection = require("../DB");
connection();


// const HttpsProxyAgent = require("https-proxy-agent");
const bot = new Telegraf(process.env.BOT_TOKEN
// ,{
//    telegram:{
//     agent:HttpsProxyAgent("http://127.0.0.1:58482")
//    }
// }
)

const stage = require("../scenes");

bot.use(session());
bot.use(stage.middleware())

bot.start(ctx => ctx.scene.enter("start"));
bot.action("start_setup2", async ctx => {
  return ctx.scene.enter("setup2");
})
bot.launch();
module.exports = bot;