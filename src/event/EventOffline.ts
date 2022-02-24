class EventOffline extends MapEvent{
	private _cell:CellData
	public constructor(obj:any) {
		super(obj)
	}

	public trigger(mc:MainCharacter, cell:CellData):EvtPanel|IDisposable{
		this._cell = cell
		return super.trigger(mc, cell) 
	}

	protected onLogTap(e:egret.Event){
		const lp:EvtLog = e.currentTarget
		lp.removeEventListener("touchTap", this.onLogTap, this)
		lp.dispose()

		const npcs = this._cell.npcs
		if(npcs.length == 0){
			this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
			return 
		}
		
		for(let i of npcs){
			this._mc.npc[Liver.allLivers[i].ID] += 1
		}
		
		const objs:NpcObj[] = this._cell.getNpc(this._mc.npc)
		const np = WorldMap.showNpcPanel(objs)
		np.addEventListener(eui.UIEvent.REMOVED_FROM_STAGE, (e)=>{
			this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
		}, this)

		
	}
}