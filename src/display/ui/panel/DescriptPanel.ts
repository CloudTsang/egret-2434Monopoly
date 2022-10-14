class DescriptPanel extends eui.Component{
	private btnCancel:eui.Button
	private contents:eui.Group
	protected stats:string[]
	protected cur:number
	public constructor() {
		super()
		this.stats =  ['p1', 'p2', 'p3', 'p4', 'p5']
		this.cur = 0
		this.skinName = 'resource/eui_skins/descriptPanel.exml'
		this.once(eui.UIEvent.ADDED_TO_STAGE, this.onAdded, this)
	}

	protected onAdded(){
		this.btnCancel.once("touchTap", this.onCancel, this)
		this.contents.addEventListener("touchTap", this.onNextPage, this)
	}

	protected onNextPage(e:any=null){
		this.cur ++
		if(this.cur == this.stats.length) this.cur = 0
		this.currentState = this.stats[this.cur]
	}

	protected onCancel(){
		this.dispatchEvent(new egret.Event(GameEvents.MENU_CANCEL))
	}
}