function $(id){return document.getElementById(id);}
function show(obj){ obj.style.display = "block";}
function hide(obj){ obj.style.display = "none";}
function scroll(){
	//先判断浏览器是否支持
	if(window.pageYOffset != null){//如果浏览器支持IE9+ 其他浏览器
		return {
			left: window.pageXOffset,
			top:window.pageYOffset
		}
	}else if(document.compatMode == "CSS1compat"){//声明了的DTD
	//检测是不是怪异模式浏览器就是没有<!DOCTYPE html>
		return {
			left: document.documentElement.scrollLeft,
			top: document.documentElement.scrollTop
		}
	}
	return {//剩下的是怪异模式
		left: document.body.scrollLeft,
		top: document.body.scrollTop
	}
}
