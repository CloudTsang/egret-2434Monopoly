class Donguri extends Device {
	private readonly ELF_NPC:string[] = ['chaika', 'elu', 'eli', 'gweru']
	public constructor(obj:any) {
		super(obj)
	}

	public onUse(obj:TargetObj):any{
		const mc:MainCharacter = obj.player
		if(!mc) return

		const i = Math.floor(Math.random()*this.ELF_NPC.length)
		const id = this.ELF_NPC[i]
		mc.npc[id] += 1
		let arr:NpcObj[]
		for(let n of Liver.allLivers){
			if(n.ID == id){
				arr = [{
					...n,
					favor:mc.npc[id]
				}]
			}
		}
		if(arr.length > 0){
			const np = new NpcPanel2(arr)
			np.once(eui.UIEvent.REMOVED_FROM_STAGE, (e)=>{
				np.dispose()
			}, this)
			this.dispatchEvent(new ShowEvent(np, 'top'))
			this.dispatchEvent(new egret.Event(GameEvents.DEVICE_FINISH))
		}else{
			this.dispatchEvent(new egret.Event(GameEvents.DEVICE_FINISH))
		}
		
		
	}
}