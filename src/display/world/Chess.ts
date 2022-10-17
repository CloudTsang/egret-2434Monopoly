class Chess extends egret.Sprite{
	protected vUrl:string
	protected rUrl:string
	protected vBmp:egret.DisplayObject
	protected rBmp:egret.DisplayObject

	protected fireBmp:EnjoFire//egret.Bitmap
	protected sleepBmp:egret.Bitmap
	protected banBmp:egret.Bitmap

	private _lock:boolean
	private _tween:egret.Tween
	/**切换vr时的跳起高度 */
	private _switchJumpH:number
	/**走格子时的跳起高度 */
	private _moveJumpH:number
	private _cellSize:number

	private _skelDataV:ISkeleData
	private _skelDataR:ISkeleData
	private _skelV:ISkelObj
	private _skelR:ISkelObj
	private _curSkel:ISkelObj

	// private _pixelFilter = new egret.GlowFilter(0x000000, 1, 10, 10, 1)

	/**实例化棋子显示对象
	 * @param v 虚拟形象图片url
	 * @param r 现实形象图片url 
	 * @param w 显示对象宽
	 * @param h 显示对象高
	 */
	public constructor(v:string, r:string, skelr:ISkeleData=null, skelv:ISkeleData=null, w:number=240, h:number=240,) {
		super()
		this.vUrl = v
		this.rUrl = r
		this.width = w
		this.height = h
		this._switchJumpH = h/10
		this._moveJumpH = h/3
		this._cellSize = WorldData.cellSize
		this._skelDataR = skelr
		this._skelDataV = skelv

		// const filter = new egret.GlowFilter(0x000000,1,15,15,3)
		// this.filters = [filter]
		//锚点设置在棋子底部
		// this.anchorOffsetX = w/2
		this.anchorOffsetY = h
		this.loadPic()
		// this.filters = [this._pixelFilter]
	}
	
	public dispose(){
		const chess = this
		RES.destroyRes(chess.vUrl)
		RES.destroyRes(chess.rUrl)
		chess.removeChildren()
		chess.parent && chess.parent.removeChildren()
	}

	/**设置vr模式
	 * @param tw 是否显示切换动画
	 */
	public setMode(isv:boolean, tw:boolean=false){
		const chess = this
		if(chess._lock){
			return
		}
		chess._lock = true
		let oriBmp:egret.DisplayObject
		let newBmp:egret.DisplayObject
		if(isv){
			oriBmp = chess.rBmp
			newBmp = chess.vBmp
			chess._curSkel = chess._skelV
		}else{
			oriBmp = chess.vBmp
			newBmp = chess.rBmp
			chess._curSkel = chess._skelR
		}
		if(!tw){
			oriBmp.parent && chess.removeChild(oriBmp)
			chess.addChildAt(newBmp,0)
			chess._lock = false
			return
		}
		const oriY = chess.y
		egret.Tween.get(chess)
		.to({
			y:chess.y - chess._switchJumpH
		}, 100)
		.call(()=>{
			oriBmp.parent && chess.removeChild(oriBmp)
			chess.addChildAt(newBmp,0)
		})
		.to({
			y:oriY
		}, 100)	
		.set({
			_lock:false
		})
	}

	public get lock(){
		return this._lock
	}

	public showFire(v:boolean){
		if(v && !this.fireBmp){
			SoundManager.instance.playBgs("fire_mp3")
			let bmp = new EnjoFire(this.vBmp.width)
			bmp.y = this.height-bmp.height
			this.addChild(bmp)
			this.fireBmp = bmp
		}else if(!v && this.fireBmp){
			this.fireBmp.dispose()
			this.fireBmp = null
		}
	}

	public showLight(v:boolean){
		if(v){
			let filter = new  egret.GlowFilter(0xFFFFFF, 0.7, 200, 200, 5)
			this.filters = [filter]
		}else{
			// this.filters = [this._pixelFilter]
			this.filters = []
		}
	}

	public showSleep(v:boolean){
		if(v && !this.fireBmp){
			let bmp = new egret.Bitmap()
			bmp.texture = RES.getRes("icons_json#sleep")
			this.addChild(bmp)
			this.sleepBmp = bmp
			bmp.y = bmp.height/2
			bmp.x = -bmp.width
		}else if(!v && this.sleepBmp){
			this.sleepBmp.parent && this.sleepBmp.parent.removeChild(this.sleepBmp)
			this.sleepBmp = null
		}
	}

	public showAttacked(){
		const oriX = this.x
		const oriY = this.y
		return egret.Tween.get(this, {
			loop:false//true
		})
		.to({
			x:oriX-20
		},50)
		.to({
			x:oriX+20
		}, 100)
		.to({
			x:oriX
		}, 400, egret.Ease.elasticOut)
	}

	public walk(){
		const  t= this
		if(!t._curSkel) return
		t._curSkel.armature.animation.timeScale = 2
		t._curSkel.armature.animation.gotoAndPlay("walk")
	}

	public reset(){
		const t = this
		if(!t._curSkel) return
		t._curSkel.armature.animation.gotoAndStop("walk", 0)
	}

	private loadPic(){
		const chess = this

		let vBmp:egret.DisplayObject
		if(chess._skelDataV){
			const obj = GlobalMethod.addArmature(chess._skelDataV)
			vBmp = obj.armatureDisplay
			const scale = (chess.height/1.5) / vBmp.height
			vBmp.scaleX = scale
			vBmp.scaleY = scale
			vBmp.x = -(vBmp.width*scale)/2
			
			vBmp.y = chess.height-vBmp.height * scale
			chess._skelV = obj
			chess.vBmp = vBmp
		}else{
			vBmp = new egret.Bitmap(RES.getRes(chess.vUrl) as egret.Texture)
			const scale = vBmp.width/vBmp.height
			vBmp.height =  chess.height/1.5
			vBmp.width = vBmp.height * scale	
			vBmp.x = -vBmp.width/2
			vBmp.y = chess.height-vBmp.height
			chess.vBmp = vBmp
		}

		let rBmp:egret.DisplayObject
		if(chess._skelDataR){
			const obj = GlobalMethod.addArmature(chess._skelDataR)
			rBmp = obj.armatureDisplay
			const scale = (chess.height/1.5) / rBmp.height
			rBmp.scaleX = scale
			rBmp.scaleY = scale
			rBmp.x = -(rBmp.width*scale)/2
			
			rBmp.y = chess.height-rBmp.height * scale
			chess._skelR = obj
			chess.rBmp = rBmp
		}else{
			rBmp = new egret.Bitmap(RES.getRes(chess.rUrl) as egret.Texture)
			const scale = rBmp.width/rBmp.height
			rBmp.height =  chess.height/1.5
			rBmp.width = rBmp.height * scale	
			rBmp.x = -rBmp.width/2
			rBmp.y = chess.height-rBmp.height
			chess.rBmp = rBmp
		}
		
		chess.setMode(true)
	}

	public get jumpHeight(){
		return this._moveJumpH
	}


	//#region 走棋效果

	private _moveArr:number[]
	private _curMove:number
	private _totMove:number
	private _callBack:()=>void
	public startWalk(n:number=1, cb:()=>void=null){
		this._lock = true
		this._curMove = 0
		this._totMove = n
		this._callBack = cb
		this.onStep()
	}
	private onStep(){
		if(this._curMove >= this._totMove){
			this._lock = false
			if(this._callBack)this._callBack()
			return
		}
		this._curMove ++
		const chess = this
		chess._moveArr = [chess.x, chess.y, 
							chess.x+chess._cellSize/2, chess.y-chess._moveJumpH, 
							chess.x+chess._cellSize, chess.y]
		egret.Tween.get(chess)
		.to({
			factor:1
		},500)
		.call(this.onStep, this)
	}
	public get factor():number {
        return 0;
    }
	public set factor(value:number) {
		const arr = this._moveArr
		this.x = (1 - value) * (1 - value) * arr[0] + 2 * value * (1 - value) * arr[2] + value * value * arr[4];
		this.y = (1 - value) * (1 - value) * arr[1] + 2 * value * (1 - value) * arr[3] + value * value * arr[5];
    }
	//#endregion

	public get vurl(){
		return this.vUrl
	}
	public get rurl(){
		return this.rUrl
	}


}