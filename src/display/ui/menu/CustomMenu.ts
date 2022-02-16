class CustomMenu extends eui.Component  implements IDisposable{
	private selections:SelectionObj[]
	private btns:MenuItem[]
	private selContainer:eui.Group
	private items:MenuItem[]

	public constructor(sel:SelectionObj[]) {
		super()
		this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this)
		this.selections = sel
		this.touchEnabled = false

		this.skinName = "resource/eui_skins/custommenu.exml"
	}

	public dispose(){
		this.removeEventListener("touchTap", this.onClick, this)
		this.parent && this.parent.removeChild(this)
	}

	protected onComplete(e:any=null){
		this.removeEventListener(eui.UIEvent.COMPLETE, this.onComplete, this)
		const menu = this
		menu.items = []

		let itemH:number = 0
		let itemW:number = 0
		for(let s of menu.selections){
			const item = new MenuItem(s.selection, menu, s.sub)
			itemH = Math.max(itemH, item.height)
			itemW = Math.max(itemW, item.textWidth)
			
			menu.selContainer.addChild(item)
			menu.items.push(item)
		}
		let tmpw = itemW * 1.2
		if(tmpw<300) tmpw = 300
		menu.width = tmpw
		menu.height = menu.selections.length * (itemH + 20) + 40
		this.addEventListener("touchTap", menu.onClick, menu)
	}

	public setItemsDisable(index:number, value:boolean){
		this.items[index].disable = value
	}

	protected onClick(e:egret.TouchEvent){
		const i = this.items.indexOf(e.target)
		let de = new egret.Event(GameEvents.ACTION_CONFIRM)
		// console.log(e.target, i)
		de.data = {
			ty: GameEvents.ACTION_CONFIRM,
			index:i
		}
		this.dispatchEvent(de)
	}
}