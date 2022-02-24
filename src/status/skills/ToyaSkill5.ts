class ToyaSkill5 extends Skill{
	private loliLivers:string[]
	public constructor(mc:MainCharacter, data:any) {
		super(mc, data)
		let lolis:string[]=[]
		for(let liver of Liver.allLivers){
			if(liver.tag && liver.tag.indexOf("loli") >= 0){
				lolis.push(liver.ID)
			}
		}
		this.loliLivers = lolis
		
	}

	public triggerStream(stream:Stream){
		let loliNum:number = 0
		for(let mem of stream.collaboMems){
			if(this.loliLivers.indexOf(mem) >= 0){
				loliNum ++
			}
		}
		if(loliNum == 0){
			return
		}
		super.triggerStream(stream)
	}
}