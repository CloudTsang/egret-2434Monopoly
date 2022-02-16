class RollResultLabel extends eui.Component{
	public constructor() {
		super()
		this.skinName = 'resource/eui_skins/rollresult.exml'
	}

	public showState(s:string){
		this.currentState = s
	}
}