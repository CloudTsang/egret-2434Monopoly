class NpcPanel extends eui.Component{
	private _npc:NpcObj[]
	public constructor() {
		super()
		this.skinName = 'resource/eui_skins/npcpanel.exml'
	}

	protected createChildren(){
		super.createChildren()
		this.currentState = 'default'
	}

	public setNpcs(npcs:NpcObj[]){
		const panel = this
		panel._npc = npcs

		for(let i=0; i<npcs.length; i++){
			const n = npcs[i]
			panel[`icon${i}`].texture = RES.getRes(n.iconUrl)
			panel[`txt${i}`].text = n.name
			panel[`heart${i}`].texture = RES.getRes(this.heartUrl(n))
		}	
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
			case 4:
				return "icons_json#heart4"
			
		}
	}
}