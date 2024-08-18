const {Client,Events} = require("discord.js")
const client = new Client({
    intents:3276799
})

//crear primer evento
client.on(Events.ClientReady,async () =>{
    console.log(`Conectado como ${client.user.username}!`)
});

//conectar cliente a la app de discord
client.login("MTI2OTM5OTc4NjAyOTg0MjU4NQ.GVVUlQ.9T77Bbz-FhCpy05OS-kzghJJn4HwIYKIQMziqo")

//respuestas a mensajes
client.on(Events.MessageCreate, async (message)=>{
    if(message.author.bot) return; //si el autor del mensaje es un bot se retira
    if(!message.content.startsWith(`-`)) return; //si el mensaje no comienza por - no responde

    const args = message.content.slice(1).split(' ')[0] //contenido del mensaje menos 1 caracter (-)

    //text command handler
    try{
        const command = require(`./commands/${args}`);
        command.run(message);
    }catch(error){
        console.log(`Ha ocurrido un error al utilizar el comando -${args}`, error.message);
    }
})

//cada vez que un usuario se une al servidor
client.on(Events.GuildMemberAdd, async (member) =>{
    const welcomeChannelId = '1264717205052850228';
    const channel = await client.channels.fetch(welcomeChannelId);

    channel.send(`★★<@${member.user.id}> bienvenido a la comunidad ACM!★★`);
});