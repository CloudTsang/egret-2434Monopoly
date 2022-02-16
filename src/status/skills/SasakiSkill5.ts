class SasakiSkill5  extends Skill{
	private counter:number
	private startCounting:boolean
	public constructor(mc:MainCharacter, data:any) {
		super(mc, data)
		this.counter = 0
	}

	public shouldTrigger(phrase:string,v:number=0):boolean{
		if(phrase == GamePhrase.STREAM_ACCIDENT || phrase == GamePhrase.STREAM_ENJO){
			if(this.startCounting){
				return false
			}
			if(v <= 0.85){
				console.warn("SasakiSkill5 开始计数")
				this.startCounting = true
				this.counter = 0
				return false
			}
			return false
		}
		if(phrase == GamePhrase.TURN_START && this.startCounting){
			this.counter ++ 
			return false 
		}
		if(phrase == GamePhrase.BEFORE_STREAM  && this.startCounting){
			return true
		}
	}

	public triggerStream(stream:Stream){
		console.log("skill : ", this.name)
		WorldMap.showSkillBar(this)
		this.mc.subscribe += this.counter * 10000
		this.startCounting = false
		this.counter = 0
	}
}