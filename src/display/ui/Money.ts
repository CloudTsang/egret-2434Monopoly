class Money  extends eui.Component{
	private txtMoney:eui.Label
	private _num:number
	private _cb:()=>void
	private _tw:egret.Tween
	public constructor() {
		super();
		this.skinName = 'resource/eui_skins/money.exml'
	}

	public setNum(v:number){
		if(this._tw){
			this._tw.setPaused(true)
			this._tw = null
		}
		this.txtMoney.text = ""+v
		this._num = v		
	}

	public setTween2Num(v:number, cb:()=>void=null){
		this._tw = egret.Tween.get(this)
		.to({
			num:v
		}, 1000)
		.call(()=>{
			cb && cb()
		})
	}

	private set num(v:number){
		v = Math.floor(v)
		this.txtMoney.text = ''+v
		this._num = v
	}
	private get num(){
		return this._num
	}
}