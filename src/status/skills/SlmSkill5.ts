class SlmSkill5 extends Skill{
	private _lastTriggerSubs:number
	private _step:number = 0.5
	/**能力提升倍率，触发技能时订阅提升超过20w时提升的倍率乘算 */
	private _trigCount:number
	public constructor(mc:MainCharacter, data:any) {
		super(mc, data)
		this._lastTriggerSubs = 100000
	}

	public shouldTrigger(phrase:string,v:number=0):boolean{
		const t = this
		if(phrase == GamePhrase.TURN_START){
			if(t.mc.subscribe >= t._lastTriggerSubs){
				//每增加10w订阅触发
				t._trigCount = Math.floor((t.mc.subscribe-t._lastTriggerSubs)/100000) + 1
				t._lastTriggerSubs += 100000
				return true
			}
		}
		
		return false
	}

	public trigger(){
		console.log("skill : ", this.name)
		const tmp = 0.5 * this._trigCount
		this._trigCount = 1
		const data = this.mc.data
		data.commu += tmp
		data.game += tmp
		data.luck += tmp
		data.sense += tmp
		data.sing += tmp
		data.strength += tmp
		data.talk += tmp
		data.tech += tmp
		this.dispatchEvent(new SkillEvent(this))
		
	}
}