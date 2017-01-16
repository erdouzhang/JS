window.onload = function(){
	//获取元素
	function $(id){return document.getElementById(id);}
	var js_slider = $("js_slider");//获取最大的盒子
	var slider_main_block = $("slider_main_block");//获取图片的父亲
	var imgs = slider_main_block.children;//获取所有图片
	var slider_ctrl = $("slider_ctrl");//获取span小方块的父亲

	//操作元素  //生成小span	
	for(var i = 0;i<imgs.length;i++){
		var span = document.createElement("span");//首先要创建
		span.innerHTML = imgs.length - i;//因为图片是倒着插入，所以序号返回责罚写
		span.className = "slider-ctrl-con";
		slider_ctrl.insertBefore(span,slider_ctrl.children[1]);//插入哪个元素 插在父亲第二个孩子前面
	}
	//给第一个序号加蓝色属性
	var spans = slider_ctrl.children;//得到所有的span
	spans[1].setAttribute("class","slider-ctrl-con current");//第一个序号得到两个类名变蓝

	var scrollWidth = js_slider.clientWidth;//得到大盒子宽，也就是一张图片走的距离310px
	//第一张图片放在主盒子，其他图片放在右边盒子中
	for(var i = 1;i<imgs.length;i++){//第一张图片不走，所以从1开始遍历
		imgs[i].style.left = scrollWidth + "px";
	}
	//遍历三个按钮 spans是8个按钮
	var iNow = 0;//用来控制当前播放张数 当前播放的那张
	for(var k in spans){	//k是索引号 因为spans是数组不是json对象spans[0]是第一个按钮
		spans[k].onclick = function(){
			if(this.className == "slider-ctrl-prev"){
				// alert("左侧按钮");
				//当点击时，当前图片慢慢走到右边，最后一张图片迅速走到左边
				animate(imgs[iNow],{left:scrollWidth});
				--iNow < 0 ? iNow = imgs.length - 1 : iNow;//imgs.length-1是最后一张图片
				imgs[iNow].style.left = -scrollWidth + "px";//立马执行最后一张图片走到最右
				animate(imgs[iNow],{left:0});//然后慢慢走到舞台中间
				setSquare();//调用小方块蓝色样式函数
			}else if(this.className == "slider-ctrl-next"){
				// alert("右侧按钮");	
				autoplay();				
			}else{
				// alert("下面的小方块按钮");
				//首先要知道我们点击的是哪张图片 即获得当前索引号
				var that = this.innerHTML - 1;//当前的索引号
				if(that > iNow){// that点击的图片 > iNow当前轮播图片
					//做法等同于右侧按钮
					animate(imgs[iNow],{left:-scrollWidth});//当前iNow那张慢慢从左侧走出去 
					imgs[that].style.left = scrollWidth + "px";//点击的that这张快速到右侧
				}else if(that < iNow){
					animate(imgs[iNow],{left:scrollWidth});//当前那张慢慢走出去 右侧
					imgs[that].style.left = -scrollWidth + "px";//点击的这张快速到左侧
				}
				iNow = that;//给当前的索引号
				animate(imgs[iNow],{left:0});//点击的那张缓慢出来				
				setSquare();
			}
		}
	}
	//一个可以控制span函数
	function setSquare(){
		//清除所有的span current，留下iNow满足需要的那个
		for(var i = 1;i<spans.length-1;i++){//只要1到6这六个序号
			spans[i].className = "slider-ctrl-con";
		}
		spans[iNow+1].className = "slider-ctrl-con current";//因为iNow是从0开始
	}
	//定时器开始 其实定时器就是右侧按钮
	var timer = null;
	timer = setInterval(autoplay,2000);//开启定时器
	function autoplay(){//直接把右侧按钮剪切来
		// alert("右侧按钮");	
		//当前iNow == 0			
		animate(imgs[iNow],{left:-scrollWidth});//谁做动画 当前那个做动画 做什么动画向左移动310px
		++iNow > imgs.length - 1 ? iNow = 0 : iNow;
		imgs[iNow].style.left = scrollWidth + "px";//立马执行第一张图片走到最左
		animate(imgs[iNow],{left:0});
		setSquare();
	}
	//鼠标经过清除定时器
	js_slider.onmouseover = function(){
		clearInterval(timer);
	}
	js_slider.onmouseout = function(){
		clearInterval(timer);//开启定时器之前先清除定时器
		timer = setInterval(autoplay,2000);//开启定时器
	}

}