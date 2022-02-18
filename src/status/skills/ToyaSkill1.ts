class ToyaSkill1 extends Skill {
	private counter:number
	
	public constructor(mc:MainCharacter, data:any) {
		super(mc, data)
		this._cd = 3
	}
	public cd(){
		
	}

	public shouldTrigger(phrase:string,v:number=0):boolean{
		if(phrase == GamePhrase.TURN_START){
			if(this._cd == 0){
				this._cd = 3
				return true
			}else{
				this._cd -- 
				return false
			}
			
		}
		return false
	}

}