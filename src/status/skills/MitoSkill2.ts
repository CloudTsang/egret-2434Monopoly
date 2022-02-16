class MitoSkill2 extends Skill{
	public constructor(mc:MainCharacter, data:any) {
		super(mc, data)
	}

	public triggerStream(stream:Stream){
		console.log("skill : ", this.name)
		WorldMap.showSkillBar(this)
		stream.curAccident = false
	}
}