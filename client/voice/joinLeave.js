/**
 * Module xử lý /join và /leave commands
 */

const { 
  joinVoiceChannel, 
  getVoiceConnection,
  VoiceConnectionStatus,
  entersState
} = require('@discordjs/voice');
const logger = require('../../utils/log');
const { startListening, stopListening } = require('./listen');

/**
 * Xử lý slash commands
 * @param {CommandInteraction} interaction 
 */
async function registerCommands(interaction) {
  const { commandName, member, guild } = interaction;

  if (commandName === 'join') {
    await handleJoinCommand(interaction, member, guild);
  } else if (commandName === 'leave') {
    await handleLeaveCommand(interaction, guild);
  }
}

/**
 * Xử lý lệnh /join
 */
async function handleJoinCommand(interaction, member, guild) {
  // Kiểm tra user có trong voice channel không
  const voiceChannel = member.voice.channel;
  
  if (!voiceChannel) {
    await interaction.reply({ 
      content: '❌ Bạn phải vào voice channel trước!', 
      ephemeral: true 
    });
    return;
  }

  // Kiểm tra quyền
  const permissions = voiceChannel.permissionsFor(interaction.client.user);
  if (!permissions.has('Connect') || !permissions.has('Speak')) {
    await interaction.reply({ 
      content: '❌ Bot không có quyền vào voice channel này!', 
      ephemeral: true 
    });
    return;
  }

  try {
    await interaction.deferReply();

    logger.voice(`🎤 Đang vào voice channel: ${voiceChannel.name}`);

    // Join voice channel
    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator,
      selfDeaf: false,
      selfMute: false
    });

    // Đợi connection ready
    await entersState(connection, VoiceConnectionStatus.Ready, 30_000);

    logger.success(`✓ Đã vào voice channel: ${voiceChannel.name}`);

    await interaction.editReply({ 
      content: `✅ Bot đã vào voice channel **${voiceChannel.name}**!\n🎤 Đang lắng nghe...` 
    });

    // Bắt đầu lắng nghe audio
    startListening(connection, guild.id);

  } catch (err) {
    logger.error(`Lỗi khi join voice: ${err.message}`);
    
    await interaction.editReply({ 
      content: '❌ Không thể vào voice channel!' 
    }).catch(() => {});
  }
}

/**
 * Xử lý lệnh /leave
 */
async function handleLeaveCommand(interaction, guild) {
  const connection = getVoiceConnection(guild.id);

  if (!connection) {
    await interaction.reply({ 
      content: '❌ Bot không ở trong voice channel nào!', 
      ephemeral: true 
    });
    return;
  }

  try {
    logger.voice('🎤 Đang rời voice channel...');

    // Dừng lắng nghe
    stopListening(guild.id);

    // Disconnect
    connection.destroy();

    logger.success('✓ Đã rời voice channel');

    await interaction.reply({ 
      content: '✅ Bot đã rời voice channel!' 
    });

  } catch (err) {
    logger.error(`Lỗi khi leave voice: ${err.message}`);
    
    await interaction.reply({ 
      content: '❌ Có lỗi khi rời voice channel!', 
      ephemeral: true 
    });
  }
}

module.exports = {
  registerCommands
};

