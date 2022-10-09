class LiversMenu extends eui.Component{
	private iconUrls:string[]
	private icons:egret.Bitmap[]
	private covers:egret.DisplayObject[]
	private _current:number 

	private iconContainer0:eui.Component
	private iconContainer1:eui.Component
	private iconContainer2:eui.Component
	private iconContainer3:eui.Component

	private iconContainers:eui.Component[]
	public constructor(players:MainCharacter[]) {
		super()
		this._current = 0
		// this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this)
		this.skinName = 'resource/eui_skins/liversmenu.exml'
	}

	public setPlayers(players:MainCharacter[], cur:number = 0){
		this.iconUrls = []
		for(let p of players){
			this.iconUrls.push(p.iconUrl)
		}
		this._current = cur
		this.onComplete()
	}

	public set current(v:number){
		this.covers[this._current].visible = true
		this.covers[v].visible = false
		this._current = v
	}

	private onComplete(e:any=null){
		let menu:LiversMenu = this
		menu.iconContainers = [menu.iconContainer0, menu.iconContainer1, menu.iconContainer2, menu.iconContainer3]
		menu.icons = []
		menu.covers = []
		for(let i=0;i<menu.iconUrls.length; i++){
			const [bmp, cover] = menu.createIcon(menu.iconUrls[i], menu.width, menu.iconContainers[i])
			menu.iconContainers[i].addEventListener("touchTap", this.onClick, this)
			menu.icons.push(bmp)
			menu.covers.push(cover)
		}
		this.current = this._current
	}

	private onClick(e:egret.TouchEvent = null){
		let evt = new egret.Event(GameEvents.FOCUS2LIVER)
		evt.data = this.iconContainers.indexOf(e.target)
		this.dispatchEvent(evt)
	}

	private createIcon(url:string, size:number, container:egret.DisplayObjectContainer):any[]{
		let bmp = new egret.Bitmap()
		bmp.texture = RES.getRes(url) as egret.Texture
		bmp.width = size
		bmp.height = size
		container.addChild(bmp)

		let cover = new egret.Shape()
		cover.graphics.beginFill(0x000000, 0.5)
		cover.graphics.drawRoundRect(0,0,size,size,size)
		cover.graphics.endFill()
		container.addChild(cover)

		let mask = new egret.Shape()
		mask.graphics.beginFill(0x000000)
		mask.graphics.drawRoundRect(0,0,size,size,size)
		mask.graphics.endFill()
		container.addChild(mask)
		bmp.mask = mask
		return [bmp, cover]
	}
}