class ActMenuR extends eui.Component implements IDisposable{
	private btnGame:eui.Button
	private btnSing:eui.Button
	private btnStudy:eui.Button
	private btnWork:eui.Button
	private btnHangout:eui.Button
	private btnRest:eui.Button


	public constructor() {
		super()
		
		this.skinName = "resource/eui_skins/actmenur.exml"
		this.addEventListener("touchTap", this.onClick, this)
	}

	public dispose(){
		this.removeEventListener("touchTap", this.onClick, this)
		this.parent && this.parent.removeChild(this)
	}

	private onClick(e:egret.TouchEvent){
		const t = e.target
		const menu = this
		let data = {}
		switch(t){
			case menu.btnGame:
				data = {
					ty:GameEvents.GAME
				}
				break
			case menu.btnSing:
				data = {
					ty:GameEvents.SING
				}
				break
			case menu.btnStudy:
				data = {
					ty:GameEvents.STUDY
				}		
				break
			case menu.btnWork:
				data = {
					ty:GameEvents.WORK
				}
				break
			case menu.btnHangout:
				data = {
					ty:GameEvents.HANGOUT
				}
				break
			case menu.btnRest :
				data = {
					ty:GameEvents.REST
				}
				break
			default:
				return
		}
		let evt = new egret.Event(GameEvents.ACTION_CONFIRM)
		evt.data = data
		this.dispatchEvent(evt)
	}
}