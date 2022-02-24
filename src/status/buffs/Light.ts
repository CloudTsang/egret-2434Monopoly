/**发光状态，只是加一个发光滤镜，没有特殊效果 */
class Light extends Buff{
	private _sw:boolean
	public constructor(mc:MainCharacter, t:number=3) {
		super(mc, t)
		this.name = '圣光'
		this.des = '没有反应，只是在发光。'
		this.iconUrl = "icons_json#light"
		this.time = [t,'T']
		this._sw = false
		this.on()
	}

	/**叠加同种buff效果 */
	public add(obj:Buff){
		this.time[0] += 1
	}

	public on(){
		if(this._sw)return 
		this._sw = true
		this.mc.dispObj.showLight(true)
	}

	public off(){
		this._sw = false
		this.mc.dispObj.showLight(false)
	}
}