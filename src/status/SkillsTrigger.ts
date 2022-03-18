class SkillsTrigger {
	private _arr:Skill[]
	public constructor() {
		this._arr = []
	}
	public add(s:Skill){
		this._arr.push(s)
	}
	public trigger(){
		for(let s of this._arr){
			s.trigger()
		}
	}
	public triggerNeta(n:Neta, stream?:Stream){
		for(let s of this._arr){
			s.triggerNeta(n, stream)
		}
	}

	public triggerStream(stream:Stream){
		for(let s of this._arr){
			s.triggerStream(stream)
		}
	}

	public triggerBag(bag:NetaBag){
		for(let s of this._arr){
			s.triggerBag(bag)
		}
	}

	public triggerRollResult(r:string){
		for(let s of this._arr){
			r = s.triggerRollResult(r)
		}
		return r
	}
}