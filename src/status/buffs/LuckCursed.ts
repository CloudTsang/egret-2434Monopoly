class LuckCursed  extends Buff{
	public constructor(mc:MainCharacter, t:number=1) {
		super(mc, t)
		this.name = '晦气诅咒'
		this.des = '被诅咒的状态，印堂发黑，运气大幅降低'
		this.iconUrl = "icons_json#cursed"
		this.time = [t,'T']
	}

	public on(){		
		this.mc.ddata.luck -= 5 
	}
}