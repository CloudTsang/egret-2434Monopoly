class StreamBuffGame extends Buff{
	public constructor(mc:MainCharacter, t:number=1) {
		super(mc)
		this.name = '游戏直播强化'
		this.time = [t, 'T']
	}
}

class StreamBuffSing extends Buff{
	public constructor(mc:MainCharacter, t:number=1) {
		super(mc)
		this.name = '歌回直播强化'
		this.time = [t, 'T']
	}
}

class StreamDebuffBan extends Buff{
	public constructor(mc:MainCharacter, t:number=1) {
		super(mc)
		this.name = '直播风险提高'
		this.time = [t, 'T']
	}
}

class StreamBuffCollabo extends Buff{
	public constructor(mc:MainCharacter, t:number=1) {
		super(mc)
		this.name = '联动强化'
		this.time = [t, 'T']
	}
}