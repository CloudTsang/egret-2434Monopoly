/**全能力变化buff */
class AllStatChange  extends Buff{
	private _delta:number
	private _arr:string[] = ['luck', 'sense', 'commu', 'strength', 'talk', 'game', 'sing', 'tech']
	public constructor(mc:MainCharacter, d:number, t:number=1) {
		super(mc, t)
		this._delta = d
		this.on()
		
	}

	public on(){
		const ddata = this.mc.ddata
		const d = this._delta
		for(let prop of this._arr){
			ddata[prop] += d
		}
	}

}