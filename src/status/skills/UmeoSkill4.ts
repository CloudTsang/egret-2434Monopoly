class UmeoSkill4   extends Skill{
	public constructor(mc:MainCharacter, data:any) {
		super(mc, data)
	}

	public shouldTrigger(phrase:string,v:number=0):boolean{
		if(!this.effect){//效果没做好
			return false
		}
		if(this._cd > 0){//cd没转好
			return false
		}
		if(this.triggered && !this.always){//已经发动技能了
			return false
		}
		//IN_STREAM字符串包含在IN_STREAM_COLLABO和IN_STREAM_SOLO中也能触发技能
		if(this.phrase.indexOf(phrase)<0){
			return false
		}
		return true
	}

	public triggerStream(stream:Stream){
		let value = 10
		if(stream.totalPop >= value){
			return
		}
		this.mc.anti += 50
		stream.accidentBaseRate += 2
		console.log("skill : ", this.name)
		this.dispatchEvent(new SkillEvent(this))
		this.triggered = true
	}
}