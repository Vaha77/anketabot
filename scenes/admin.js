const bot = require("../core/bot")
const { Scenes, Markup } = require("telegraf");
const Users = require("../models/users");
const admin = new Scenes.BaseScene("admin");

admin.enter(ctx => {
    let txt = `Assalomu aleykum  <b>${ctx.from.first_name}</b> siz <b>Adminlik</b> huquqiga egasiz!`;
    ctx.replyWithHTML(txt, {
        ...Markup.keyboard([
            ["Xabar yuborish"],
            ["Foydalanuvchilar", "Adminlar"],
            ["Ikkinchi bosqichga o'tkazish"]
        ]).resize()
    })
})

admin.hears("Xabar yuborish", async ctx => {
    let txt = `Foydalanuvchilarga Xabar yuborish turini tanlang👇`;
    ctx.replyWithHTML(txt, {
        ...Markup.keyboard([
            ["Barchaga", "Bir kishiga"]
        ]).resize()
    })
})

admin.hears("Barchaga",ctx=>ctx.scene.enter("allSendMessage"));
admin.hears("Bir kishiga",ctx=>ctx.scene.enter("oneSendMessage"));
admin.hears("Ikkinchi bosqichga o'tkazish",ctx=>ctx.scene.enter("adminSendsetup2"));


const allSendMessage = new Scenes.WizardScene(
    "allSendMessage",
    async ctx => {
      let txt = `Xabar yuboring🔽`;
      await ctx.reply(txt);
      return ctx.wizard.next();

    },

async (ctx) => {
 if(!ctx.message && !ctx.message.text) return ctx.reply("Xabar turi matn bo'lish kerak!");
 let msg  =  ctx.message.text;
 const users = await Users.find({isAdmin:false});
 users.forEach(async user => {
  await ctx.telegram.sendMessage(user.user_id,msg);
 });

 let txt = `<b>Xabaringiz Foydalanuvchilarga yuborildi ✅</b>`;

ctx.replyWithHTML(txt, {
    ...Markup.keyboard([
        ["🏠 Bosh menu"]
    ]).resize()
});

},

);


const oneSendMessage = new Scenes.WizardScene(
"oneSendMessage",
async ctx => {
    ctx.wizard.state.user = {};
    let txt = `Bir kishiga xabar yuborish uchun foydalanuvchini <b>user_id</b> raqamini yuboring!`;
    await ctx.replyWithHTML(txt);
    return ctx.wizard.next();
},

async ctx => {
    if(!ctx.message && !ctx.message.text) return ctx.reply("Xabar turi matn bo'lish kerak!");
    ctx.wizard.state.user.user_id =  ctx.message.text;
    const user = await Users.findOne(
        {user_id:ctx.message.text}
    );

    if(!user) return ctx.reply("bunday foydalanuvchi mavjud emas!");

    ctx.wizard.state.user = user;
    let txt = `<b>${user.first_name}</b> ga Xabar yuboring🔽`;
    await ctx.replyWithHTML(txt);
    return ctx.wizard.next();
},

async ctx => {
if(!ctx.message && !ctx.message.text) return ctx.reply("Xabar turi matn bo'lish kerak!");
  const msg = ctx.message.text;
  const {user_id, first_name} = ctx.wizard.state.user;
 await ctx.telegram.sendMessage(user_id,msg);
let txt = `Xabaringiz <b>${first_name}</b> ga yuborildi ✅`;
  
 await ctx.replyWithHTML(txt, {
      ...Markup.keyboard([
          ["🏠 Bosh menu"]
      ]).resize()
  });
  
  
  
}

);


admin.hears("Foydalanuvchilar", async ctx => {
    const users = await Users.find();
    if(!users) return ctx.reply("foydalanuvchilar topilmadi!");
    users.forEach((user,index) => {
    let txt = `📝 <b>Foydalanuvchilar</b>\n
    🆔 User_id: <b>${user.user_id}</b>
    👤 Ishchi: <b>${user.first_name}</b>
    👤 Username: <b>${user.username}</b>
    📞 Telefon: <b>${user.phone}</b>
    `;
        ctx.replyWithHTML(txt)
    });
})

const adminSendsetup2 = new Scenes.WizardScene(
    "adminSendsetup2",
    async ctx => {
      if(!ctx.message && !ctx.message.text) return;
    let txt = ` Foydalanuvchini ikkinchi etabga o'tkazish uchun <b>user_id</b> raqamini yuboring!`;
    await ctx.replyWithHTML(txt)
    await ctx.wizard.next();
},

async ctx => {
    ctx.wizard.state.user = {};
    if(!ctx.message && ctx.message.text) return;
    const user_id = ctx.message.text;
    const user = await Users.findOne({user_id});
    if(!user) return ctx.reply("bunday foydalanuvchi topilmadi");
    ctx.wizard.state.user = user;
    let txt = `<b>${user.first_name}</b> ga ikkichi Bosqich yuborilsinmi ?`;
    await ctx.replyWithHTML(txt,{
        ...Markup.inlineKeyboard([
           Markup.button.callback("O'tkazish","setup3_next")
        ])
    });
    return ctx.wizard.next();
},

async ctx => {
if(!ctx.callbackQuery && ctx.callbackQuery.data !== "setup3_next") return;
await ctx.deleteMessage();
const {user_id, first_name } = ctx.wizard.state.user;
console.log(user_id)
let txt = `Assalomu aleykum <b>${first_name}</b>
siz birinchi Savollardan muofiqiyatli tarzda ro'yhatdan 
o'tdingiz <b>Sizdan ikkichi bosqichdan</b> o'tishingizni so'raymiz.
`;
  await ctx.telegram.sendMessage(user_id, txt, {
        parse_mode:"HTML",
        ...Markup.inlineKeyboard([
            Markup.button.callback("Ikkinchi bosqichdan o'tish","start_setup2")
        ])
    });
    txt = `${first_name}ga Savollar yuborildi`;
    await ctx.replyWithHTML(txt);
   return await ctx.scene.leave();

}


);


oneSendMessage.command("/start", ctx => ctx.scene.enter("start"))
oneSendMessage.hears("🏠 Bosh menu", ctx => ctx.scene.enter("start"))

allSendMessage.command("/start", ctx => ctx.scene.enter("start"))
allSendMessage.hears("🏠 Bosh menu", ctx => ctx.scene.enter("start"));


admin.hears("Adminlar", async ctx => {
    const admins = await Users.find({isAdmin:false})
    let txt = ``;
    admins.forEach((admin,index)=> {
        txt += `<b>${admin.first_name}</b> <i>${admin.user_id}</i>\n`;
    })

    ctx.replyWithHTML(txt);

})

module.exports = {
    admin,
    allSendMessage,
    oneSendMessage,
    adminSendsetup2
};