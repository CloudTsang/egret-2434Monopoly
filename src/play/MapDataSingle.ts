
class MapDataSingle implements ISavable{
	private _started:boolean = false
	protected datas:CellData[] = []
	protected rI:number[] = []
	protected vI:number[] = []
	protected r:MapEvent[]
	protected v:MapEvent[]
	protected len:number
	protected allNpcIndexes:number[]
	private _cellToShuffleLiver:number
	private readonly month:number = 30
	public constructor(save:string[][]=null) {
		this.generateMonthCell()
	}

	/**生成30格 */
	public generateMonthCell():CellData[]{
		const t = this
		const vI = t.createV()
		const rI = t.createR()
		if(vI.length != rI.length){
			throw new Error('Single mode map generation error!')
		}
		if(!t._started){
			t.datas.push(new CellData(t.r[0], t.v[0]))
			t._started = true
		}	
		let arr:CellData[] = []
		for(let i=0; i<vI.length; i++){
			const cell = new CellData(t.r[rI[i]], t.v[vI[i]])
			arr.push(cell)
		}
		// arr = t.shuffleLiver2(arr)
		t._cellToShuffleLiver = arr.length
		t.datas = t.datas.concat(arr)
		return arr
	}

	private createV():number[]{
		const data = this
		

		let arr2:number[] = []
		let indexes:number[] = []
		
		if(!data.v){
			let arr:MapEvent[] = []
			let objs:any[] = RES.getRes("events_virtual_1_json")
			objs = objs.filter((v:any)=>{return !v['disable']  && !v['singleDisable']})

			for(let i=0; i<objs.length; i++){
				const obj = objs[i]
				let fn = MapEvent
				if(obj['class']){
					fn = egret.getDefinitionByName(obj['class'])
					if(!fn) fn = MapEvent
				}
				arr.push(new fn(objs[i]))
			}
			data.v = arr
		}
		

		for(let i=0; i<data.month-1; i++){
			arr2.push(-1)
			indexes.push(i)
		}

		const tmp1 = 14
		//先安排x天普通格子
		for(let i=0; i<tmp1; i++){
			const index = indexes.splice(Math.floor(Math.random()*indexes.length), 1)[0]
			arr2[index] = 1
		}
		const tmp2 = data.month - 1 - tmp1
		for(let i=0;i<tmp2;i++){
			const index = indexes[i]
			const evtI:number = Math.floor(Math.random()*(data.v.length-1)) + 1
			arr2[index] = evtI
		}
		arr2[data.month - 1] = 0
		data.vI = data.vI.concat(arr2)
		return arr2
	}

	private createR():number[]{
		const data = this
		
		let arr2:number[] = []
		let indexes:number[] = []
		if(!data.r){
			let arr:MapEvent[] = []
			let objs:any[] = RES.getRes("events_real_1_json")
			objs = objs.filter((v:any)=>{return !v['disable'] })
			for(let i=0; i<objs.length; i++){
				const obj = objs[i]
				let fn = MapEvent
				if(obj['class']){
					fn = egret.getDefinitionByName(obj['class'])
					if(!fn) fn = MapEvent
				}
				arr.push(new fn(objs[i]))
			}
			data.r = arr
		}

		for(let i=0; i<data.month-1; i++){
			arr2.push(-1)
			indexes.push(i)
		}
		const tmp1 = 14
		//先安排x天普通格子
		for(let i=0; i<14; i++){
			const index = indexes.splice(Math.floor(Math.random()*indexes.length), 1)[0]
			arr2[index] = 1
		}
		const tmp2 = data.month - 1 - tmp1
		for(let i=0;i<tmp2;i++){
			const index = indexes[i]
			const evtI:number = Math.floor(Math.random()*(data.r.length-1)) + 1
			arr2[index] = evtI
		}
		arr2[data.month - 1] = 0
		data.rI = data.rI.concat(arr2)
		return arr2
	}
    
	public getCell(i:number){
		return this.datas[i]
	}

	/**分配npc位置 */
	public shuffleLiver(){
		const data = this
		if(data._cellToShuffleLiver == 0 || data._cellToShuffleLiver > data.datas.length) return
		const cells = data.datas.slice(data.datas.length - data._cellToShuffleLiver)
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
		for(let i=0; i<cells.length; i++){
			cells[i].npcs.push(data.allNpcIndexes[i])
		}
		for(let i=cells.length;i<data.allNpcIndexes.length; i++){
			const cellI = Math.floor(Math.random()*(cells.length))
			if(cells[cellI].npcs.length >= 3){
				continue
			}
			cells[cellI].npcs.push(data.allNpcIndexes[i])
		}
		data._cellToShuffleLiver = 0
		return cells
	}

	public removeSteppedCell(n:number){
		const t = this
		t.rI.splice(0, n)
		t.vI.splice(0, n)
		t.datas.splice(0, n)
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

	public get length(){
		return this.datas.length
	}

	public get saveObj(){
		let arr = []
		for(let d of this.datas){
			arr.push([d.v.name, d.r.name])
		}
		return arr
	}
}