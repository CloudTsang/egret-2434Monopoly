class EventRealEnkr  extends MapEvent{
	public constructor(obj:any) {
		super(obj)
	}
	public trigger(mc:MainCharacter, cell:CellData):EvtPanel|IDisposable{
		const ep = super.trigger(mc, cell) 
		const cm = (ep as EvtPanel).customMenu
		
		if(mc.money < 200000 || !this._mc.edata.has3D){
			cm.setItemsDisable(0, true)
		}
		if(mc.money < 50000){
			cm.setItemsDisable(1, true)
		}
		if(this._mc.edata.has3_0){
			cm.setItemsDisable(2, true)
		}
		return ep
	}

	protected onSelected(e:egret.TouchEvent){
		const index = e.data.index
		switch(index){
			case 0: 
				this.getPresentHandler(this.selections[0].data, 200000)                                                 
			break
			case 1:
				this.getPresentHandler(this.selections[1].data, 50000)
			break
			case 2:
			this.get3_0Handler()
			break
			case 3:
			this.rikuHandler()
			break
			case 4:
			this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
			break
		}
	}

	private getPresentHandler(n:string,m:number){
		this.dispatchEvent(new egret.Event(GameEvents.EVENT_START))
		const neta = NetaFactory.getPresentNeta(n)
		setTimeout(()=>{
			this._mc.money -= m
			const ngp = this._mc.netaBag.modifyNeta(neta, 'get', true)
			ngp.addEventListener(eui.UIEvent.REMOVED_FROM_STAGE, (e)=>{
				this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
			}, this)
		}, 200)
	}

	private get3_0Handler(){
		this.dispatchEvent(new egret.Event(GameEvents.EVENT_START))
		 let {n, r} = Roll.random(this._mc)
		 let log:string = ''
		 let neta:Neta
		//  r = RollResult.BIG_SUCCESS
		 if(r == RollResult.BIG_SUCCESS){
			 log = this.selections[2].evt[1]
		 }else{
			 log = this.selections[2].evt[0]
			 r = ''
		 }
		 
		 egret.Tween.get(this)
		 .wait(200)
		 .call(()=>{
			 WorldMap.showRollNum(n, r)
		 })
		 .wait(1000)
		 .call(()=>{
			const el = WorldMap.showEvtLog(log)
			el.addEventListener("touchTap", (e)=>{
				el.dispose()
				if(r == RollResult.BIG_SUCCESS){
					this._mc.edata.has3_0 = true
					this.getPresentHandler(this.selections[2].data, 0)
				}
				else this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
			}, this)
		 })
	}

	private rikuHandler(){
		this.dispatchEvent(new egret.Event(GameEvents.EVENT_START))
		let {n, r} = Roll.random(this._mc, "commu")
		r = RollResult.BIG_FAIL
		const evt:any[] = this.selections[3].roll.evt
		let fn:(e:any)=>void
		let log:string
		switch(r){
			case RollResult.BIG_SUCCESS:
				if(!this._mc.edata.major){
					log = evt[0].log
					fn = (e)=>{
						const el = e.currentTarget
						el.dispose()
						const netadata = this.netas[0]
						const neta = NetaFactory.getNetaFromObj(netadata)
						const ngp = this._mc.netaBag.modifyNeta(neta, "get", true)
						this._mc.edata.major = true
						ngp.addEventListener(eui.UIEvent.REMOVED_FROM_STAGE, (e)=>{
							this._mc = null
							this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
						}, this)
					}
				}else{
					log = evt[0].log2
					fn = (e)=>{
						const el = e.currentTarget
						el.dispose()
						const netadata = this.netas[1]
						const neta = NetaFactory.getNetaFromObj(netadata)
						const ngp = this._mc.netaBag.modifyNeta(neta, "get", true)
						ngp.addEventListener(eui.UIEvent.REMOVED_FROM_STAGE, (e)=>{
							this._mc = null
							this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
						}, this)
					}
				}
				
			break
			case RollResult.SUCCESS:
				log = evt[1].log
				fn = (e)=>{
					const el = e.currentTarget
					el.dispose()
					const buff = new SpeedyRaise(this._mc, 5)
					this._mc.getBuff(buff)
					this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
				}

			break
			case RollResult.NORMAL:
				log = evt[2].log
				fn = (e)=>{
					const el = e.currentTarget
					el.dispose()
					this._mc.money += 20000
					setTimeout(()=>{
						this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
					}, 2000)
				}
			break
			case RollResult.FAIL:
				log = evt[3].log
				fn = (e)=>{
					const el = e.currentTarget
					el.dispose()
					this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
				}
			break
			case RollResult.BIG_FAIL:
				log = evt[4].log
				fn = (e)=>{
					const el = e.currentTarget
					el.dispose()
					this._mc.npc.all -= 0.5
					this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
				}
			break
		}

		egret.Tween.get(this)
		.wait(200)
		.call(()=>{
			WorldMap.showRollNum(n, r)
		})
		.wait(1500)
		.call(()=>{
			const el = WorldMap.showEvtLog(log)
			el.addEventListener("touchTap", fn, this)
		})
	}
}