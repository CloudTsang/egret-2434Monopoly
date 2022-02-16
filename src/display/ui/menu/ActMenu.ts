class ActMenu extends eui.Component  implements IDisposable{
	private btnGameStream:eui.Button
	private btnSingStream:eui.Button
	private btnTalkStream:eui.Button
	private btnPresentStream:eui.Button
	private btnWatch:eui.Button
	private btnRest2:eui.Button

	public constructor() {
		super()
		this.touchChildren = true
		this.skinName = "resource/eui_skins/actmenu.exml"
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
		let evt = ""
		switch(t){
			case menu.btnGameStream:	 
				data = {
					ty:GameEvents.STREAM_PREPARE,
					ty2:StreamType.GAME,
					index:0
				}
				break
			case menu.btnSingStream:
				data = {
					ty:GameEvents.STREAM_PREPARE,
					ty2:StreamType.SING,
					index:1
				}
				break
			case menu.btnTalkStream:
				data = {
					ty:GameEvents.STREAM_PREPARE,
					ty2:StreamType.TALK,
					index:2
				}
				break
			case menu.btnPresentStream:
				data = {
					ty:GameEvents.STREAM_PREPARE,
					ty2:StreamType.PRESENT,
					index:3
				}
				break
			case menu.btnWatch:
				data = {
					ty:GameEvents.WATCH,
					index:4
				}
				break

			case menu.btnRest2:
				data = {
					ty:GameEvents.REST,
					index:5
				}
				break
			default:
				return
		}
		let event = new egret.Event(GameEvents.ACTION_CONFIRM)
		event.data = data
		this.dispatchEvent(event)
	}
}