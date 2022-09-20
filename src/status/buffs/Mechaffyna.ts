class Mechaffyna extends Buff{
	public constructor(mc:MainCharacter,t:number=1) {
		super(mc,t)
		this.name = "炎上小妖精"
		this.des = '直播效果和炎上概率上升'
		this.iconUrl = 'icons_json#mechaffyna'
		this.time = [t,"S"]
	}

	public effect(obj:TargetObj){
		if(obj.stream){
			obj.stream.baseRate += 1.5
			obj.stream.enjoBaseRate += 0.2 
		}
		this.time[0] --
	}
}