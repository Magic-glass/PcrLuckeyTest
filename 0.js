/*
*原版那个js太长了
*重写后去掉了一些特别日期的判定
*/

//=========随机内容begin=========
//发生的事
var things = [
	//{name:"",good:"",bad:""},
	{name:"抽卡",good:"厕纸三星",bad:"+19"},
	{name:"团队战",good:"刀刀烈火",bad:"会长你看！我们又挂树了人仌众𠈌"},
	{name:"摸鱼",good:"辣鸡游戏，毁我青春",bad:"你已被移出公会"},
	{name:"爆肝",good:"氪佬在肝帝面前只是渣渣",bad:"服务器怎么又炸了"},
	{name:"氪金",good:"今天的你又变强了",bad:"余额不足"},
	{name:"刷装备",good:"装备掉落100%",bad:"装备掉落0%"},
	{name:"强化",good:"大成功",bad:"大浪费"},
	{name:"肝jjc",good:"点草一个死一个",bad:"你 被 梯 了"},
	{name:"肝pjjc",good:"对手都是纸糊的",bad:"小 心 暗 牌"},
	{name:"水群",good:"龙王出没",bad:"又要被大佬按在地上摩擦了"},
	{name:"补番",good:"老婆真棒！",bad:'"你为什么还看小孩子的动画片"'},
];
//方位
var directions = [
    "北方","东北方","东方","东南方","南方","西南方","西方","西北方","地面","头顶"
];
var lilys = [
	"爱蜜莉雅","安","本田未央（偶像大师）","碧","碧（插班生）","步未","步未（仙境）","初音","初音（夏日）","纯","纯（夏日）","岛村卯月（偶像大师）","纺希","纺希（万圣节）","宫子","宫子（万圣节）","古蕾雅","胡桃","胡桃（圣诞节）","环奈","环奈（振袖）","惠理子","惠理子（情人节）","姬塔","嘉夜","镜华","镜华（万圣节）","静流","静流（情人节）","凯露","凯露（夏日）","凯露（新年）","栞","栞（魔法少女）","可可萝","可可萝（公主）","可可萝（夏日）","可可萝（新年）","克里斯提娜","克里斯提娜（圣诞节）","克萝依","空花","空花（大江户）","菈比莉斯塔","拉姆","雷姆","莉玛","璃乃","璃乃（仙境）","怜","怜（万圣节）","怜（新年）","铃","铃（游侠）","铃莓","铃莓（夏日）","铃莓（新年）","铃奈","铃奈（夏日）","绫音","绫音（圣诞节）","流夏","流夏（夏日）","露","露娜","矛依未","矛依未（新年）","美冬","美冬（夏日）","美里","美里（夏日）","美美","美美（万圣节）","美咲","美咲（万圣节）","茉莉","茉莉（万圣节）","莫妮卡","莫妮卡（魔法少女）","妮侬","妮侬（大江户）","佩可莉姆","佩可莉姆（公主）","佩可莉姆（夏日）","佩可莉姆（新年）","琪爱儿","祈梨","七七香","七七香（夏日）","千歌","千歌（圣诞节）","茜里","茜里（天使）","秋乃","秋乃（圣诞节）","忍","忍（万圣节）","日和莉","日和莉（公主）","日和莉（新年）","模板:Role","涩谷凛（偶像大师）","深月","似似花","似似花（新年）","望","望（圣诞节）","未奏希","未奏希（万圣节）","霞","霞（魔法少女）","香织","香织（夏日）","咲恋","咲恋（圣诞节）","咲恋（夏日）","杏奈","杏奈（夏日）","雪","亚里莎","依里","依里（天使）","伊莉亚","伊莉亚（圣诞节）","伊绪","伊绪（夏日）","由加莉","由加莉（圣诞节）","优妮","优衣","优衣（公主）","优衣（新年）","真步","真步（夏日）","真琴","真琴（夏日）","真阳","真阳（游侠）","智","智（魔法少女）","珠希","珠希（夏日）"
];
//=========随机内容end=========
function str_to_ascii(str){
	let ascii = "";
	for(let n = 0;n<(str.length>9?8:str.length);n++){
		ascii += str.charAt(n).charCodeAt();
   }
   return ascii;
}
/****************
*以当天日期为seed伪随机
*seed必须为全局变量
*区间[min,max)
**********************************
****建议修改r_name为随机字符串****
**********************************
*****************/
var r_name = "pcraccn";
var today = new Date();
var seed = Number(""+today.getFullYear()+today.getMonth()+today.getDate());
seed += str_to_ascii(r_name);
function seededRandom(max,min) { 
    max = max || 1;
    min = min || 0; 
    seed = (seed * 9301 + 49297) % 233280; 
    let rnd = seed / 233280.0;
	//console.log(str_to_ascii(r_name));
    return parseInt(min + rnd * (max - min)); 
};
function add_to_good_or_bad(target,content){
	$('.'+target+' .content ul').append('<li><div class="name">' + content.name + '</div><div class="description">' + content[target] + '</div></li>');
}
function add_to_tips(target,content){
	$(target).html(content);
}
function kira_kira(num){
	let result = "";
	let i = 0;
	while (i < num){
		result += "★";
		i++;
	}while(i < 5){
		result += "☆";
		i++;
	}return result;
}
function lucky_or_unfortunately(){
	//挑选词条
	//宜2-4个，忌1-3个
	lucky_count = seededRandom(5,2);
	unfortunately_count = seededRandom(4,1);
	for(let i = 0;i<lucky_count;i++){
		let temp = seededRandom(things.length,0);
		add_to_good_or_bad("good",things[temp]);
		//将已经选进的对象移除
		things.splice(temp,1);
	}
	for(let i = 0;i<unfortunately_count;i++){
		let temp = seededRandom(things.length,0);
		add_to_good_or_bad("bad",things[temp]);
		things.splice(temp,1);
	}
}
$(document).ready(function(){
	lucky_or_unfortunately();
	var weeks = ["日","一","二","三","四","五","六"];
	add_to_tips(".date",today.getFullYear() + "年" + (today.getMonth() + 1) + "月" + today.getDate() + "日 | 星期" + weeks[today.getDay()]);
	add_to_tips(".lucky_lily",lilys[seededRandom(lilys.length,0)]);
	add_to_tips(".lucky_star",kira_kira(seededRandom(5,1)));
	add_to_tips(".direction_gacha",directions[seededRandom(directions.length,0)]);
});