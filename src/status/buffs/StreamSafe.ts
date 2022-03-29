class StreamSafe extends Buff{
	public constructor(mc:MainCharacter, t:number=1) {
		super(mc, t)
		this.name = '直播安全'
		this.des = '炎上和事故概率大幅降低'
		this.iconUrl = "icons_json#fireguard"
		this.time = [t,'S']
	}

	public effect(obj:TargetObj){
		if(obj.stream){
			const st = obj.stream
			st.accidentBaseRate -= 30
			st.enjoBaseRate -= 6.5
		}
		this.time[0] --
	}
}