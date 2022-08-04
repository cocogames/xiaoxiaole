var letters = ['H','Y','X','I','L','O','V','E','U'];
var screen = document.getElementById("screen");
var count = document.getElementById("score");
var score = 0;
var create_flag;
var down_flag;

function start_game(){
	var audio= new Audio("img/Feeling The Rain.MP3");
	audio.play();
	create_letter();
	down_letter();
	//绑定键盘事件
	window.onkeydown = key_down;
	
	
	sleep(18500).then(() => {
		audio.pause();
	});
	
    
}
function create_letter(){
	//创建定时器
	create_flag = window.setInterval(function(){
		//生成下落的随机起始点
		var math_left =Math.round(Math.random() * 1000 );
		
		//生成26以内的随机整数
		var num = parseInt(Math.random() * 9 );
		var inp = document.createElement("input");
		inp.value = letters[num];
		inp.className = "letter";
		inp.style.background = "url(img/"+ letters[num] +".png) no-repeat"
		inp.style.top = "0px";
		inp.style.left = math_left + "px";
		screen.appendChild(inp);
	},800);
}
	//字母下落
function down_letter(){
	//创建定时器
	down_flag = window.setInterval(function(){
		//获取所有字母
		var inps = screen.childNodes;
		//每个字母每秒下落50px
		for(var i = 0;i < inps.length;i++){
			var inp = inps[i];
			//如果是元素节点，则获取top值修改
			if(1 == inp.nodeType){
				var top = inp.style.top;//获取top值
				top = parseInt(top);
				//超出屏幕游戏失败
				if(600>top){
					inp.style.top = top + 3 +"px";
				}else{
					//游戏失败
					//暂停游戏
					stop_game();
					screen.innerHTML = "";//清空屏幕
					count.innerHTML = "0";//重置计数器
					score = 0;//重置分数
				}
			}
		}
	},20);
}
//暂停游戏
function stop_game(){
	//暂停定时器
	clearInterval(create_flag);
	clearInterval(down_flag);
	//取消绑定事件
	window.onkey = null;
}
//按下键盘消除字母
function key_down(){
	//获取所有字母
	var inps = screen.childNodes;
	//判断用户按下的键值与input的walue是否一致
	for(var i = 0;i < inps.length;i++){
		var inp = inps[i];
		//如果是元素节点，则获取top值修改
		var n = 0;
		if(1 == inp.nodeType){
			//判断用户按下的值和input的velue是否一致
		switch(event.keyCode){
			case 72:n = 0; break;
			case 89:n = 1; break;
			case 88:n = 2; break;
			case 73:n = 3; break;
			case 76:n = 4; break;
			case 79:n = 5; break;
			case 86:n = 6; break;
			case 69:n = 7; break;
			case 85:n = 8; break;
			default :n = 9;
		}
		if(letters[n] == inp.value){
			screen.removeChild(inp);
			score++;
			next_game();
			count.innerHTML = score;
			break;
		}
		}
	}
}
function next_game(){
	if(score == 21){
		stop_game();
		screen.innerHTML = "";//清空屏幕
		fall();
	}
}

function fall(){
	sleep(1000).then(() => {
	var audio= new Audio("img/月半小夜曲.mp3");
	audio.play();
	 })
	sleep(4500).then(() => {
		//生成下落的随机起始点
		var math_left =Math.round(Math.random() * 1000 );		
		//生成26以内的随机整数
		var num = 3;
		for(num = 3;num <9;num++){
			var inp = document.createElement("input");
			inp.value = letters[num];
			inp.className = "letter";
			inp.style.background = "url(img/"+ letters[num] +".png) no-repeat"
			inp.style.top = "0px";
			//inp.style.left = num*200-500 + "px";
			switch(num){
			case 3:inp.style.left = 100 + "px"; break;
			case 4:inp.style.left = 350+ "px"; break;
			case 5:inp.style.left = 500+ "px"; break;
			case 6:inp.style.left = 660+ "px"; break;
			case 7:inp.style.left = 820+ "px"; break;
			case 8:inp.style.left = 1100+ "px"; break;
			
		}
			screen.appendChild(inp);	
		}	
		
		sleep(2000).then(() => {
    // 这里写sleep之后需要去做的事情
		for(num = 0;num <3;num++){
			var inp = document.createElement("input");
			inp.value = letters[num];
			inp.className = "letter";
			inp.style.background = "url(img/"+ letters[num] +".png) no-repeat"
			inp.style.top = "0px";
			inp.style.left = num*200+200 + "px";
			screen.appendChild(inp);	
		}	
	 })

	down_flag = window.setInterval(function(){
		//获取所有字母
		var inps = screen.childNodes;
		//每个字母每秒下落50px
		for(var i = 0;i < inps.length;i++){
			var inp = inps[i];
			//如果是元素节点，则获取top值修改
			if(1 == inp.nodeType){
				var top = inp.style.top;//获取top值
				top = parseInt(top);

				inp.style.top = top + 3 +"px";
				if(top > 350){
					stop_game();
				}			
			}
		}
	},20);	
})	
}
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}