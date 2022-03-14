class TamakiSpec extends Device{
	private effectType:number[]
	private _mc:MainCharacter
	public constructor(obj:any) {
		super(obj)
		this.effectType = [1,2,3,4,5,6]
	}

	public onUse(obj:TargetObj):any{
		const mc:MainCharacter = obj.player
		if(!mc) return
		this._mc = mc
		
		// const el = WorldMap.showEvtLog(this.effect[0].data)
		const el = new EvtLog(this.effect[0].data)
		this.dispatchEvent(new ShowEvent(el, 'menu'))
		el.addEventListener("touchTap", (e)=>{
			el.dispose()
			this.roll()
		}, this)
		// this.roll()
	}

	protected roll(){
		const m = Math.floor(Math.random()*this.effectType.length) 
		const n = this.effectType[m]
		let buff:Buff;
		switch(n){
			case 1:
				//<急上升>
				buff = new StreamRaise(this._mc, 3, 1)
				this._mc.getBuff(buff)
				break
			case 2:
				//<饱腹>
				buff = new StomachFull(this._mc, 3)
				this._mc.getBuff(buff)
				break
			case 3:
				//<睡眠>状态
				buff = new Sleep(this._mc, 1)
				this._mc.getBuff(buff)
				break
			case 4:
				//全能力+1
				buff = new AllStatChange(this._mc, 1, 1)
				this._mc.getBuff(buff)
				break
			case 5:
				//全能力-1
				buff = new AllStatChange(this._mc, -1, 1)
				this._mc.getBuff(buff)
				break
			case 6:
				//<发光>状态
				buff = new Light(this._mc, 1)
				this._mc.getBuff(buff)
				SoundManager.instance.playBgs('success2_mp3')
				break
		}
		this.effectType.splice(m,1)

		egret.Tween.get(this)
		.call(()=>{
			// WorldMap.showRollNum(n, '')
			this.dispatchEvent(new RollEvent(n,''))
		})
		.wait(1000)
		.call(()=>{
			const again = this.rollAgain(this._mc)
			if(again && this.effectType.length > 0){
				this.roll()
			}else{
				this.dispatchEvent(new egret.Event(GameEvents.DEVICE_FINISH))
			}
		})
	}

	private rollAgain(mc:MainCharacter){
		//test
		// return true
		const {n, r} = Roll.random(mc)
		return r == RollResult.SUCCESS || r == RollResult.BIG_SUCCESS
	}
}