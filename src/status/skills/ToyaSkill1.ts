class ToyaSkill1 extends Skill {
	private counter:number
	private readonly MAX_CD:number = 3
	public constructor(mc:MainCharacter, data:any) {
		super(mc, data)
		this._cd = this.MAX_CD
	}
	public cd(){
		
	}

	public shouldTrigger(phrase:string,v:number=0):boolean{
		if(phrase == GamePhrase.TURN_START){
			if(this._cd == 0){
				this._cd = this.MAX_CD
				return true
			}else{
				this._cd -- 
				return false
			}
			
		}
		return false
	}

}