class NormalVirtual extends MapEvent {
	private _el:EvtLog
	private _cell:CellData
	public constructor(obj:any) {
		super(obj)
	}

	public trigger(mc:MainCharacter, cell:CellData):EvtPanel|IDisposable{
		this._cell = cell
		return super.trigger(mc, cell)
		// ep.addEventListener(GameEvents.ACTION_CONFIRM, this.onSelect, this)
	}

	protected onSelected(e:egret.Event){
		// this.dispatchEvent(new egret.Event(GameEvents.EVENT_START))
		const ty = e.data.ty
		const {n, r} = Roll.random(this._mc)
		const index = e.data.index
		
		switch(ty){
			case GameEvents.WATCH:
				this.onWatch(index)
				break
			case GameEvents.REST:
				this.onRest(index)
				break
		}
	}

	private onWatch(index:number){
		this.dispatchEvent(new egret.Event(GameEvents.EVENT_START))
		let {n, r} = Roll.random(this._mc)
		let livers:BaseLiver[] = []
		const mc = this._mc
		for(let n of this._cell.npcs){
			livers.push(Liver.allLivers[n])
		}
		let log:string = ''

		let fn:()=>void = ()=>{
					this.onLogTap()
				}
		//test
		// r = RollResult.BIG_SUCCESS
		switch(r){
			case RollResult.BIG_SUCCESS:
				//全部liver好感度上升1，且获得杂谈neta 
				log = this.selections[index].evt[4].log
				for(let l of livers){
					mc.npc[l.ID] += 1
				}
				fn = ()=>{
					const getNeta = NetaFactory.getNeta(NetaType.TALK)
					const np = this._mc.netaBag.modifyNeta(getNeta, "get", true)
					if(np){
						this._el && this._el.dispose()
						np.addEventListener(GameEvents.NETA_INFO_FINISH, this.onLogTap, this)
					}
				}
				break
			case RollResult.SUCCESS:
				//全部liver好感度上升1
				log = this.selections[index].evt[3].log
				for(let l of livers){
					mc.npc[l.ID] += 1
				}
				break
			case RollResult.NORMAL:
				//随机单个liver好感度上升1
				log = this.selections[index].evt[2].log
				const n = Math.floor(Math.random()*livers.length)
				mc.npc[livers[n].ID] += 1
				log = log.replace("{result}", livers[n].name)
				break
			case RollResult.FAIL:
				//随机单个liver好感度少许上升0.5
				log = this.selections[index].evt[1].log
				const m = Math.floor(Math.random()*livers.length)
				mc.npc[livers[m].ID] += 0.5
				log = log.replace("{result}", livers[m].name)
				break
			case RollResult.BIG_FAIL:
				//全部liver好感度上升0.1
				log = this.selections[index].evt[0].log
				for(let l of livers){
					mc.npc[l.ID] += 0.1
				}
				break
		}

		egret.Tween.get(this)
		.wait(200)
		.call(()=>{
			WorldMap.showRollNum(n, r)
		})
		.wait(500)
		.call(()=>{
			const objs:NpcObj[] = this._cell.getNpc(this._mc.npc)
			//test
			// console.log("NpcObjs : ", objs)
			const np = WorldMap.showNpcPanel(objs)
			const evtLog = WorldMap.showEvtLog(log)
			this._el = evtLog
			evtLog.addEventListener("touchTap", (e)=>{
				fn && fn()
			}, this)

		})
	}

	private onRest(index:number){
		this.dispatchEvent(new egret.Event(GameEvents.EVENT_START))
		const oriLog = this.selections[index].log
		const {n, r} = Roll.random(this._mc)
		let rate = this.getUpRate(r)
		const arr = ['commu','talk','strength','sense','sing','game','tech']
		const i = Math.floor(Math.random()*arr.length)
		const prop = arr[i]
		if(rate == 0) rate = 0.5
		const log = this.getLog(oriLog, r, prop)
		let fn:()=>void = ()=>{
			console.log(`${prop}+${rate}`)
			this._mc.data[prop] += rate
			
		}

		egret.Tween.get(this)
		.wait(200)
		.call(()=>{
			WorldMap.showRollNum(n, '')
		})
		.wait(500)
		.call(()=>{
			fn()
			const evtLog = WorldMap.showEvtLog(log)
			this._el = evtLog
			evtLog.addEventListener("touchTap", (e)=>{
				
				this.onLogTap()
			}, this)

		})
	}

	protected onLogTap(e:any=null){
		this._el && this._el.dispose()
		this._el = null
		this._mc = null
		this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
	}

	private getLog(oriLog:string, r:RollResult, prop:string=''){
		let words = RES.getRes("words_json")
		return oriLog.replace("{result}", words['propName'][prop])
	}

	private getUpRate(r:RollResult){
		switch(r){
			case RollResult.BIG_SUCCESS:
				return 2
			case RollResult.SUCCESS:
				return 1.5
			case RollResult.NORMAL:
				return 1
			case RollResult.FAIL:
				return 0.5
			case RollResult.BIG_FAIL:
				return 0.1
		}
	}
}