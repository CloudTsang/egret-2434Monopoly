class Tawagega extends Buff{
	public constructor(mc:MainCharacter, t:number=3) {
		super(mc, t)
		this.name = 'TA☆WA☆GE☆GA'
		this.des = '品位小幅上升且状态期间anti不会增长'
		this.iconUrl = "icons_json#tawagega"
		this.time = [t,'T']
	}

	public on(){		
		this.mc.ddata.sense += 2
		this.mc.antiLock = true
	}

	public off(){
		this.mc.ddata.sense -= 2
		this.mc.antiLock = false
	}

}