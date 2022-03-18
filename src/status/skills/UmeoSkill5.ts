class UmeoSkill5 extends Skill{
	public constructor(mc:MainCharacter, data:any) {
		super(mc, data)
	}

	public trigger(){
		const songs:SongNeta[] = this.mc.netaBag.song
		let t:boolean = false
		
		for(let s of songs){
			if(!s.usable){
				t = true
				s.clearCD()
			}
		}
		if(!t){
			return
		}
		console.log("skill : ", this.name)
		this.dispatchEvent(new SkillEvent(this))
		this.triggered = true
		
	}
}