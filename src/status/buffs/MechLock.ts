class MechLock extends Buff{
	public constructor(mc:MainCharacter,t:number=1) {
		super(mc,t)
		this.name = "设备无效"
		this.des = 'PC设备的改变直播事故概率的效果无效'
		this.iconUrl = 'icons_json#mechlock'
		this.time = [t,"S"]
	}

	public on(){
		for(let d of this.mc.netaBag.equipment){
			const id = d.ID//egret.getQualifiedClassName(d)
			const isPC = id.indexOf('PC') >= 0
			if(!isPC) continue
			d.trigger = false
		}
	}

	public off(){
		for(let d of this.mc.netaBag.equipment){
			const id = d.ID//egret.getQualifiedClassName(d)
			const isPC = id.indexOf('PC') >= 0
			if(!isPC) continue
			d.trigger = true
		}

	}
}