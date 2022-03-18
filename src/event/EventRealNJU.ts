class EventRealNJU  extends MapEvent{
	private logs:string[]
	public constructor(obj:any) {
		super(obj)
		let logs:string[] = []
		for(let evt of obj['evt']){
			logs.push(evt['data'])
		}
		this.logs = logs
	}

	public trigger(mc:MainCharacter, cell:CellData):EvtPanel|IDisposable{
		let log:string
		let neta:Neta

		let over4:number = 0
		let over3:number = 0
		//npc中一个达到最高4或两个达到3可以获得nju neta
		for(let id of mc.npc.IDs){
			const f = mc.npc.getF(id)
			if(f >= 3){
				over3 ++
			}
			if(over3 >= 2){
				break
			}
			if(f >= 4){
				over4 ++ 
				break
			}
			
		}

		if(over4>=2 || over3>=2){
			log = this.logs[1]
			neta = NetaFactory.getNetaFromObj(this.netas[0])
		}else{
			log = this.logs[0]
		}
		
		// const el = WorldMap.showEvtLog(log)
		const el = new EvtLog(log)
		this.dispatchEvent(new ShowEvent(el, 'menu'))
		el.once("touchTap", (e)=>{
			el.dispose()
			if(neta){
				const ngp:NetaGetPanel = mc.netaBag.modifyNeta(neta, 'get', true)
				ngp.once(eui.UIEvent.REMOVED_FROM_STAGE, (e)=>{
					this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
				}, this)
			}else{
				this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
			}
		}, this)

		return null
	}
}