class PayGainPanel extends eui.Component{
	private txtTitle:eui.Label
	private txtNum:eui.Label
	private n :number
	private cb:()=>void
	public constructor(n:number, cb:()=>void=null) {
		super()
		this.addEventListener(eui.UIEvent.ADDED_TO_STAGE, this.onAdded, this)
		this.n = n
		this.cb = cb
		this.skinName = "resource/eui_skins/paygainpanel.exml"
	}

	protected createChildren(){
		super.createChildren()
		
		this.scaleX = 0
		this.scaleY = 0
	}

	public dispose(){
		egret.Tween.get(this)
		.to({
			scaleX:0,
			scaleY:0
		}, 200)	
		this.parent && this.parent.removeChild(this)
	}

	protected onTouched(e:any):void{
		this.cb && this.cb()
	}

	protected onAdded(e:any=null){
		const panel = this
		panel.touchEnabled = true
		panel.touchChildren = true
		panel.removeEventListener(eui.UIEvent.ADDED_TO_STAGE, panel.onAdded, panel)
		panel.once(egret.TouchEvent.TOUCH_TAP, panel.onTouched, panel)
		panel.x = (WorldData.STAGE_W - panel.width)/2
		panel.y = (WorldData.STAGE_H - panel.height)/2	

		if(panel.n < 0){
			panel.currentState = 'lose'
		}else{
			panel.currentState = 'win'
		}
		panel.txtNum.text = ''+panel.n

		egret.Tween.get(panel)
		.set({
			scaleX:0,
			scaleY:0
		})
		.to({
			scaleX:1,
			scaleY:1
		}, 200)
	}
}