//require npm [ discord.js@13.1.0, axios ]

const { Client, MessageEmbed } = require('discord.js');
const axios = require('axios');

const client = new Client({ intents: 32767 });

const config = {
    //token bot!
    token: 'token here',
    //bot prefix!
    prefix: '!',
    //main color
    color: '#03b9f5'
}

client.on('ready', () => { console.log('Code by KIMMOJI.') });

client.on(
    "messageCreate",
        async (message) => {
            const args = message.content.slice(config.prefix.length).trim().split(/ +/);
            const cmd = args.shift().toLowerCase();
            if (message.channel.type === 'dm') return;

            switch (cmd) {
                case 'login':
                    try {
                    if (!message.guild.me.permissions.has('MANAGE_MESSSAGE')) {
                        throw new Error('`not have manager message permission.`')
                    } else { message.delete() }
                    
                    if (!args[0]) { throw new Error('`args is empty, Please try again.`') };

                    await axios.get('https://www.roblox.com/mobileapi/userinfo', {
                        headers: { "Cookie": '.ROBLOSECURITY='+ args[0]}
                    })
                    .then(
                        function(response) {

                            var user = response.data;

                            message.channel.send({
                                embeds: [
                                new MessageEmbed()
                                    .setColor('GREEN')
                                    .setAuthor(
                                        client.user.tag,
                                        client.user.displayAvatarURL(
                                            { dynamic: true }
                                        )
                                    )
                                    .addFields(
                                        {
                                            name: 'Username',
                                            value: user.UserName,
                                            inline: false
                                        }, {
                                            name: 'UserID',
                                            value: (user.UserID).toString(),
                                            inline: false 
                                        }, {
                                            name: 'Robux',
                                            value: (user.RobuxBalance).toString(),
                                            inline: false 
                                        }
                                    )
                                    .setThumbnail(user.ThumbnailUrl)
                                    .setTimestamp()
                                    .setFooter('Code by KIMMOJI')
                                ]
                            })
                            
                        }
                    )
                    .catch( () => { throw new Error('`Fail cookie, Please try again.`') })

                    } catch(err) {
                        return message.channel.send('**['+ err.name +'] ** '+ err.message)
                    }
                break;
            }
        }
);

client.login(config.token).catch((e) => { console.log(e) });
