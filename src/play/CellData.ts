class CellData extends egret.EventDispatcher implements ISavable{
	private _r:MapEvent
	private _v:MapEvent
	public npcs:number[]

	private _curE:MapEvent
	private _events:string[]
	public constructor(r:MapEvent, v:MapEvent){
		super()
		this._r = r
		this._v = v
		this.npcs = []
	}

	public getNpc(favors:NpcFavour|{[key:string]:number}):NpcObj[]{
		let ret:NpcObj[] = []
		
		for(let index of this.npcs){
			const liver = Liver.allLivers[index]
			const f = favors[liver.ID]
			ret.push({
				ID:liver.ID,
				name:liver.name,
				des:liver.des,
				iconUrl:liver.iconUrl,
				favor:f
			})
		}
		return ret
	}

	/**触发事件 */
	public trigger(isv:boolean,	 mc:MainCharacter){
		const e = this.getEvent(isv)
		this._curE = e
		if(this._events){
			for(let estr of this._events){
				e.addEventListener(estr, this.onEvent, this)
			}
		}	
		return e.trigger(mc,this)
	}

	public addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): void{
		if(!this._events) this._events = []
		this._events.push(type)
		super.addEventListener(type, listener, thisObject, useCapture, priority)
	}

	public removeEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean): void{
		this._curE && this._curE.removeEventListener(type, this.onEvent, this)
		super.removeEventListener(type, listener, thisObject, useCapture)
	}

	private onEvent(e:egret.Event){		
		this.dispatchEvent(e)
	}

	public getEvent(isv:boolean){
		if(isv) return this._v
		else return this._r
	}
	public get r(){
		return this._r
	}
	public get v(){
		return this._v
	}

	public get saveObj(){
		return [this._r.name, this._v.name]
	}

	public toString(){
		return [this._r.name, this._v.name]
	}
}
