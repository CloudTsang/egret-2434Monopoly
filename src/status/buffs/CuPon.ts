/**芙莲的3回合sense降低buff */
class CuPon  extends Buff{
	public constructor(mc:MainCharacter, t:number=3) {
		super(mc, t)
		this.name = '胸前运动短裤'
		this.des = '持续时间内能力降低'
		this.iconUrl = "icons_json#cupon"
		this.time = [t,'T']
	}

	public on(){		
		this.mc.ddata.sense -= 3
	}
}