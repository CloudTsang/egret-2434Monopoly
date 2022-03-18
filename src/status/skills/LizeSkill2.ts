class LizeSkill2 extends Skill{
	public constructor(mc:MainCharacter, data:any) {
		super(mc, data)
	}

	public triggerBag(bag:NetaBag){
		const base = Roll.random(this.mc).n
		this.setHalfValue(bag.game, base)
		this.setHalfValue(bag.song, base)
		this.setHalfValue(bag.device, base)
		super.triggerBag(bag)
	}

	private setHalfValue(n:Neta[], base:number){
		if(!n) return
		for(let d of n){
			const tmp = Roll.random2(10)
			if(tmp<=base){
				console.log(`${d.name}价格减半`)
				d.value /= 2
			}
		}
	}
}