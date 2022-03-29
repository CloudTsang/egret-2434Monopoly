class StomachFull extends Buff{
	public constructor(mc:MainCharacter, t:number=1) {
		super(mc, t)
		this.name = '满腹'
		this.des = '体力大幅提高，效果逐回合降低'
		this.iconUrl = "icons_json#full"
		this.time = [t,'T']
	}

	public on(){		
		this.mc.ddata.strength += this.time[0] + 1
	}
}