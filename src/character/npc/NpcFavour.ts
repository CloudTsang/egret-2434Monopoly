class NpcFavour implements ISavable{
	protected gift:{[key:string]:number}
	private keyArr:string[]
	
	public lock:boolean
	public constructor(saveObj:any=null) {
		const t = this
		t.lock = false
		t.gift = {}
		t.keyArr = []
		for(let k of Liver.allLivers){
			t.keyArr.push(k.ID)
			if(saveObj && saveObj[k.ID]){
				t[k.ID] = saveObj[k.ID][0]
				t.gift[k.ID] = saveObj[k.ID][1]
			}else{
				t[k.ID] = 1
				t.gift[k.ID] = 0
			}
			
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
		const t = this
		for(let key of t.keyArr){
			if( t.gift[key]  == 0 && t[key] >= 3){
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

	public get saveObj(){
		const t = this
		const obj = {}
		for(let key of t.keyArr){
			obj[key] = [ t[key], t.gift[key] ]
		}
		return obj
	}
	
	public set saveObj(v:any){
		const t = this
		for(let key in v){
			const tmp:number = v[key]
			t[key] = tmp[0]
			t.gift[key] = tmp[1]
		}
	}
}