class EventRealBQ  extends MapEvent{
	public constructor(obj:any) {
		super(obj)
	}

	protected onLogTap(e:egret.Event){
		const lp:EvtLog = e.currentTarget
		lp.removeEventListener("touchTap", this.onLogTap, this)
		lp.dispose()

		const mc = this._mc

		const fupNpc:number = 2
		let arr:NpcObj[] = []
		mc.npc.modify('run', 1)
		mc.npc.modify('ib', 1)
		
		for(let npc of Liver.allLivers){
			if(npc.ID == 'run' || npc.ID == 'ib'){
				arr.push({
					...npc,
					favor:mc.npc.getF(npc.ID)
				})
			}
			if(arr.length == fupNpc)break
		}
		this.dispatchEvent(new NpcEvent(arr))


		const data = this.netas[0]
		const neta = NetaFactory.getNetaFromObj(data)
		const ngp:NetaGetPanel = this._mc.netaBag.modifyNeta(neta, 'get', true)
		ngp.addEventListener(eui.UIEvent.REMOVED_FROM_STAGE, (e)=>{
			this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
		}, this)

	}
}