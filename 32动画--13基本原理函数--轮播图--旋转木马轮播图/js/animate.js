//封装多个属性添加透明度的运动框架函数
	function animate(obj,json,fn){//给谁  json
		clearInterval(obj.timer);//使用定时器之前先清除
		obj.timer = setInterval(function(){	
			var flag = true; //用来判断是否停止定时器 一定写在for外面
			//遍历json
			for(var attr in json){//attr属性   json[json]值
				//计算步长 动画原理  盒子本身的样式 + 步长
				//先得到当前的样式，然后用target目标值减去 再除以10
				//获得当前样式 直接把封装好的getStyle函数拷贝到最下面调用 得到的是带有PX，转换成数字
				var current = 0;
				if(attr == "opacity"){
					current = parseInt(getStyle(obj,attr)*100) || 0;
				}else{
					current = parseInt(getStyle(obj,attr));
				}
				//console.log(current);
				var step = (json[attr] - current)/10; //目标位置target就是属性值json[attr]
				step = step > 0 ? Math.ceil(step) : Math.floor(step);//步长取整
				//做动画 先判断透明度				
				if(attr == "opacity"){	//判断用户有没有输入opacity
					if("opacity" in obj.style){	//判断浏览器是否支持透明度
						obj.style.opacity = (current + step) / 100;	//主流浏览器
					}else{
						//obj.style.filter = "alpha(opacity = 30)";	//30是变换的所以改一下
						obj.style.filter = "alpha(opacity = "+ json[attr]*100 +")";	//IE6;
					}					
				}else if(attr == "zIndex"){
					obj.style.zIndex = json[attr];
				}else{
					//obj.style.left = obj.offsetLeft + step +"px"
					obj.style[attr] = current + step + "px";
				}

				if(current != json[attr]){//只要其中一个不满足条件就不停止定时器
					flag = false;
				}		
			}
			//用于判断定时器的条件
			if(flag){
				clearInterval(obj.timer);
				if(fn){//当定时器停止时，动画结束，如果有回调函数就调用函数
					fn();//调用函数
				}
			}
		},10);//值越小运动越快
	}

	//获得当前样式函数 
	function getStyle(obj,attr){ //谁的  哪个属性
		if(obj.currentStyle){//兼容IE
			return obj.currentStyle[attr];
		}else{
			return window.getComputedStyle(obj,null)[attr];//兼容W3C 标准浏览器
		}
	}