class EventRealChurch  extends MapEvent{
	public constructor(obj:any) {
		super(obj)
	}

	protected onSelected(e:egret.TouchEvent){
		const index = e.data.index
		switch(index){
			case 0: 
			this.wishHandler()
			break
			case 1:
			this.confessHandler()
			break
			case 2:
			this.donateHandler()
			break
			case 3:
			this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
			break
		}
	}

	protected wishHandler(){
		this.dispatchEvent(new egret.Event(GameEvents.EVENT_START))
		const n = Roll.random2(6)
		const log = this.selections[0].log
		egret.Tween.get(this)
		.wait(200)
		.call(()=>{
			WorldMap.showRollNum(n, '')
		})
		.wait(1000)
		.call(()=>{
			const el = WorldMap.showEvtLog(log)
			el.addEventListener("touchTap", (e)=>{
				const buff = new LuckWish(this._mc, n)
				this._mc.getBuff(buff)
				el.dispose()
				this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
			}, this)
		})
	}

	protected confessHandler(){
		this.dispatchEvent(new egret.Event(GameEvents.EVENT_START))
		const log = this.selections[2].log
		egret.Tween.get(this)
		.wait(200)
		.call(()=>{
			const el = WorldMap.showEvtLog(log)
			el.addEventListener("touchTap", (e)=>{
				const buff = new EnjoGuard(this._mc)
				this._mc.removeBuff("Enjo")
				this._mc.getBuff(buff)
				el.dispose()
				this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
			}, this)
		})
	}

	protected donateHandler(){
		this.dispatchEvent(new egret.Event(GameEvents.EVENT_START))
		const log = this.selections[2].log

		const mc = this._mc
		const m = mc.money > 10000?10000:mc.money

		egret.Tween.get(this)
		.wait(200)
		.call(()=>{
			const el = WorldMap.showEvtLog(log)
			el.addEventListener("touchTap", (e)=>{
				mc.npc['sister']+=1
				mc.anti -= 100
				mc.money -= m
				el.dispose()
				this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
			}, this)
		})

	}
}