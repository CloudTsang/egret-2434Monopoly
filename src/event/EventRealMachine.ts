class EventRealMachine  extends MapEvent{
	public constructor(obj:any) {
		super(obj)
	}

	public trigger(mc:MainCharacter, cell:CellData):EvtPanel|IDisposable{
		const ep = super.trigger(mc, cell) as EvtPanel
		const cm:CustomMenu = ep.customMenu
		if(cm && mc.money < 100){
			cm.setItemsDisable(0, true)			
		}
		return ep
	}

	protected onSelected(e:egret.Event){
		const i = e.data.index
		switch(i){
			case 0:
			//买瓶饮料
			this.buyHandler()
				break
			case 1:
			//用力踢一脚
			this.kickHandler()
				break
			case 2:
			//趴下去看看机子底下
			this.bottomHandler()
				break				
			case 3:
			//什么都不做
			this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
				break
				
		}
	}

	private buyHandler(){
		this.dispatchEvent(new egret.Event(GameEvents.EVENT_START))
		const neta = NetaFactory.getNetaFromObj(this.netas[0])
		egret.Tween.get(this)
		.wait(200)
		.call(()=>{
			this._mc.money -= 100
			const ngp = this._mc.netaBag.modifyNeta(neta, "get", true)
			if(ngp){
				ngp.addEventListener(eui.UIEvent.REMOVED_FROM_STAGE, (e)=>{
					this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
				}, this)
			}
		})
	}

	private kickHandler(){
		this.dispatchEvent(new egret.Event(GameEvents.EVENT_START))
		let {n,r} = Roll.random(this._mc, "strength")
		//test
		// r = RollResult.BIG_SUCCESS
		let fn:(e:any)=>void
		let log:string
		switch(r){
			case RollResult.BIG_SUCCESS:
				log = this.selections[1].roll.evt[0].log
				fn = (e)=>{
					const el:EvtLog = e.currentTarget
					el.dispose()
					const neta = NetaFactory.getNetaFromObj(this.netas[0])
					const ngp = this._mc.netaBag.modifyNeta(neta, "get", true)
					if(ngp){
						ngp.addEventListener(eui.UIEvent.REMOVED_FROM_STAGE, (e)=>{
							this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
						}, this)
					}
				}
				break
			case RollResult.SUCCESS:
				log = this.selections[1].roll.evt[1].log
				fn = (e)=>{
					const el:EvtLog = e.currentTarget
					el.dispose()
					this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
				}
				break
			case RollResult.NORMAL:
				log = this.selections[1].roll.evt[2].log
				fn = (e)=>{
					const el:EvtLog = e.currentTarget
					el.dispose()
					const buff = new Stop(this._mc, 1)
					this._mc.getBuff(buff)
					this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
				}
				break
			case RollResult.FAIL:
				log = this.selections[1].roll.evt[3].log
				fn = (e)=>{
					const el:EvtLog = e.currentTarget
					el.dispose()
					this._mc.money -= 30000
					setTimeout(()=>{
						this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
					}, 1500)				
				}
				break
			case RollResult.BIG_FAIL:
				log = this.selections[1].roll.evt[4].log
				fn = (e)=>{
					const el:EvtLog = e.currentTarget
					el.dispose()
					this._mc.money -= 20000
					this._mc.data.strength -= 1
					setTimeout(()=>{
						this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
					}, 1500)				
				}
				break
		}

		egret.Tween.get(this)
		.wait(500)
		.call(()=>{
			// WorldMap.showRollNum(n, r)
			this.dispatchEvent(new RollEvent(n,r))
		})
		.wait(1000)
		.call(()=>{
			// const el = WorldMap.showEvtLog(log)
			const el = new EvtLog(log)
			this.dispatchEvent(new ShowEvent(el, 'menu'))
			el.addEventListener("touchTap", fn, this)
		})

	}

	private bottomHandler(){
		this.dispatchEvent(new egret.Event(GameEvents.EVENT_START))
		let {n,r} = Roll.random(this._mc)
		//test
		// r = RollResult.BIG_SUCCESS
		let fn:(e:any)=>void
		let log:string
		switch(r){
			case RollResult.BIG_SUCCESS:
				log = this.selections[2].roll.evt[0].log
				fn = (e)=>{
					const el:EvtLog = e.currentTarget
					el.dispose()
					const neta = NetaFactory.getNetaFromObj(this.netas[1])
					const ngp = this._mc.netaBag.modifyNeta(neta, "get", true)
					this._mc.money -= 10000
					if(ngp){
						ngp.addEventListener(eui.UIEvent.REMOVED_FROM_STAGE, (e)=>{
							this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
						}, this)
					}
				}
				break
			case RollResult.SUCCESS:
				log = this.selections[2].roll.evt[1].log
				this._mc.money += 100
				fn = (e)=>{
					const el:EvtLog = e.currentTarget
					el.dispose()
					this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
				}
				break
			case RollResult.NORMAL:
				log = this.selections[2].roll.evt[2].log
				this._mc.money += 10
				fn = (e)=>{
					const el:EvtLog = e.currentTarget
					el.dispose()
					this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
				}
				break
			case RollResult.FAIL:
				log = this.selections[2].roll.evt[3].log
				this._mc.data.sense -= 1
				fn = (e)=>{
					const el:EvtLog = e.currentTarget
					el.dispose()
					this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
				}
				break
			case RollResult.BIG_FAIL:
				log = this.selections[2].roll.evt[4].log	
				this._mc.netaBag.lostNeta(NetaType.TALK)			
				fn = (e)=>{
					const el:EvtLog = e.currentTarget
					el.dispose()
					this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
				}
				break
		}

		egret.Tween.get(this)
		.wait(500)
		.call(()=>{
			// WorldMap.showRollNum(n, r)
			this.dispatchEvent(new RollEvent(n,r))
		})
		.wait(1000)
		.call(()=>{
			// const el = WorldMap.showEvtLog(log)
			const el = new EvtLog(log)
			this.dispatchEvent(new ShowEvent(el, 'menu'))
			el.addEventListener("touchTap", fn, this)
		})


	}
}