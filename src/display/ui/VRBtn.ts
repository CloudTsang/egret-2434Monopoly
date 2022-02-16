class VRBtn extends eui.Component{	
	private _lock:boolean = false
	public constructor() {
		super()
		this.skinName = "resource/eui_skins/vrbtn.exml"
		this.addEventListener("touchTap", this.onClick, this)
		this.anchorOffsetX = this.width/2
		this.anchorOffsetY = this.height/2
	}

	private onClick(e:any){
		if(this._lock)return
		this._lock = true
		this.dispatchEvent(new egret.Event(GameEvents.VR_SWITCH))
		egret.Tween.get(this)
		.to({
			scaleX:1.2,
			scaleY:1.2
		}, 100)
		.to({
			scaleX:1,
			scaleY:1
		}, 100)
		.set({
			_lock:false
		})
	}
}