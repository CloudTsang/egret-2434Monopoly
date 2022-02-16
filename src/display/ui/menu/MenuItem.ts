class MenuItem extends eui.Button{
	public labelDisplay:eui.Label
	private _t:string
	private bg:eui.Component
	private _t2:string 
	private labelSub:eui.Label
	public constructor(t:string, menu:eui.Component, sub:string='', disable:boolean=false) {
		super()
		this.addEventListener(eui.UIEvent.ADDED_TO_STAGE, this.onComplete, this)
		this.skinName = "resource/eui_skins/menuitem.exml"
		this._t = t
		this._t2 = sub
		this.bg = menu
	}

	public set disable(v:boolean){
		if(v){
			this.enabled = false
			this.touchEnabled = false
			this.touchChildren = false
		}else{
			this.enabled = true
			this.touchChildren = false
			this.touchEnabled = true
		}
	}

	public get textWidth(){
		return (this.labelDisplay as eui.Label).size * (this._t.length+4)
	}

	public get textHeight(){
		return(this.labelDisplay as eui.Label).textHeight
	}

	protected onComplete(e:any=null){
		this.removeEventListener(eui.UIEvent.ADDED_TO_STAGE, this.onComplete, this)
		this.labelDisplay.text = this._t
		if(this._t2 && this._t2!=''){
			
			this.labelDisplay.textAlign = egret.HorizontalAlign.LEFT
			this.labelSub.text = this._t2
		}else{

		}
		
		this.percentWidth = 80
		// this.currentState = "disable"
	}

}