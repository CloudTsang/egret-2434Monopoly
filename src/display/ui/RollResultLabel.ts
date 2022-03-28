class RollResultLabel extends eui.Component{
	public constructor() {
		super()
		this.skinName = 'resource/eui_skins/rollresult.exml'
		this.touchEnabled = false
	}

	public showState(s:string){
		this.currentState = s
	}
}