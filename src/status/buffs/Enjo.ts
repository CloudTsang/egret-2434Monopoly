class Enjo  extends Buff{
	private _sw:boolean
	public constructor(mc:MainCharacter, t:number=1) {
		super(mc, t)
		this.name = '炎上'
		this.des = '炎上期间粉丝停止自然增长'
		this.iconUrl = "icons_json#fire"
		this.time = [t,'T']
		this._sw = false
		this.on()
	}

	public on(){
		if(this._sw)return 
		this._sw = true
		this.mc.dispObj.showFire(true)
	}

	public off(){
		this._sw = false
		this.mc.dispObj.showFire(false)
	}

	
}