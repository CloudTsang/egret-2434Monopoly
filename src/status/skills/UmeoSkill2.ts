class UmeoSkill2 extends Skill{
	public constructor(mc:MainCharacter, data:any) {
		super(mc, data)
	}

	public triggerStream(stream:Stream){
		if(stream.collaboMems.length<2){
			return
		}
		stream.baseRate += 2
		console.log("skill : ", this.name)
		this.dispatchEvent(new SkillEvent(this))
		this.triggered = true
	}
}