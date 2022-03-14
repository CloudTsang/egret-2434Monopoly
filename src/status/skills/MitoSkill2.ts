class MitoSkill2 extends Skill{
	public constructor(mc:MainCharacter, data:any) {
		super(mc, data)
	}

	public triggerStream(stream:Stream){
		console.log("skill : ", this.name)
		// WorldMap.showSkillBar(this)
		this.dispatchEvent(new SkillEvent(this))
		stream.curAccident = false
	}
}