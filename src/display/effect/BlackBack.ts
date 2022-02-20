class BlackBack extends egret.Sprite {
	public constructor(w:number, h:number, color:number=0x000000) {
		super()
		this.width = w
		this.height = h
		this.alpha = 0
		this.graphics.beginFill(color)
		this.graphics.drawRect(0,0,w,h)
		this.graphics.endFill()
	}

	public fadeIn(alpha:number=0.6, t:number=500):egret.Tween{
		return egret.Tween.get(this)
		.to({
			alpha:alpha
		}, t)
	}

	public fadeOut(tw:egret.Tween=null, t:number=500):egret.Tween{
		if(!tw) tw = egret.Tween.get(this)
		return tw.to({
			alpha:0
		}, t)
	}
}