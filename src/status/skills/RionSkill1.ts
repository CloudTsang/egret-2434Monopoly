class RionSkill1 extends Skill{
	public constructor(mc:MainCharacter, data:any) {
		super(mc, data)
	}

	public triggerStream(stream:Stream){
		if(this.phrase.indexOf("STREAM") < 0){
			return
		}
		
		console.log("skill : ", this.name)
		WorldMap.showSkillBar(this)
		stream.totSubAdd += (stream.collaboMems.length) * 10000
	}

}