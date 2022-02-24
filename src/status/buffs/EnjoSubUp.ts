/**炎上可以增加粉丝的buff */
class EnjoSubUp  extends Buff{
	private _st:Stream
	private _up:number
	/**
	 * @param d 每炎上一次增加的粉丝数
	 */
	public constructor(mc:MainCharacter, d:number=10000,t:number=1) {
		super(mc)
		this.name = '炎上对应强化'
		this.des = '直播时发生炎上会增加粉丝'
		this.iconUrl = 'icons_json#mic'
		this.time = [t, 'S']
		this._up = d
	}

	public streamCD(){
		super.streamCD()
		if(this._st){
			this._st.removeEventListener(GameEvents.STREAM_ENJO, this.onEnjo, this)
			this._st = null
		}
	}

	public effect(obj:TargetObj){
		if(!obj.stream) return
		this._st = obj.stream
		this._st.addEventListener(GameEvents.STREAM_ENJO, this.onEnjo, this)
	}

	private onEnjo(e:egret.Event){
		if(!this._st) return
		this._st.totSubAdd += this._up
	}	


}