class LiverInfoBtn extends eui.Component{
	private _shadow:egret.DropShadowFilter
	private _pressed:boolean
	public constructor() {
		super()
		this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this)
		this.skinName = "resource/eui_skins/liverinfobtn.exml"
	}

	public dispose(){
		this.removeEventListener("touchBegin", this.onTouch, this)
		this.removeEventListener("touchEnd", this.onRelease, this)
	}

	private onComplete(e:any){
		this.removeEventListener(eui.UIEvent.COMPLETE, this.onComplete, this)
		this.addEventListener("touchBegin", this.onTouch, this)
		this.addEventListener("touchEnd", this.onRelease, this)
		this._shadow = new egret.DropShadowFilter(2)
		this.filters = [this._shadow]
	}

	private onTouch(e:any){
		this._pressed = true
		this.filters = [ ]
	}

	private onRelease(e:any){
		if(!this._pressed){
			return
		}
		this._pressed = false
		this.filters = [this._shadow]
	}
}