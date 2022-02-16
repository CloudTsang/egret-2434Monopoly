class Subscribe extends eui.Component{
	private txtSubscribe:eui.Label
	private _num:number
	private _cb:()=>void
	public constructor() {
		super();
		this.skinName = 'resource/eui_skins/subscribe.exml'
	}

	public setNum(v:number){
		this._num = v
		this.txtSubscribe.text = ""+v
	}

	public setTween2Num(v:number, cb:()=>void=null){
		// this._num = v
		egret.Tween.get(this)
		.to({
			num:v
		}, 1500)
		.wait(500)
		.call(()=>{
			cb && cb()
		})
	}

	private set num(v:number){
		v = Math.floor(v)
		this.txtSubscribe.text = ''+v
		this._num = v
	}
	private get num(){
		return this._num
	}
}