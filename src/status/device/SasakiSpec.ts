class SasakiSpec  extends Device {
	public constructor(obj:any) {
		super(obj)
	}

	public onUse(obj:TargetObj):any{
		const mc:MainCharacter = obj.player
		const npc = obj.npc as BaseLiver
		if(!mc || !npc) return
		mc.npc[npc.ID] += 5
		const npcobj:NpcObj = {
			...npc,
			favor:mc.npc[npc.ID]
		}
		// WorldMap.showNpcPanel([npcobj])
		this.dispatchEvent(new NpcEvent([npcobj]))
		this.dispatchEvent(new egret.Event(GameEvents.DEVICE_FINISH))
	}
}