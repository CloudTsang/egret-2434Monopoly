class GlobalMethod{
	/**
	 * 获取两个坐标的旋转角度，
	 */
	public static getRotation(x1:number,y1:number,x2:number,y2:number){		
		const tan = Math.atan((y2-y1+0.1)/(x2-x1+0.1))
		let deg = tan/(Math.PI/180);
		if(x2<x1){
			deg = -(180-deg)
		}
		return deg
	}

	public static getSinCos(x1:number,y1:number,x2:number,y2:number):{sin:number, cos:number}{
		const dis = egret.Point.distance(new egret.Point(x1,y1), new egret.Point(x2,y2))
		const sin = (y2 - y1 + 0.01)/dis
		const cos = (x2 - x1 + 0.01)/dis
		return {
			sin,cos
		}
	}

	public static getDistance(x1:number,y1:number,x2:number,y2:number){
		return egret.Point.distance(new egret.Point(x1,y1), new egret.Point(x2,y2))
	}


    public static random(min:number, max:number):number{
        return Math.random()*(max - min) + min
    }

    /**
	 * 获取一个mc帧动画
	 * @param {stirng} name mc帧动画的文件名
	 * @param {number} playNum 帧动画播放次数 -1为循环播放 默认循环播放
	 */
	public static getMc(name: string, playNum: number = -1): egret.MovieClip {
		let data = RES.getRes(`${name}_json`);
		let txtr = RES.getRes(`${name}_png`);
		let mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
		let mc: egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData());
		// mc.play(playNum);
		return mc;
	}

	 /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    public static createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    public static loadImage(url:string, listner:any, successFunc:Function, failFunc:Function){		
		let loader = new egret.ImageLoader();
		loader.crossOrigin = "anonymous";// 跨域请求
		loader.load(url)
		loader.once(egret.Event.COMPLETE, successFunc, listner)
		loader.once( egret.IOErrorEvent.IO_ERROR, failFunc, listner);	
	}

    public static httpReq(url:string, param:any, method:'GET'|'POST', listner:any, successFunc:Function, failFunc:Function, contentType:'application/json'|'application/x-www-form-urlencoded' ,token?:string){							
        if(method == 'GET'){
            url = url+'?'+param;
        }
		let req = new egret.HttpRequest();	
		req.open(url, method);	
		req.setRequestHeader("Accept", "*/*");
        if(token) req.setRequestHeader("Authorization", token);
		req.setRequestHeader("Content-Type", contentType);
        if(method == 'GET'){
            req.send();
        }else{
            req.send(param);
        }		
		req.addEventListener(egret.Event.COMPLETE, successFunc,listner);
		if(failFunc!=null){
			req.addEventListener(egret.IOErrorEvent.IO_ERROR, failFunc,listner);
			req.addEventListener(egret.HTTPStatusEvent.CLOSE, failFunc,listner);
		}		
	}	

	public static Loaded(){
        window.parent.postMessage({
            "isLoadComplete": true,
            "url": window.location.href
        }, '*');
	}

	public static  Curry = (fn) => {
 	   //... 表示有1个或者更多的参数
		return function curriedFn(...args){
			//检查传入的参数args的数目是否小于函数fn的参数的个数
			if(fn.length > args.length){
				//如果传入的参数个数不够，返回一个函数，并传入上一次的参数
				return function(){
					//重新返回调用curriedFn
					return curriedFn.apply(
						//concat，连接两个或更多的数组，在args后面追加arguments的内容，arguments表示之前传入的参数
						null,args.concat([].slice.call(arguments))
					);
				}
			}
			//如果参数符合要求，将所有的参数传入fn函数内部
			return fn.apply(null,args);
		}
	}
		

}