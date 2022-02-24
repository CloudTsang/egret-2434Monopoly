class NpcPanel2 extends eui.Component{
	private _npc:NpcObj[]
	public constructor(npcs:NpcObj[]) {
		super()
		this._npc = npcs
		this.addEventListener(eui.UIEvent.ADDED_TO_STAGE, this.onAdded, this)
		this.skinName = 'resource/eui_skins/npcpanel.exml'
	}

	protected createChildren(){
		super.createChildren()
		this.currentState = 'change'
		this.alpha = 0
	}

	public dispose(){
		this.parent && this.parent.removeChild(this)
	}

	public onAdded(e:any){
		this.removeEventListener(eui.UIEvent.ADDED_TO_STAGE, this.onAdded, this)
		const panel = this
		for(let i=0; i<panel._npc.length; i++){
			const n = panel._npc[i]
			panel[`icon${i}`].texture = RES.getRes(n.iconUrl)
			panel[`txt${i}`].text = n.name
			panel[`heart${i}`].texture = RES.getRes(this.heartUrl(n))
		}	
		const px = panel.x - panel.width
		const oriX = panel.x
		egret.Tween.get(this)
		.to({
			alpha:1,
			x:px
		}, 200)
		.wait(2000)
		.to({
			x:oriX,
			alpha:0
		}, 200)
		.call(()=>{
			this.dispose()
		})
	}

	private heartUrl(n:NpcObj){
		switch(Math.floor(n.favor)){
			case 0:
				return "icons_json#heart0"
			case 1:
				return "icons_json#heart1"
			case 2:
				return "icons_json#heart2"
			case 3:
				return "icons_json#heart3"
			default:
				return "icons_json#heart4"
			
		}
	}
}