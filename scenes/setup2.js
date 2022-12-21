const { Scenes, Markup } = require("telegraf");
const User = require("../models/users")
const setup2 = new Scenes.WizardScene(
    "setup2",
    async (ctx) => {
        if (!ctx.callbackQuery) return;
        ctx.wizard.state.user = {};
        let txt = `Shaxsiy rivojlanish bilan shug'ilanganmisiz va nima o'rgandingiz ?`;
        await ctx.reply(txt);
        return ctx.wizard.next();
    },


    async (ctx) => {
        if(!ctx.message) return;
        ctx.wizard.state.user.quiz1 = ctx.message.text;
        let txt = `Qaysi chet tillarini bilasiz va kampyuter savodxonligi qanday ?`;
        await ctx.replyWithHTML(txt);
        return ctx.wizard.next();

    },

    async (ctx) => {
        if(!ctx.message) return;
        ctx.wizard.state.user.quiz2 = ctx.message.text;
        let txt = `Bosh vaqtdagi mashg'ulotdingiz ?`;
        await ctx.replyWithHTML(txt);
        return ctx.wizard.next()
    },

    
    async (ctx) => {
        if(!ctx.message) return;
        ctx.wizard.state.user.quiz3 = ctx.message.text;
        let txt = `Operatorlikni kelajakda ham davom etirib kasbiy rivojlanish niyatingiz bormi ?`;
        await ctx.replyWithHTML(txt);
        return ctx.wizard.next()
    },

    
    async (ctx) => {
        if(!ctx.message) return;
        ctx.wizard.state.user.quiz4 = ctx.message.text;
        let txt = `Yangi ishga moslashuv jarayoningiz qancha muddat oladi ?`;
        await ctx.replyWithHTML(txt);
        return ctx.wizard.next()
    },

    
    async (ctx) => {
        if(!ctx.message) return;
        ctx.wizard.state.user.quiz5 = ctx.message.text;
        let txt = `E'tirozlarga chidamlilik bo'yicha o'ziningizni 10 ballik sistemada baholang`;
        await ctx.replyWithHTML(txt);
        return ctx.wizard.next()
    },


    
    async (ctx) => {
        if(!ctx.message) return;
        ctx.wizard.state.user.quiz6 = ctx.message.text;
        let txt = `Oxirgi ishlagan joyingiz va ketish sabablari ?`;
        await ctx.replyWithHTML(txt);
        return ctx.wizard.next()
    },


    
    async (ctx) => {
        if(!ctx.message) return;
        ctx.wizard.state.user.quiz7 = ctx.message.text;
        let txt = `Qanday mahsulot xizmat turini sotgansiz ?`;
        await ctx.replyWithHTML(txt);
        return ctx.wizard.next()
    },

    
    async (ctx) => {
        if(!ctx.message) return;
        ctx.wizard.state.user.quiz8 = ctx.message.text;
        let txt = `Yangi bilimlarni qanchalik tez o'rgana olasiz ?`;
        await ctx.replyWithHTML(txt);
        return ctx.wizard.next()
    },

    
    async (ctx) => {
        if(!ctx.message) return;
        ctx.wizard.state.user.quiz9 = ctx.message.text;
        let txt = `Nutqingiz va tallaffuzingiz haqida ?`;
        await ctx.replyWithHTML(txt);
        return ctx.wizard.next()
    },

    async (ctx) => {
        if(!ctx.message) return;
        ctx.wizard.state.user.quiz10 = ctx.message.text;
        let txt = `Oxirgi ish joyingizdagi maoshingiz ?`;
        await ctx.replyWithHTML(txt);
        return ctx.wizard.next()
    },

    async (ctx) => {
        if(!ctx.message) return;
        ctx.wizard.state.user.quiz11 = ctx.message.text;
        let txt = `Hozirda kutayotgan oylik maoshingiz ?`;
        await ctx.replyWithHTML(txt);
        return ctx.wizard.next()
    },



    async (ctx) => {
        if(!ctx.message) return;
        ctx.wizard.state.user.quiz12 = ctx.message.text;
        let txt = `Bir joyda qancha mudadat ishlay olasiz ?`;
        await ctx.replyWithHTML(txt);
        return ctx.wizard.next()
    },

    async (ctx) => {
        if(!ctx.message) return;
        ctx.wizard.state.user.quiz13 = ctx.message.text;
        let txt = `Siz bilan bog'lanish uchun doimiy faoliyatdagi telefon raqamingiz ?`;
        await ctx.replyWithHTML(txt);
        return ctx.wizard.next()
    },

    async (ctx) => {
        if(!ctx.message) return;
        ctx.wizard.state.user.quiz14 = ctx.message.text;
        let txt = `Qanday talablaringiz bor ?`;
        await ctx.replyWithHTML(txt);
        return ctx.wizard.next()
    },

    async (ctx) => {
        if(!ctx.message) return;
    ctx.wizard.state.user.quiz15 = ctx.message.text;
        let txt = `Mijoz bilan suxbat sifatida qanchalik sharoitingiz bor <b>(uyda bola bo'lmaslikgi, suxbat davomida qo'shimcha shovqinlar bo'lmasligi, so'rovlarni tezlik bilan qabul qilishva h.k)</b>?`;
        await ctx.replyWithHTML(txt);
        return ctx.wizard.next();
    },

async ctx => {
    if(!ctx.message) return;
    ctx.wizard.state.user.quiz16 = ctx.message.text;
    const {
        quiz1,quiz2, quiz3,
        quiz4, quiz5, quiz6,
        quiz7, quiz8, quiz9,
        quiz10, quiz11, quiz12,
        quiz13, quiz14, quiz15,
        quiz16
    } = ctx.wizard.state.user;
   
const user = await User.findOne({user_id:ctx.from.id})

let txt = `<b>2-ANKETA</b>
---------------------------------------
<b>1-Savol:</b> Shaxsiy rivojlanish bilan shug'ilanganmisiz va nima o'rgandingiz ?

<b>Javob:</b> ${quiz1}
--------------------------------------
<b>2-Savol:</b> Qaysi chet tillarini bilasiz va kampyuter savodxonligi qanday ?

<b>Javob:</b> ${quiz2}
--------------------------------------
<b>3-Savol:</b> Bosh vaqtdagi mashg'ulotdingiz ?

<b>Javob:</b> ${quiz3}
--------------------------------------
<b>4-Savol:</b> Operatorlikni kelajakda ham davom etirib kasbiy rivojlanish niyatingiz bormi ?

<b>Javob:</b> ${quiz4}
--------------------------------------
<b>5-Savol:</b> Yangi ishga moslashuv jarayoningiz qancha muddat oladi ?

<b>Javob:</b> ${quiz5}
--------------------------------------
<b>6-Savol:</b> E'tirozlarga chidamlilik bo'yicha o'ziningizni 10 ballik sistemada baholang ?

<b>Javob:</b> ${quiz6}
--------------------------------------
<b>7-Savol:</b> Oxirgi ishlagan joyingiz va ketish sabablari ?

<b>Javob:</b> ${quiz7}
--------------------------------------
<b>8-Savol:</b> Qanday mahsulot xizmat turini sotgansiz ?

<b>Javob:</b> ${quiz8}
--------------------------------------
<b>9-Savol:</b> Yangi bilimlarni qanchalik tez o'rgana olasiz ?

<b>Javob:</b> ${quiz9}
--------------------------------------
<b>10-Savol:</b> Nutqingiz va tallaffuzingiz haqida ?

<b>Javob:</b> ${quiz10}
--------------------------------------
<b>11-Savol:</b> Oxirgi ish joyingizdagi maoshingiz ?

<b>Javob:</b> ${quiz11}
--------------------------------------
<b>12-Savol:</b> Hozirda kutayotgan oylik maoshingiz ?

<b>Javob:</b> ${quiz12}
--------------------------------------
<b>13-Savol:</b> Bir joyda qancha mudadat ishlay olasiz ?

<b>Javob:</b> ${quiz13}
--------------------------------------
<b>14-Savol:</b> Siz bilan bog'lanish uchun doimiy faoliyatdagi telefon raqamingiz ?

<b>Javob:</b> ${quiz14}
--------------------------------------
<b>15-Savol:</b> Qanday talablaringiz bor ?

<b>Javob:</b> ${quiz15}
--------------------------------------
<b>16-Savol:</b> Mijoz bilan suxbat sifatida qanchalik sharoitingiz bor (uyda bola bo'lmaslikgi, suxbat davomida qo'shimcha shovqinlar bo'lmasligi, so'rovlarni tezlik bilan qabul qilishva h.k) ?

<b>Javob:</b> ${quiz16}
--------------------------------------
<b>To'liq malumoti</b>
User_id: <b>${user.user_id}</b>
Ism familya: <b>${user.first_name}</b>
Username: <b>${user.username}</b>
Phone: <b>${user.phone}</b>
`;

await ctx.replyWithHTML(txt);
ctx.wizard.state.message = txt;
txt = `<b>Kiritilgan hamma malumotlaringiz to'g'rimi ?</b>`;
await ctx.replyWithHTML(txt,{
    ...Markup.inlineKeyboard([
        Markup.button.callback("Ha","yes"),
        Markup.button.callback("Yoq","no")
    ])
});

return ctx.wizard.next();

},

async (ctx) => {
    if(!ctx.callbackQuery) return;
    if(ctx.callbackQuery.data == "yes") {
    const admins = await User.find({isAdmin:true}) 
    let txt = ctx.wizard.state.message;
    admins.forEach(async admin => {
       await ctx.telegram.sendMessage(admin.user_id,txt,{
            parse_mode:"HTML"
        });
    });
    txt = `Sizni so'rovingiz qabul qilindi. Bergan javoblaringizga qarab uch ish kunida siz bilan bo'g'lanishadi Agar bo'g'lanilmasa  demak siz qabul qilinmagansiz. E'tiboringiz uchun rahmat ✅`;
    await ctx.reply(txt);
    return ctx.scene.leave();

    }
}




);




module.exports = setup2;