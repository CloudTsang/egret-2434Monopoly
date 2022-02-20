class PlayerSelectPanel extends eui.Component implements IDisposable{
	private _iconUrls:string[]
	private _imgs:eui.Image[]
	private _cur:number
	private btnCancel:eui.Button
	/**
	 * @param iconUrls 4玩家头像资源地址
	 * @param cur 当前玩家索引，隐藏当前玩家并使返回点击索引与4玩家的索引对应
	 */
	public constructor(iconUrls:string[], cur:number) {
		super()
		this.touchEnabled  =true
		this.addEventListener(eui.UIEvent.ADDED_TO_STAGE, this.onAdded, this)
		this._iconUrls = iconUrls
		this._cur = cur
		this.skinName = "resource/eui_skins/playerselectpanel.exml"
	}

	protected childrenCreated(){
		super.childrenCreated()
		this.scaleX = 0
		this.scaleY = 0
	}

	public dispose(){
		this.btnCancel.removeEventListener("touchTap", this.onCancel, this)
		for(let img of this._imgs){
			if(!img)continue
			img.texture = null
			img.removeEventListener("touchTap", this.onClick, this)
		}
		egret.Tween.get(this)
		.to({
			scaleX:0,
			scaleY:0
		}, 200)
		.call(()=>{
			this.parent && this.parent.removeChild(this)
		})
	}

	protected onAdded(e:any){
		const panel = this
		panel.removeEventListener(eui.UIEvent.ADDED_TO_STAGE, panel.onAdded, panel)
		panel.btnCancel.addEventListener("touchTap", panel.onCancel, panel)
		egret.Tween.get(panel)
		.to({
			scaleX:1,
			scaleY:1
		}, 200)

	
		let imgs = []	
		let i=0
		let j=0
		while(i<4){
			if(i == panel._cur){
				i++
				imgs.push(null)
				continue
			}
			const u = panel._iconUrls[i]
			const img = panel[`img${j}`] as eui.Image
			img.texture = RES.getRes(u)
			img.addEventListener('touchTap', panel.onClick, panel)
			imgs.push(img)
			i++
			j++
		}
		panel._imgs = imgs
	}

	protected onClick(e:egret.Event){
		const tgt = e.target
		const i = this._imgs.indexOf(tgt)
		let evt = new egret.Event(GameEvents.PLAYER_SELECTED)
		evt.data = {
			index:i
		}
		this.dispatchEvent(evt)
	}

	protected onCancel(e:egret.Event){
		this.dispatchEvent(new egret.Event(GameEvents.PLAYER_SELECT_CANCEL))
	}
}