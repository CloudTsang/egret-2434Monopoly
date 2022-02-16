class RionSkill2 extends Skill{
	public constructor(mc:MainCharacter, data:any) {
		super(mc, data)
	}

	public triggerNeta(neta:Neta, stream?:Stream){
		const name = neta.name
		if(!name.match(/(半泽直树)|(鬼灭之刃)|(原神)|(塞尔达传说)|(东京复仇者)|(热门动画)/g)){
			return
		}
		super.triggerNeta(neta, stream)
	}
}