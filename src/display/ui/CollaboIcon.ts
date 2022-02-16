class CollaboIcon extends egret.Sprite{
	private bmp:egret.Bitmap;
	private maskSP:egret.Shape;
	private coverSP:egret.Shape;
	private jumpH:number = 20
	private tw:egret.Tween
	public constructor(u:string, size:number=80) {
		super()
		 this.createIcon(u,size)
		 this.startJump(Roll.random2(10)*100)
	}

	public dispose(){
		if(this.tw){
			this.tw.pause()
			this.tw = null
		}
		this.removeChildren()
		this.maskSP = null
		this.coverSP = null
		this.bmp = null
	}

	public startJump(delay:number=0){
		const oriY = this.y
		this.tw = egret.Tween.get(this, {loop:true})
		.wait(delay)
		.set({
			iconState:false
		})
		.to({
			y:oriY - this.jumpH
		}, 150)
		.to({
			y:oriY
		}, 150)
		.to({
			y:oriY - this.jumpH
		}, 150)
		.to({
			y:oriY
		}, 150)
		.set({
			iconState:true
		})
		.wait(delay)
	}

	private set iconState(v){
		this.coverSP.visible = v
	}
	private get iconState(){
		return this.coverSP.visible
	}

	private createIcon(url:string, size:number){
		let bmp = new egret.Bitmap()
		bmp.texture = RES.getRes(url) as egret.Texture
		bmp.width = size
		bmp.height = size
		this.addChild(bmp)
		this.bmp = bmp

		let cover = new egret.Shape()
		cover.graphics.beginFill(0x000000, 0.5)
		cover.graphics.drawRoundRect(0,0,size,size,size)
		cover.graphics.endFill()
		this.addChild(cover)
		this.coverSP = cover

		let mask = new egret.Shape()
		mask.graphics.beginFill(0x000000)
		mask.graphics.drawRoundRect(0,0,size,size,size)
		mask.graphics.endFill()
		this.addChild(mask)
		bmp.mask = mask
		this.maskSP = mask
	}
}