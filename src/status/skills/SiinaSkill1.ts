class SiinaSkill1  extends Skill{
	public constructor(mc:MainCharacter, data:any) {
		super(mc, data)
	}

	public triggerStream(stream:Stream){
		stream.baseRate += this.mc.luck/10
		console.log("skill : ", this.name)
		this.dispatchEvent(new SkillEvent(this))
		this.triggered = true
	}
}