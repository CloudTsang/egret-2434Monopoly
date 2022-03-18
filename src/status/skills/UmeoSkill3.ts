class UmeoSkill3  extends Skill{
	public constructor(mc:MainCharacter, data:any) {
		super(mc, data)
	}

	public triggerBag(bag:NetaBag){
		let r = Roll.random(this.mc).r
		//test
		// r = RollResult.BIG_FAIL
		let value = 99999
		switch(r){
			case RollResult.BIG_FAIL:
				value = 4999
				break
			case RollResult.FAIL:
				value = 9999
				break
		}
		bag.valueLock = value
		super.triggerBag(bag)
	}
}