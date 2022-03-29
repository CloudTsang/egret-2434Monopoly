class FavorLock extends Buff{
	public constructor(mc:MainCharacter, t:number=0) {
		super(mc, t)
		this.name = '好感度固定'
		this.des = '无法提升NPC好感度'
		this.time = [t,'T']
	}

	public on(){
		this.mc.npc.lock = true
	}

	public off(){
		this.mc.npc.lock = false
	}
}