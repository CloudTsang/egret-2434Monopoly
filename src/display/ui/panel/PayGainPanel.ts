class PayGainPanel extends eui.Component{
	private txtTitle:eui.Label
	private txtNum:eui.Label
	private n :number
	public constructor(n:number) {
		super()
		this.addEventListener(eui.UIEvent.ADDED_TO_STAGE, this.onAdded, this)
		this.n = n
		this.skinName = "resource/eui_skins/paygainpanel.exml"
	}

	protected createChildren(){
		super.createChildren()
		
		this.scaleX = 0
		this.scaleY = 0
	}

	public dispose(){
		// this.removeEventListener("touchTap", this.onClick, this)
		egret.Tween.get(this)
		.to({
			scaleX:0,
			scaleY:0
		}, 200)	
		this.parent && this.parent.removeChild(this)
	}

	protected onAdded(e:any=null){
		this.touchEnabled = true
		this.touchChildren = true
		this.removeEventListener(eui.UIEvent.ADDED_TO_STAGE, this.onAdded, this)

		if(this.n < 0){
			this.currentState = 'lose'
		}else{
			this.currentState = 'win'
		}
		this.txtNum.text = ''+this.n

		egret.Tween.get(this)
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