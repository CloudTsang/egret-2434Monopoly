class ChaikaSkill3 extends Skill {
	public constructor(mc:MainCharacter, data:any) {
		super(mc, data)
	}


	public triggerNeta(neta:Neta, stream?:Stream){
		if(neta.pop > 2){
			return 
		}
		neta.meme = 0
		console.log("skill : ", this.name)
		this.dispatchEvent(new SkillEvent(this))
	}
}