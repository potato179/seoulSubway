// 디스코드 모듈을 호출합니다.
const Discord = require("discord.js");
const bot = new Discord.Client();
// botToken.json 파일을 호출합니다.
// 본 코드를 다운로드 받으셔서 사용하시는 분들께서는 "botToken.json.likethis" 파일에서 .likethis 확장자를 지우신 뒤 본인의 코드를 넣으셔서 작업해 주세요.
// 경고! 그 누구에게도 토큰을 공유하지 마세요! gitignore 파일에 의해 깃허브에는 커밋되지 않습니다.
let tf = require("./token.json");
// token.json 파일에서 토큰을 불러옵니다.
bot.login(process.env.token || tf.token);
// 명령어를 받을 채널을 불러옵니다.
let commandChannel = process.env.commandChannel || tf.commandChannel;
// 로그를 기록할 채널을 불러옵니다.
let logChannel = process.env.logChannel || tf.logChannel;
// 봇의 접사를 불러옵니다.
let prefix = process.env.prefix || tf.prefix;
// 쿨다운 시간을 지정합니다.
let cooldown = new Set();
let cooldownTime = 5000
// 봇 실행을 시작시킵니다.
bot.on("ready", async() => {
	console.log(`봇 실행 시작됨: ${bot.guilds.size}서버 | ${bot.channels.size}채널 | ${bot.users.size}사용자`)
	bot.user.setActivity("짜장메트로 알림 봇", {type: 2});
	bot.user.setStatus("idle");
});
// 명령어를 받습니다.
bot.on("message", (msg) => {
    // 내가 보낸 메시지에 대해서는 응답하지 않습니다.
	if(`${msg.author.id}` === `${bot.user.id}`) return;
    // 봇의 접사로 시작하지 않는 단어는 응답하지 않습니다.
	if(!msg.content.startsWith(prefix)) return;
    // 로그 채널에 이용 기록을 남깁니다.
	bot.channels.get(logChannel).send(`${msg.author.username.toString()}(${msg.author.id.toString()}): ${msg.content.toString()}`);
    // 쿨다운에 걸리면 해당 메시지를 지우고 해당 유저를 쿨다운 시간 동안 쿨다운 목록에 추가합니다.
	if(cooldown.has(msg.author.id)){
		msg.delete();
		msg.channel.send(`<:warn:511059374073053184> 원활한 이용을 위해 쿨다운제를 적용중입니다. ${cooldownTime}초 후에 다시 매세지를 보내보세요!`).then((thismsg) => thismsg.delete(4000));
		console.log(`${msg.author.username.toString()}(${msg.author.id.toString()}) 쿨다운`)
		return;
	}
	cooldown.add(msg.author.id);

	setTimeout(() => {
		cooldown.delete(msg.author.id);
	}, cooldownTime);
});