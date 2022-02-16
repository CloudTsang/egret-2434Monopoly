/**直播效果大幅上升(倍率乘算) */
class SpeedyRaise extends Buff{
	public constructor(mc:MainCharacter,t:number=1) {
		super(mc,t)
		this.name = "急上升"
		this.des = '直播效果明显提升'
		this.iconUrl = 'icons_json#raise'
		this.time = [t,"E"]
	}

	public effect(obj:TargetObj){
		if(obj.stream){
			obj.stream.baseRate *= 2
		}
		this.time[0] --
	}
}