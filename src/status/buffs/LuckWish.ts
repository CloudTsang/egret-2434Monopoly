class LuckWish extends Buff{
	public constructor(mc:MainCharacter, t:number=1) {
		super(mc, t)
		this.name = '神的加护(运)'
		this.des = '运气大幅提高，效果逐回合降低'
		this.iconUrl = "icons_json#luckbuff"
		this.time = [t,'T']
		this.on()
	}

	public on(){		
		this.mc.ddata.luck += this.time[0] + 1
	}
}