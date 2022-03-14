class SasakiSkill2  extends Skill{
	private upNum:number = 0
	public constructor(mc:MainCharacter, data:any) {
		super(mc, data)
	}

	public shouldTrigger(phrase:string,v:number=0):boolean{
		if(phrase == GamePhrase.TURN_START || phrase == GamePhrase.AFTER_STREAM){
			return true
		}
		return false
	}

	public trigger(){
		// return false
		console.log("skill : ", this.name)
		if(this.upNum == 0) this.dispatchEvent(new SkillEvent(this))//WorldMap.showSkillBar(this)
		this.upNum ++ 
		this.mc.ddata.strength += this.upNum
	}

	public triggerStream(stream:Stream){
		this.upNum = 0
	}
	
}