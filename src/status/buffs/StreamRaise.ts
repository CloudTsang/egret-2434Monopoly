/**直播效果上升(倍率加算) */
class StreamRaise extends Buff{
	protected _rate:number
	protected _tyLimit:StreamType
	/**
	 * @param mc 玩家角色
	 * @param t 持续时间
	 * @param d 倍率
	 * @param tyLimit 直播类型限制，默认值为null，对全类型直播有效
	 */
	public constructor(mc:MainCharacter,t:number=1,d:number=0.2, tyLimit:StreamType=null) {
		super(mc,t)
		this.name = "直播效果强化"
		this.des = '提高直播获得订阅数的基础倍率'
		this.iconUrl = 'icons_json#raise'
		this.time = [t,"E"]
		this._rate = d
		this._tyLimit = tyLimit
	}

	public effect(obj:TargetObj){
		if(obj.stream){
			if(this._tyLimit && obj.stream.type != this._tyLimit){
				return
			}
			obj.stream.baseRate += this._rate
		}
		this.time[0] --
	}

	public add(b:Buff){
		const b1:StreamRaise = b as StreamRaise
		if(!b1)return
		this._rate += b1.rate
		console.log(`${this.name}的效果叠加至${this._rate}`)
	}

	public get rate(){
		return this._rate
	}
}


/**直播效果上升 */
class StreamRaise_SING extends StreamRaise{
	public constructor(mc:MainCharacter,t:number=1,d:number=0.2) {
		super(mc,t,d, StreamType.SING)
		this.name = "歌回直播效果强化"
		this.des = '提高歌回直播获得订阅数的基础倍率'
		// this.iconUrl = ''
	}
}

/**直播效果上升 */
class StreamRaise_GAME extends StreamRaise{
	public constructor(mc:MainCharacter,t:number=1,d:number=0.2) {
		super(mc,t,d, StreamType.GAME)
		this.name = "游戏直播效果强化"
		this.des = '提高游戏直播获得订阅数的基础倍率'
		// this.iconUrl = ''
	}
}

/**直播效果上升 */
class StreamRaise_TALK extends StreamRaise{
	public constructor(mc:MainCharacter,t:number=1,d:number=0.2) {
		super(mc,t,d, StreamType.TALK)
		this.name = "杂谈直播效果强化"
		this.des = '提高杂谈直播获得订阅数的基础倍率'
		// this.iconUrl = ''
	}
}

/**直播效果上升 */
class StreamRaise_COLLABO extends StreamRaise{
	public constructor(mc:MainCharacter,t:number=1,d:number=0.2) {
		super(mc,t,d)
		this.name = "联动效果强化"
		this.des = '直播发生联动时提高获得订阅数的基础倍率'
		// this.iconUrl = ''
	}

	public effect(obj:TargetObj){
		if(obj.stream && obj.stream.collaboMems.length == 0) return
		super.effect(obj)
	}
}