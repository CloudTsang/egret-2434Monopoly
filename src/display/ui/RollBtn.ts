class RollBtn extends eui.Component{
	private txtRollNum:eui.Label
	private result:RollResultLabel
	private _tw:egret.Tween
	private btn:eui.Image

	public constructor() {
		super()
		this.$addListener(eui.UIEvent.COMPLETE, this.onComplete, this)
		this.skinName = "resource/eui_skins/rollbtn.exml"
		
	}

	addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number):any{
		if(type == egret.TouchEvent.TOUCH_TAP){
			this.btn.addEventListener(type,listener, thisObject, useCapture, priority)
		}
	}

 
	private onComplete(e:any){
		this.removeEventListener(eui.UIEvent.COMPLETE, this.onComplete, this)
		this.result.touchEnabled = false
		this.txtRollNum.touchEnabled = true
	}

	public showRolledNum(n:number, r:string){
		let txt = this.txtRollNum
		this.result.currentState = r
		if(r == RollResult.BIG_SUCCESS){
			SoundManager.instance.playBgs('success_mp3')
		}else if(r == RollResult.BIG_FAIL){
			// SoundManager.instance.playBgs('dededon_short_mp3')
		}
		
		if(this._tw){
			this._tw.pause()
			this._tw = null	
		}
		this._tw = egret.Tween.get(txt)
		.set({
			bottom:-100,
			text:''+n
		})
		.to({
			bottom:this.height
		}, 200)
		.wait(1000)
		.set({
			bottom:-100,
		})
		.call(()=>{
			this.result.currentState = RollResult.NORMAL
		})
	}
	
}