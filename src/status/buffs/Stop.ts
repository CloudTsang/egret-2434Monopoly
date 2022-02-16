class Stop extends Buff{
	public constructor(mc:MainCharacter, t:number=1) {
		super(mc, t)
		this.name = '停止'
		this.des = '跳过一次行动'
		this.iconUrl = "icons_json#stopbuff"
		this.time = [t,'T']
		this.on()
	}
}