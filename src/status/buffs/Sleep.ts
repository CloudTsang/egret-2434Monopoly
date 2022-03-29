class Sleep extends Buff{
	private _sw:boolean
	public constructor(mc:MainCharacter, t:number=1) {
		super(mc, t)
		this.name = '睡眠'
		this.des = '跳过一次行动'
		this.iconUrl = "icons_json#sleep"
		this.time = [t,'T']
		this._sw = false
	}

	public on(){
		if(this._sw)return 
		this._sw = true
		this.mc.dispObj.showSleep(true)
	}

	public off(){
		this._sw = false
		this.mc.dispObj.showSleep(false)
	}
}