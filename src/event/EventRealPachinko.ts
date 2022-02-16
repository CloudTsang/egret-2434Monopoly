class EventRealPachinko  extends MapEvent{
	private _cell:CellData
	public constructor(obj:any) {
		super(obj)
	}

	public trigger(mc:MainCharacter, cell:CellData):EvtPanel|IDisposable{
		this._cell = cell
		const ep = super.trigger(mc, cell) as EvtPanel
		const cm = ep.customMenu
		if(mc.money < 10000){
			cm.setItemsDisable(0, true)
		}
		if(mc.money < 100000){
			cm.setItemsDisable(1, true)
		}
		return ep
	}

	protected onSelected(e:egret.TouchEvent){
		const index = e.data.index
		switch(index){
			case 0:
			this.pachinkoHandler(10000)
			break
			case 1:
			this.pachinkoHandler(100000)
			break
			case 2:
			this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
			break
		}
	}

	private pachinkoHandler(money:number){
		this.dispatchEvent(new egret.Event(GameEvents.EVENT_START))

		const mc = this._mc
		let {n, r} = Roll.random(mc) 
		// r = RollResult.BIG_SUCCESS
		let money2 = 0
		switch(r){
			case RollResult.BIG_SUCCESS:
				money2 = money + money * 10
				break
			case RollResult.SUCCESS:
				money2 = money + money * 2
				break
			case RollResult.NORMAL:
				money2 = money + money + (Roll.random2(2000)-1000)
				break
			case RollResult.FAIL:
				money2 = - money / 2
				break
			case RollResult.BIG_FAIL:
				money2 = - money
				break
		}

		this._mc.money -= money
		egret.Tween.get(this)
		.wait(500)
		.call(()=>{
			WorldMap.showRollNum(n, r)
			// this._mc.money += money2	
		})
		.wait(1000)
		.call(()=>{
			const el = WorldMap.showPayGainPanel(money2)	
			this._mc.money += money2	
			el.addEventListener("touchTap", (e)=>{							
				this._mc = null
				el.dispose()
				this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
			}, this)
		})
	}

	private get mcMoney(){
		return this._mc?this._mc.money : 0
	}
	private set mcMoney(v:number){
		if(this._mc)this._mc.money = v
	}
}