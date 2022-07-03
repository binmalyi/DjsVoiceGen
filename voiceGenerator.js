import { Collection } from 'discordjs';

const voiceCollection = new Collection();

// Pass the instance of Client as you defined it in your code
client.on('voiceStateUpdate', async (client, oldState, newState) => {

    if(!oldState.channel && newState.channel.id === `CHANNEL_ID`){
        let user = await client.users.fetch(newState.id);
        let option = {
            type: 'GUILD_VOICE',
            parent: newState.channel.parent,
            permissionOverwrites: [
                {
                    id: newState.id,
                    allow: ['MANAGE_CHANNELS','MANAGE_ROLES','MUTE_MEMBERS','DEAFEN_MEMBERS','MOVE_MEMBERS']
                }
            ]
        }
        let channel = await newState.guild.channels.create(user.tag, option).catch(error => console.error(error));

        newState.member.voice.setChannel(channel);
        voiceCollection.set(user.id, channel.id);

    } else if(!newState.channel){
        if(oldState.channelId === voiceCollection.get(newState.id)){
            oldState.channel.delete();
        }
    }

})