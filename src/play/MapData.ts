
class MapData implements ISavable{
	protected datas:CellData[]
	protected rI:number[]
	protected vI:number[]
	protected r:MapEvent[]
	protected v:MapEvent[]
	protected livers:string[][]
	protected len:number
	protected allNpcIndexes:number[]
	public constructor(save:string[][]=null) {
		this.len = WorldData.cellNum * 4 - 4
		if(!save){
			this.createR()
			this.createV()
		}else{
			this.createR2(save)
			this.createV2(save)
		}
		
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
		// arr2[1] = 2

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

	public get length(){
		return this.datas.length
	}

	private createR2(save:string[][]){
		const data = this
		let objs:any[] = RES.getRes("events_real_1_json")
		objs = objs.filter((v:any)=>{return !v['disable']})
		let arr:MapEvent[] = []
		let arr2:number[] = []
		for(let i=0; i<objs.length; i++){
			const obj = objs[i]
			let fn = MapEvent
			if(obj['class']){
				fn = egret.getDefinitionByName(obj['class'])
				if(!fn) fn = MapEvent
			}
			arr.push(new fn(objs[i]))
		}
		for(let vre of save){
			let tmpi = 1
			for(let i=0; i<arr.length; i++){
				const n = arr[i].name
				const n2 = vre[1]
				if(n == n2){
					tmpi = i
					break
				}
			}
			arr2.push(tmpi)
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

	private createV2(save:string[][]){
		const data = this
		let objs:any[] = RES.getRes("events_virtual_1_json")

		objs = objs.filter((v:any)=>{return !v['disable']})

		let arr:MapEvent[] = []
		let arr2:number[] = []

		for(let i=0; i<objs.length; i++){
			const obj = objs[i]
			let fn = MapEvent
			if(obj['class']){
				fn = egret.getDefinitionByName(obj['class'])
				if(!fn) fn = MapEvent
			}
			arr.push(new fn(objs[i]))
		}
		for(let vre of save){
			let tmpi = 1
			for(let i=0; i<arr.length; i++){
				const n = arr[i].name
				const n2 = vre[0]
				if(n == n2){
					tmpi = i
					break
				}
			}
			arr2.push(tmpi)
		}
		data.v = arr
		data.vI = arr2
	}

	/**分配npc位置 */
	public shuffleLiver(){
		const data = this
		const cells = data.datas
		// const l = Liver.allLivers.length - 4
		data.getAllNpcsList()

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
		//分配每格至少一个npc
		for(let i=0; i<data.len; i++){
			cells[i].npcs.push(data.allNpcIndexes[i])
		}

		for(let i=data.len;i<data.allNpcIndexes.length; i++){
			const cellI = Math.floor(Math.random()*(data.len-1))+1
			if(cells[cellI].npcs.length >= 3){
				continue
			}
			cells[cellI].npcs.push(data.allNpcIndexes[i])
		} 
		
	}

	protected getAllNpcsList(){
		if(this.allNpcIndexes){
			return
		}
		let npcIndexes = []
		for(let i=0;i<Liver.allLivers.length; i++){
			npcIndexes.push(i)
		}
		this.allNpcIndexes = npcIndexes
	}

	public get saveObj(){
		let arr = []
		for(let d of this.datas){
			arr.push([d.v.name, d.r.name])
		}
		return arr
	}
}