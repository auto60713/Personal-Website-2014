//取得canvas物件
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	
    //設定canvas長寬=全螢幕
	var W = window.innerWidth;
	var H = window.innerHeight;
	canvas.width = W;
	canvas.height = H;
	
	//雪的最大數量
	var mp = 25; 
	//宣告一個陣列存放雪的參數
	var particles = [];
	for(var i = 0; i < mp; i++)
	{
		particles.push({
			x: Math.random()*W,   //x-coordinate
			y: Math.random()*H,   //y-coordinate
			r: Math.random()*4+1, //大小
			d: Math.random()*mp   //落下速度
		})
	}
	
	
	function draw()
	{
	    //清除雪的軌跡
	    ctx.clearRect(0, 0, W, H);
	    //雪顏色
		ctx.fillStyle = "#119535";
		ctx.beginPath();
		//隨機在畫面的某個地方 隨機大小
		for(var i = 0; i < mp; i++)
		{
			var p = particles[i];
			ctx.moveTo(p.x, p.y);
			ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
		}
		ctx.fill();
		update();
	}

    //動畫速度
	setInterval(draw, 33);


    //雪的移動方式
	var angle = 0;
	function update()
	{
		angle += 0.01;
		for(var i = 0; i < mp; i++)
		{
			var p = particles[i];
			
			//y軸快速下降 x軸規律左右移動
			p.y -= Math.cos(angle+p.d) + 1 + p.r/2;
			p.x += Math.sin(angle) * 2;
			
			//如果雪掉出視窗外
			if(p.x > W+5 || p.x < -5 || p.y < 0)
			{
			    //讓主要的雪從最上方掉落
				if(i%3 > 0) 
				{
					particles[i] = {x: Math.random()*W, y: H+10, r: p.r, d: p.d};
				}
				//但是有一部分的雪
				else
				{
					//如果雪正在往右飄 會有一部分的雪從左邊進來
					if(Math.sin(angle) > 0)
					{
						particles[i] = {x: -5, y: Math.random()*H, r: p.r, d: p.d};
					}
					//不然就是從右邊進來
					else
					{
						particles[i] = {x: W+5, y: Math.random()*H, r: p.r, d: p.d};
					}
				}
			}
	
		}
	}