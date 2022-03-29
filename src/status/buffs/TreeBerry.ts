class TreeBerry  extends Buff{
	/**体力降低值 */
	private _d:number
	public constructor(mc:MainCharacter, d:number=1, t:number=999999) {
		super(mc, t)
		this.name = '树莓'
		this.des = '持有树莓时体力降低'
		this._d = d
		this.time = [t,'T']
	}

	public on(){	
		this.mc.ddata.strength -= this._d
	}

	public off(){
		this.mc.ddata.strength += this._d
	}

	/**叠加同种buff效果 */
	public add(obj:Buff){
		console.log("add : ", this._d)
		this.mc.ddata.strength += this._d
		this._d ++ 
		this.mc.ddata.strength -= this._d
	}
}