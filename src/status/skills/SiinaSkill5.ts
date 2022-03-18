class SiinaSkill5 extends Skill{
	public constructor(mc:MainCharacter, data:any) {
		super(mc, data)
	}

	public triggerRollResult(r:string){
		switch(r){
			case RollResult.BIG_FAIL:
				r = RollResult.FAIL
				break
			case RollResult.FAIL:
				r = RollResult.NORMAL
				break
			case RollResult.NORMAL:
				r = RollResult.SUCCESS
				break
			case RollResult.SUCCESS:
				r = RollResult.BIG_SUCCESS
				break
			case RollResult.BIG_SUCCESS:
				return r
		}
		super.triggerRollResult(r)
		return r
	}
}