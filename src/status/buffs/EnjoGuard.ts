class EnjoGuard extends Buff{
	public constructor(mc:MainCharacter, t:number=1) {
		super(mc, t)
		this.name = '神的加运(炎)'
		this.des = '直播中不会发生炎上'
		this.iconUrl = "icons_json#fireguard"
		this.time = [t,'S']
	}

}