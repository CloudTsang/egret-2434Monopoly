class Lunpapa extends Buff{
	public constructor(mc:MainCharacter, t:number=3) {
		super(mc, t)
		this.name = '55kg'
		this.des = '行动时只能前进1格'
		// this.iconUrl = "icons_json#lunpapa"
		this.time = [t,'T']
	}
}