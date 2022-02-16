class EventRealJojoen  extends MapEvent{
	private _cell:CellData
	public constructor(obj:any) {
		super(obj)
	}

	public trigger(mc:MainCharacter, cell:CellData):EvtPanel|IDisposable{
		this._cell = cell
		const ep = super.trigger(mc, cell) 
		const cm = (ep as EvtPanel).customMenu
		if(mc.money < 50000 || cell.npcs.length == 0){
			//cm.setItemsDisable(1, true)
		}
		if(mc.money < 10000){
			cm.setItemsDisable(0, true)
		}
		return ep
	}

	protected onSelected(e:egret.TouchEvent){
		const index = e.data.index
		switch(index){
			case 0:
			this.soloHandler()
			break
			case 1:
			this.collaboHandler()
			break
			case 2:
			this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
			break
		}
	}

	private soloHandler(){
		this.dispatchEvent(new egret.Event(GameEvents.EVENT_START))
		const mc = this._mc
		let {n, r} = Roll.random(mc)
		if(r != RollResult.BIG_SUCCESS){
			mc.money -= 10000
		}
		
		const  [logIndex, netaIndex, buffTime, favor] = this.getRollData(r)
		const log = this.selections[0].roll.data[logIndex].log
		const netaData = this.netas[netaIndex]
		
		egret.Tween.get(this)
		.wait(100)
		.call(()=>{
			WorldMap.showRollNum(n, r)
			const buff = new StomachFull(mc, buffTime)
			mc.getBuff(buff)
		})
		.wait(500)
		.call(()=>{
			const el = WorldMap.showEvtLog(log)
			el.addEventListener("touchTap", (e)=>{
				el.dispose()
				const neta = NetaFactory.getNetaFromObj(netaData)
				const ngp = mc.netaBag.modifyNeta(neta, 'get', true)
				ngp.addEventListener(GameEvents.NETA_INFO_FINISH, (e)=>{
					this._mc = null
					this._cell = null
					this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
				}, this)
			}, this)
		})		
	}

	private collaboHandler(){
		this.dispatchEvent(new egret.Event(GameEvents.EVENT_START))
		const mc = this._mc
		let {n, r} = Roll.random(mc)
		// r = RollResult.BIG_SUCCESS
		if(r != RollResult.BIG_SUCCESS){
			mc.money -= 50000
		}
		
		const  [logIndex, netaIndex, buffTime, favor] = this.getRollData(r)
		const log = this.selections[1].roll.data[logIndex].log
		const netaData = this.netas[netaIndex]
		
		egret.Tween.get(this)
		.wait(100)
		.call(()=>{
			WorldMap.showRollNum(n, r)
			const buff = new StomachFull(mc, buffTime)
			mc.getBuff(buff)
			for(let n of this._cell.npcs){
				mc.npc[Liver.allLivers[n].id]+=favor
			}
			const objs:NpcObj[] = this._cell.getNpc(this._mc.npc)
			const np = WorldMap.showNpcPanel(objs)
		})
		.wait(500)
		.call(()=>{
			const el = WorldMap.showEvtLog(log)
			el.addEventListener("touchTap", (e)=>{
				el.dispose()
				const neta = NetaFactory.getNetaFromObj(netaData)
				const ngp = mc.netaBag.modifyNeta(neta, 'get', true)
				ngp.addEventListener(GameEvents.NETA_INFO_FINISH, (e)=>{
					this._mc = null
					this._cell = null
					this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
				}, this)
			}, this)
		})		
	}

	private getRollData(r:RollResult){
		let logIndex:number
		let netaIndex:number 
		let buffTime:number
		let favor:number
		switch(r){
			case RollResult.BIG_SUCCESS:
				logIndex = 0
				netaIndex = 0
				buffTime = 10
				favor = 1
				break
			case RollResult.SUCCESS:
				logIndex = 1
				netaIndex = 1
				buffTime = 8
				favor = 1
				break
			case RollResult.NORMAL:
				logIndex = 2
				netaIndex = -1
				buffTime = 5
				favor = 1
				break
			case RollResult.FAIL:
				logIndex = 3
				netaIndex = 2
				buffTime = 3
				favor = 0.5
				break
			case RollResult.BIG_FAIL:
				logIndex = 4
				netaIndex = 3
				buffTime = 1
				favor = 0.5
				break
		}
		return [logIndex, netaIndex, buffTime, favor]
	}
}