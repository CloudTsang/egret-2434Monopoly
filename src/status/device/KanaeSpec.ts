class KanaeSpec  extends Device {
	public constructor(obj:any) {
		super(obj)
	}

	public onUse(obj:TargetObj):any{
		const mc:MainCharacter = obj.player
		if(!mc) return
		const r = Math.random() <= 0.5
		let log:string
		if(r){
			SoundManager.instance.playBgs('success2_mp3')
			mc.data.game += 3
			log = this.effect[0]['log2']
		}else{
			log = this.effect[0]['log']
		}
		// let el = WorldMap.showEvtLog(log)
		const el = new EvtLog(log)
		this.dispatchEvent(new ShowEvent(el, 'menu'))
		el.addEventListener("touchTap", (e)=>{
			el.dispose()
			this.dispatchEvent(new egret.Event(GameEvents.DEVICE_FINISH))
		}, this)
	}
}