class RTVSpec   extends Device {
	public constructor(obj:any) {
		super(obj)
	}

	public onUse(obj:TargetObj):any{
		const mc = obj.player
		const tgt = obj.tgtPlayer
		if(!mc || !tgt) return
		
		const tp = tgt[0]
		WorldMap.focusToPlayer(tp)
		.wait(100)
		.call(()=>{
			const b = new Stop(tp)
			tp.getBuff(b)
			tp.dispObj.showAttacked()
		})
		.wait(1000)
		.call(()=>{
			WorldMap.focusToPlayer(mc)
			this.dispatchEvent(new egret.Event(GameEvents.DEVICE_FINISH))
		})
		
	}
}