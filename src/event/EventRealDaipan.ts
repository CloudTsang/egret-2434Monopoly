class EventRealDaipan  extends MapEvent{
	private logs:string[]

	private usedNeta:Neta
	public constructor(obj:any) {
		super(obj)
		let logs:string[] = []
		for(let evt of obj['evt']){
			logs.push(evt['data'])
		}
		this.logs = logs
	}

	public trigger(mc:MainCharacter, cell:CellData):EvtPanel|IDisposable{
		this._mc = mc
		this.usedNeta = null	
		let log:string
		if(mc.ID == 'sasaki' || mc.ID == 'yashiro'){
			log = this.logs[0]
			this.usedNeta = NetaFactory.getNetaFromObj(this.netas[0])
		}else if(mc.edata.has3D){
			log = this.logs[1]
			this.usedNeta = NetaFactory.getNetaFromObj(this.netas[0])
		}else{
			log = this.logs[2]
		}

		const el = WorldMap.showEvtLog(log)
		el.once("touchTap", this.onLogTap, this)

		return null
	}

	protected onLogTap(e:egret.Event){
		const el:EvtLog = e.currentTarget
		el.dispose()
		const mc:MainCharacter = this._mc
		const neta:Neta = this.usedNeta

		let fupNpc:number = 0
		let arr:NpcObj[] = []
		if(mc.npc['sasaki']!=undefined){
			mc.npc['sasaki'] += 0.5
			fupNpc++
		}
		if(mc.npc['yashiro']!=undefined){
			mc.npc['yashiro'] += 0.5
			fupNpc++
		}
		for(let npc of Liver.allLivers){
			if(npc.ID == 'sasaki' || npc.ID == 'yashiro'){
				arr.push({
					...npc,
					favor:mc.npc[npc.ID]
				})
			}
			if(arr.length == fupNpc)break
		}
		const np:NpcPanel2 = WorldMap.showNpcPanel(arr)


		if(neta){
			const ngp:NetaGetPanel = mc.netaBag.modifyNeta(neta, 'get', true)
			ngp.once(eui.UIEvent.REMOVED_FROM_STAGE, (e)=>{
				this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
			}, this)
		}else{
			np.once(eui.UIEvent.REMOVED_FROM_STAGE, (e)=>{
				this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
			}, this)
			
		}
		
	}
}