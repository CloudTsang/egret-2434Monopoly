class CurseDoll extends egret.Sprite{
	private bmp:egret.Bitmap
	private oriY:number
	public constructor() {
		super()
		const bmp:egret.Bitmap = new egret.Bitmap()
		bmp.texture = RES.getRes("icons_json#curseidol")
		bmp.x = -bmp.width/2
		bmp.y = -bmp.height/2
		this.addChild(bmp)
		this.alpha = 0
	}

	public fadeIn(t:number=500):egret.Tween{
		this.oriY = this.y
		return egret.Tween.get(this)
		.to({
			y:this.oriY - this.height,
			alpha:1
		}, t)
	}

	public fadeOut(tw:egret.Tween=null, t:number=200):egret.Tween{
		if(!tw) tw = egret.Tween.get(this)
		return tw.to({
			y:this.oriY,
			alpha:0
		}, t)
	}
}