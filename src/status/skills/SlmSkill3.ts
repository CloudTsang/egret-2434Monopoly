class SlmSkill3 extends Skill{
	public constructor(mc:MainCharacter, data:any) {
		super(mc, data)
	}

	public triggerNumber(v:number){
		v = super.triggerNumber(v)
		//获得金钱变0.8倍
		v *= 0.8
		return v
	}
}