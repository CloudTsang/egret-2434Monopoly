class StreamCommuUp extends Buff{
	public constructor(mc:MainCharacter, t:number=1) {
		super(mc)
		this.name = '司仪能力强化'
		this.des = '直播时交流力大幅上升'
		this.iconUrl = 'icons_json#mic'
		this.time = [t, 'S']
	}

	public effect(obj:TargetObj){
		if(!obj.mc)return
		obj.mc.commu += 5
	}
}