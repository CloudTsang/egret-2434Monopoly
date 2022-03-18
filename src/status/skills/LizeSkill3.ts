class LizeSkill3 extends Skill{
	public constructor(mc:MainCharacter, data:any) {
		super(mc, data)
	}

	public triggerRollResult(r:string){
		if(this.mc.currentMode){
			console.log(`<虚拟>不触发${this.name}`)
			return r
		}
		if(r == RollResult.NORMAL || r == RollResult.FAIL){
			r = RollResult.BIG_FAIL
		}else{
			return r
		}
		super.triggerRollResult(r)
		return r
	}
}