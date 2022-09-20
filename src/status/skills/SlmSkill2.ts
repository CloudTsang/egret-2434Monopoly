class SlmSkill2 extends Skill{
	public constructor(mc:MainCharacter, data:any) {
		super(mc, data)
	}

	public trigger(){
		console.log("skill : ", this.name)
		// WorldMap.showSkillBar(this)
		const mc = this.mc
		const tmp = Roll.random2(8)
		switch(tmp){
			case 0:
				mc.data.commu += 1
				break
			case 1:
				mc.data.game += 1
				break
			case 2:
				mc.data.luck += 1
				break
			case 3:
				mc.data.sense += 1
				break
			case 4:
				mc.data.sing += 1
				break
			case 5:
				mc.data.strength += 1
				break
			case 6:
				mc.data.talk += 1
				break
			case 7:
				mc.data.tech += 1
				break
		}
		this.dispatchEvent(new SkillEvent(this))
		this.triggered = true
	}
}