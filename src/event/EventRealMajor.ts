class EventRealMajor  extends MapEvent{
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
		if(mc.edata.major){
			log = this.logs[0]
			neta = NetaFactory.getNetaFromObj(this.netas[1])
		}else if(mc.subscribe>=300000 && mc.sing>=8){
			log = this.logs[1]
			neta = NetaFactory.getNetaFromObj(this.netas[0])
			mc.edata.major = true
		}else if(mc.subscribe>=200000 && mc.sing>=6){
			log = this.logs[2]
		}else if(mc.subscribe>=100000 && mc.sing>=4){
			log = this.logs[3]
		}else{
			log = this.logs[4]
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