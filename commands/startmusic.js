const { Command } = require('klasa');
function pad2(number) {
   
    return (number < 10 ? '0' : '') + number
  
}

const { MessageEmbed } = require('discord.js');

const lyrics =
    [
        "creeper",
        "aw man",
        "so we back in the mine",
        "got our pickaxe swinging from",
        "side to side",
        "side side to side",
        "this task a grueling one",
        "hope to find some diamonds to",
        "night night night",
        "diamonds tonight",
        "heads up",
        "you hear a sound",
        "turn around and look up",
        "total shock fills your body",
        "oh no its you again",
        "i can never forget those",
        "eyes eyes eyes",
        "cause baby tonight",
        "the creepers trying to steal all our stuff again",
        "cause baby tonight",
        "grab your pick shovel and bolt again",
        "bolt again",
        "and run run until its done done",
        "until the sun comes up in the morn",
        "cause baby tonight",
        "the creepers trying to steal all our stuff again",
        "stuff again"


    ]

module.exports = class extends Command {

    constructor(...args) {
        /**
         * Any default options can be omitted completely.
         * if all options are default, you can omit the constructor completely
         */
        super(...args, {
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            requiredPermissions: [],
            requiredSettings: [],
            aliases: [],
            autoAliases: true,
            bucket: 1,
            cooldown: 0,
            promptLimit: 0,
            promptTime: 30000,
            deletable: false,
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            description: '',
            extendedHelp: 'No extended help available.',
            usage: '',
            usageDelim: undefined,
            quotedStringSupport: false,
            subcommands: false
        });
    }

    async run(message, [...params]) {
        var con = await message.member.voice.channel.join()
        con.play("crep-01.mp3")
        await message.channel.send("Ok, Let's start! Here are the lyrics that you need to type line by line:")
        message.channel.send(new MessageEmbed({
            "description": "**Ok, Let's start!\n Here are the lyrics that you need to type line by line:\nIt is not case sensitive and commas are ignored**",
    
        "footer":
          {
            "text":"Type !stop to stop!"
          },
        "thumbnail": {
          "url": "https://i.ytimg.com/vi/cPJUBQd-PNM/hqdefault.jpg"
        },
        "fields": [
          {
            "name": "Lyric List",
            "value": lyrics.join('\n')
          }
        ]
      }))
        const filter = m => (lyrics.includes(m.content.toLowerCase().replace(',','')) || m.content == "!stop");
        while (true) {
            var text = await message.channel.awaitMessages(filter, { max: 1 }).then(collected => collected.first().content)
            if(text == "!stop")
            {
                message.channel.send("Music Stopped No more music");
                break
            }
            var file = "crep-" + pad2(lyrics.indexOf(text.toLowerCase().replace(',','')) + 2) + ".mp3"
            console.log(file)
            con.play(file)
        }

    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};
