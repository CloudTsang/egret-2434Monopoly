class AccidentGuard extends Buff{
	public constructor(mc:MainCharacter,t:number=1) {
		super(mc,t)
		this.name = "事故无效"
		this.time = [t,"E"]
	}
}