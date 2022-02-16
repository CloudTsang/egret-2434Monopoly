class CellData extends egret.EventDispatcher{
	private _r:MapEvent
	private _v:MapEvent
	public npcs:number[]
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
			const f = favors[liver.id]
			ret.push({
				id:liver.id,
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
		e.addEventListener(GameEvents.EVENT_START, this.onEvent, this)
		e.addEventListener(GameEvents.EVENT_FINISH, this.onEvent, this)
		return e.trigger(mc,this)
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
}

class MapData {
	private datas:CellData[]
	private rI:number[]
	private vI:number[]
	private r:MapEvent[]
	private v:MapEvent[]
	private livers:string[][]
	private len:number
	private allNpcIndexes:number[]
	public constructor() {
		this.len = WorldData.cellNum * 4 - 4
		this.createR()
		this.createV()

		let datas:CellData[] = []
		for(let i=0; i <this.len; i++){
			const cell = new CellData(this.r[this.rI[i]],this.v[this.vI[i]])
			datas.push(cell)
		}
		this.datas = datas
	}

	public getCell(i:number){
		return this.datas[i]
	}

	private createR(){
		const data = this
		let objs:any[] = RES.getRes("events_real_1_json")
		objs = objs.filter((v:any)=>{return !v['disable']})

		let arr:MapEvent[] = []
		let arr2:number[] = []
		let evtIndex:number[] = []
		let indexes:number[] = []

		for(let i=0; i<objs.length; i++){
			const obj = objs[i]
			let fn = MapEvent
			if(obj['class']){
				fn = egret.getDefinitionByName(obj['class'])
				if(!fn) fn = MapEvent
			}
			arr.push(new fn(objs[i]))
			evtIndex.push(i)
		}

		//初始化地图数组和索引数组
		for(let i=0; i<data.len; i++){
			if(i == 0){
				//位置0固定起点
				arr2.push(0)
				evtIndex.splice(0,1)
				continue
			}
			arr2.push(-1)
			indexes.push(i)
		}

		for(let i=1; i<data.len/4; i++){
			arr2[i] = 1
		}
		indexes.splice(0,data.len/4-1)
		//test
		// arr2[1] = 3

		//确保每个事件出现至少一次
		let i=0
		while(i<evtIndex.length){
			const index = indexes.splice(Math.floor(Math.random()*indexes.length),1)[0]
			arr2[index] = evtIndex[i]
			if(objs[evtIndex[i]]['times']){
				objs[evtIndex[i]]['times'] --
				if(objs[evtIndex[i]]['times'] == 0){
					evtIndex.splice(i,1)
					continue
				}
			}
			i++
		}
		
		//填充剩余格子
		while(indexes.length>0){
			const index = indexes.splice(Math.floor(Math.random()*indexes.length),1)[0]
			const isNormal = Math.random()<0.6 //50%日常格子
			const evtI:number = isNormal?0:Math.floor(Math.random()*evtIndex.length)
			arr2[index] = evtIndex[evtI]

			if(objs[evtIndex[evtI]]['times']){
				objs[evtIndex[evtI]]['times'] --
				if(objs[evtIndex[evtI]]['times'] == 0){
					evtIndex.splice(evtI,1)
					continue
				}
			}
		}
		data.r = arr
		data.rI = arr2
	}

	private createV(){
		const data = this
		let objs:any[] = RES.getRes("events_virtual_1_json")

		objs = objs.filter((v:any)=>{return !v['disable']})

		let arr:MapEvent[] = []
		let arr2:number[] = []
		let evtIndex:number[] = []
		let indexes:number[] = []

		for(let i=0; i<objs.length; i++){
			const obj = objs[i]
			let fn = MapEvent
			if(obj['class']){
				fn = egret.getDefinitionByName(obj['class'])
				if(!fn) fn = MapEvent
			}
			arr.push(new fn(objs[i]))
			evtIndex.push(i)
		}

		//初始化地图数组和索引数组
		for(let i=0; i<data.len; i++){
			if(i == 0){
				//位置0固定起点
				arr2.push(0)
				evtIndex.splice(0,1)
				continue
			}
			arr2.push(-1)
			indexes.push(i)
		}

		for(let i=1; i<data.len/4; i++){
			arr2[i] = 1
		}
		indexes.splice(0,data.len/4-1)
		//test
		// arr2[1] = 7

		//确保每个事件出现至少一次
		let i=0
		while(i<evtIndex.length){
			const index = indexes.splice(Math.floor(Math.random()*indexes.length),1)[0]
			arr2[index] = evtIndex[i]
			if(objs[evtIndex[i]]['times']){
				objs[evtIndex[i]]['times'] --
				if(objs[evtIndex[i]]['times'] == 0){
					evtIndex.splice(i,1)
					continue
				}
			}
			i++
		}
		

		//填充剩余格子
		while(indexes.length>0){
			const index = indexes.splice(Math.floor(Math.random()*indexes.length),1)[0]
			const isNormal = Math.random()<=0.5 //50%日常格子
			const evtI:number = isNormal?0:Math.floor(Math.random()*evtIndex.length)
			arr2[index] = evtIndex[evtI]
			if(objs[evtIndex[evtI]]['times']){
				objs[evtIndex[evtI]]['times'] --
				if(objs[evtIndex[evtI]]['times'] == 0){
					evtIndex.splice(evtI,1)
					continue
				}
			}
		}

		data.v = arr
		data.vI = arr2
	}

	/**分配npc位置 */
	public shuffleLiver(players:MainCharacter[]){
		const data = this
		const cells = data.datas
		const l = Liver.allLivers.length - 4
		data.getAllNpcsList(players)

		for(let cell of cells){
			cell.npcs = []
		}

		//打乱一次liver排序
		for(let i=0;i<data.allNpcIndexes.length; i++){
			const swI = Math.floor(Math.random()*data.allNpcIndexes.length)
			const tmp = data.allNpcIndexes[swI]
			data.allNpcIndexes[swI] = data.allNpcIndexes[i]
			data.allNpcIndexes[i] = tmp
		}

		const tmp = []
		for(let i=0;i<data.allNpcIndexes.length; i++){
			const cellI = Math.floor(Math.random()*(data.len-1))+1
			if(cells[cellI].npcs.length >= 3){
				continue
			}
			cells[cellI].npcs.push(data.allNpcIndexes[i])
		} 
		
	}

	private getAllNpcsList(players:MainCharacter[]){
		if(this.allNpcIndexes){
			return
		}
		let npcIndexes = []
		for(let i=0;i<Liver.allLivers.length; i++){
			const liver = Liver.allLivers[i]
			let isPlayer:boolean = false
			for(let liver2 of players){
				if(liver.name == liver2.name){
					isPlayer = true
					break
				}
			}
			if(isPlayer) continue
			npcIndexes.push(i)
		}
		this.allNpcIndexes = npcIndexes
	}
}