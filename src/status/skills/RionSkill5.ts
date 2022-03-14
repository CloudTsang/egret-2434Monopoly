class RionSkill5  extends Skill{
	/**好用的切片计数 */
	public niceClip:number
	/**获得额外粉丝的回合数 */
	private clipTurn:number
	public constructor(mc:MainCharacter, data:any) {
		super(mc, data)
		this.niceClip = 0
		this.clipTurn = 0
	}

	public shouldTrigger(phrase:string,v:number=0):boolean{
		if(this.niceClip == 0){
			return false
		}
		if(phrase == GamePhrase.TURN_START){
			if(this.clipTurn == 3){
				return true
			}
			else{
				this.clipTurn ++
				return false
			}
		}
		
		return super.shouldTrigger(phrase)
	}

	public trigger(){
		console.log("skill : ", this.name)
		// WorldMap.showSkillBar(this)
		this.dispatchEvent(new SkillEvent(this))
		this.mc.subscribe += this.niceClip * 5000
		this.clipTurn = 0
	}

	public triggerStream(stream:Stream){
		if(this.phrase.indexOf("STREAM") < 0){
			return
		}
		console.log("skill : ", this.name)
		// WorldMap.showSkillBar(this)
		this.dispatchEvent(new SkillEvent(this))
		this.niceClip ++ 
	}
}