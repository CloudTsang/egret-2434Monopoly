class SasakiSkill1  extends Skill{
	public constructor(mc:MainCharacter, data:any) {
		super(mc, data)
	}

	public triggerNeta(neta:Neta, stream?:Stream){
		const name = neta.name
		if(!name.match(/(塞尔达)|(宝可梦)|(卡比)|(马里奥)/g)){
			return
		}
		super.triggerNeta(neta, stream)
	}
}