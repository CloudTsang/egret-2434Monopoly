class NpcFavour {
	protected gift:{[key:number]:number}
	protected npcs:{[key:number]:number}
	public constructor() {
		this.gift = {}
		this.npcs = {}
		for(let k of Liver.allLivers){
			this.npcs[k.id] = 1
			this.gift[k.id] = 0
		}
	}

	public checkHasGift():string{
		for(let key in this.npcs){
			if(this.gift[key] == 0 && this.npcs[key] >= 3){
				return key
			}
		}
		return null
	}

	public set all(v:number){
		for(let k of Liver.allLivers){
			const f:number = this.npcs[k.id]
			let f2 = f+v
			if(f2<0) f2 = 0
			this.npcs[k.id] = f2 
		}
	}

	public get all(){
		return 0
	}

	public set random(v:number){
		const i = Math.floor(Math.random()*Liver.allLivers.length)
		const k = Liver.allLivers[i]
		const f:number = this.npcs[k.id]
		let f2 = f+v
		if(f2<0) f2 = 0
		this.npcs[k.id] = f2 
	}

	public get random(){
		return 0
	}
}