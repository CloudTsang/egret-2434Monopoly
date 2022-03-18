class NpcFavour {
	protected gift:{[key:number]:number}
	private keyArr:string[]
	public lock:boolean
	public constructor() {
		this.lock = false
		this.gift = {}
		this.keyArr = []
		for(let k of Liver.allLivers){
			this[k.ID] = 1
			this.keyArr.push(k.ID)
			this.gift[k.ID] = 0
		}
	}

	public modify(id:string, value:number){
		let ori = this[id]
		if(!this.lock && ori!=NaN && ori!=undefined){
			ori += value
			if(ori<0)ori=0
		}
		this[id] = ori
		return ori
	}

	public getF(id:string){
		return this[id]
	}

	public get IDs(){
		return this.keyArr
	}

	// public *iterator() {
	// 	for (let key of this.keyArr) {
	// 		yield this[key];
	// 	}
	// }

	public getGift(key:string){
		this.gift[key] = 1
	}

	public checkHasGift():string{
		for(let key of this.keyArr){
			if( this.gift[key]  == 0 && this[key] >= 3){
				return key
			}
		}
		return null
	}

	public set all(v:number){
		for(let k of this.keyArr){
			const f:number = this[k]
			let f2 = f+v
			if(f2<0) f2 = 0
			this[k] = f2 
		}
	}

	public get all(){
		return 0
	}

	public set random(v:number){
		const i = Math.floor(Math.random()*this.keyArr.length)
		const k = this.keyArr[i]
		const f:number = this[k]
		let f2 = f+v
		if(f2<0) f2 = 0
		this[k] = f2 
	}

	public get random(){
		return 0
	}
}