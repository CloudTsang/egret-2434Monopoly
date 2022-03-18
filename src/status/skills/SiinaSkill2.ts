class SiinaSkill2  extends Skill{
	private resistLivers:string[]
	public constructor(mc:MainCharacter, data:any) {
		super(mc, data)
		let resist:string[]=[]
		for(let liver of Liver.allLivers){
			if(liver.tag && liver.tag.indexOf("resist") >= 0){
				resist.push(liver.ID)
			}
		}
		this.resistLivers = resist
	}
	public triggerStream(stream:Stream){
		// console.log(this.resistLivers)
		let resistNum:number = 0
		for(let mem of stream.collaboMems){
			if(this.resistLivers.indexOf(mem) >= 0){
				resistNum ++
			}
		}
		//test
		// resistNum = 1
		if(resistNum == 0){
			return
		}
		super.triggerStream(stream)
	}
}