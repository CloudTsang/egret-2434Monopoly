class EventRealBQ  extends MapEvent{
	public constructor(obj:any) {
		super(obj)
	}

	protected onLogTap(e:egret.Event){
		const lp:EvtLog = e.currentTarget
		lp.removeEventListener("touchTap", this.onLogTap, this)
		lp.dispose()

		const mc = this._mc

		let fupNpc:number = 0
		let arr:NpcObj[] = []
		if(mc.npc['run']!=undefined){
			mc.npc['run'] += 0.5
			fupNpc++
		}
		if(mc.npc['ib']!=undefined){
			mc.npc['ib'] += 0.5
			fupNpc++
		}
		for(let npc of Liver.allLivers){
			if(npc.ID == 'run' || npc.ID == 'ib'){
				arr.push({
					...npc,
					favor:mc.npc[npc.ID]
				})
			}
			if(arr.length == fupNpc)break
		}
		const np:NpcPanel2 = WorldMap.showNpcPanel(arr)


		const data = this.netas[0]
		const neta = NetaFactory.getNetaFromObj(data)
		const ngp:NetaGetPanel = this._mc.netaBag.modifyNeta(neta, 'get', true)
		ngp.addEventListener(eui.UIEvent.REMOVED_FROM_STAGE, (e)=>{
			this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
		}, this)

	}
}