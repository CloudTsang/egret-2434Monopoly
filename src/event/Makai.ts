class Makai extends MapEvent{
	public constructor(obj:any) {
		super(obj)
	}

	protected onSelected(e:egret.Event){
		const index:number = e.data.index
		switch(index){
			case 0:
				this.dispatchEvent(new egret.Event(GameEvents.EVENT_START))
				this.onSummon()
				break
			case 1:
				this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
				break
		}
	}

	private onSummon(){
		const roll = this.selections[0].roll
		let r = Roll.random2(roll.range)
		if(r==0)r=1

		egret.Tween.get(this)
		.wait(200)
		.call(()=>{
			// WorldMap.showRollNum(r, '')
			this.dispatchEvent(new RollEvent(r, ''))
		})
		.wait(500)
		.call(()=>{
			//test
			//r = 6
			switch(r){
				case 1:
					this.debiHandler()
					break
				case 2:
					this.inuiHandler()
					break
				case 3:
					this.roaHandler()
					break
				case 4:
					this.maimotoHandler()
					break
				case 5:
					this.luluHandler()
					break
				case 6:
					this.maoHandler()
					break
				
			}

		})
	}

	private debiHandler(){
		const mc = this._mc
		const data = this.selections[0].roll.evt[0]
		const netas = mc.netaBag.device

		let up = 0
		let i = 0
		while(i<netas.length){
			let n:Neta = netas[i]
			if(n.ID == 'unchi'){
				up += n.times * 0.5
			}
			else if(n.ID == 'unchi2'){
				up += n.times * 0.1
			}else{
				i ++
				continue
			}
			mc.netaBag.modifyNeta(n, "use", false, n.times)
		}

		let log:string = ''
		if(up == 0){
			log = data['log']
		}else{
			log = data['log2']
			mc.npc['debi'] += up
		}

		// const el:EvtLog = WorldMap.showEvtLog(log)
		const el = new EvtLog(log)
		this.dispatchEvent(new ShowEvent(el, 'menu'))
		if(el){
			el.addEventListener("touchTap", this.onLogTap, this)
		}
		
	}

	private inuiHandler(){
		const mc = this._mc
		const data = this.selections[0].roll.evt[1]
		let log:string = data['log']
		// const el:EvtLog = WorldMap.showEvtLog(log)
		const el = new EvtLog(log)
		this.dispatchEvent(new ShowEvent(el, 'menu'))
		mc.npc['inui'] += 0.5
		if(el){
			el.addEventListener("touchTap", this.onLogTap, this)
		}
	}

	private roaHandler(){
		const mc = this._mc
		const data = this.selections[0].roll.evt[2]
		const netadata = data.effect[0].data
		const log = data.log
		const n:Neta = NetaFactory.getNetaFromObj(netadata)
		// const el:EvtLog = WorldMap.showEvtLog(log)
		const el = new EvtLog(log)
		this.dispatchEvent(new ShowEvent(el, 'menu'))
		mc.npc['roa'] += 0.5
		
		if(el){
			el.addEventListener(egret.TouchEvent.TOUCH_TAP, (e)=>{
				el.dispose()
				const np:NetaGetPanel = mc.netaBag.modifyNeta(n, 'get', true)
				np.addEventListener(GameEvents.NETA_INFO_FINISH, (e)=>{
					this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
				}, this)
			}, this)
		}

	}

	private maimotoHandler(){
		const mc = this._mc
		const data = this.selections[0].roll.evt[3]
		let log = data['log']
		for(let i=0;i<mc.buffs.length;i++){
			const buff = mc.buffs[i]
			if(buff.ID == 'Enjo'){
				buff.off()
				mc.buffs.splice(i,1)
				log = data['log2']
				break
			}
		}
		// const el:EvtLog = WorldMap.showEvtLog(log)
		const el = new EvtLog(log)
		this.dispatchEvent(new ShowEvent(el, 'menu'))
		mc.npc['maimoto'] += 0.5
		
		if(el){
			el.addEventListener("touchTap", this.onLogTap, this)
		}
	}

	private luluHandler(){
		const mc = this._mc
		const data = this.selections[0].roll.evt[4]
		let log = data['log']
		mc.getBuff(new Sleep(mc, 1))
		// const el:EvtLog = WorldMap.showEvtLog(log)
		const el = new EvtLog(log)
		this.dispatchEvent(new ShowEvent(el, 'menu'))
		mc.npc['ruru'] += 0.5
		if(el){
			el.addEventListener("touchTap", this.onLogTap, this)
		}
	}

	private maoHandler(){
		const mc = this._mc
		const data = this.selections[0].roll.evt[5]
		const netadata = data.effect[0].data
		const log = data.log
		const n:Neta = NetaFactory.getNetaFromObj(netadata)
		// const el:EvtLog = WorldMap.showEvtLog(log)
		const el = new EvtLog(log)
		this.dispatchEvent(new ShowEvent(el, 'menu'))
		mc.npc['mao'] += 0.5
		if(el){
			el.addEventListener(egret.TouchEvent.TOUCH_TAP, (e)=>{
				el.dispose()
				const np:NetaGetPanel = mc.netaBag.modifyNeta(n, 'get', true)
				np.addEventListener(GameEvents.NETA_INFO_FINISH, (e)=>{
					this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
				}, this)
			}, this)
		}
	}
}