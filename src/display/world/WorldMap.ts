class WorldMap extends eui.Component{
	private _dragController:DragController
	private mapContainer:eui.Group
	private cellContainer:eui.Group
	private bottomBar:eui.Group
	/**棋子移动时的存放图层 */
	private tmpContainer:eui.Group
	private menuContainer:eui.Group
	private topContainer:eui.Group
	private vrbtn:VRBtn
	private rollbtn:RollBtn
	private infobtn:LiverInfoBtn
	private bagbtn:eui.Image
	public subs:Subscribe
	public money:Money
	public liverMenu:LiversMenu

	private cellsArr:MapCell[]
	private cellsMap:{[key:string]:number}
	private chesses:Chess[]
	/**4个棋子所在格子的索引数组*/
	private chessArr:number[]
	private tw:egret.Tween
	private _lock:boolean
	private data:MapData

	private static instance:WorldMap
	public constructor(data:MapData) {
		super()
		this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this)
		
		this.touchChildren = true
		this.touchEnabled = true
		
		this.width = egret.MainContext.instance.stage.stageWidth
		this.height = egret.MainContext.instance.stage.stageHeight
		this.chesses = []
		this.data = data
		

		window['map'] = this
		WorldMap.instance = this
		this.skinName = 'resource/eui_skins/mainstage.exml'
	}

	public addMenu(menu:any){
		this.menuContainer.addChild(menu)
	}
	public removeMenu(menu:any){
		menu.parent && menu.parent.removeChild(menu)
	}

	/**把棋子添加到棋盘上显示
	 * @param c 棋子对象
	 * @param index 棋子的索引（显示棋盘格子内划分的四个区域）
	 * @param i 显示到特定格子索引
	 */
	public addChess(c:Chess, index:number, i:number=0, newChess:boolean=true){
		const cell = this.cellsArr[i]

		const a = cell.width/4
		let p = []
		if(index == 0){
			p = [1,2]
		}else if(index == 1){
			p = [3,2]
		}else if(index == 2){
			p = [1,4]
		}else if(index == 3){
			p = [3,4]
		}

		c.x = cell.x + a*p[0]
		c.y = cell.y + a*p[1]
		
		this.chesses.push(c)
		this.chessArr[index] = i
		this.mapContainer.addChildAt(c, index+1)
	}

	public showRollNum(n:number, r:string){
		this.rollbtn.showRolledNum(n, r)
	}

	public setMode(v:boolean){
		for(let cell of this.cellsArr){
			cell.setMode(v)
		}
	}

	//#region  棋子移动逻辑

	private stepObj:StepObj
	private stepCallback:(number,boolean)=>void

	/**移动棋子
	 * @param moveChessIndex 棋子索引
	 * @param cellIndex 移动步数
	 * @param func 每移动一格的回调
	 * @param step 是否播放逐格移动的动画
	 */
	public walkChess(moveChessIndex:number, stepNum:number, func:(number,boolean)=>void, step:boolean=true){
		if(this._lock){
			return 
		}
		this._lock = true
		const wm = this
		const chess = wm.chesses[moveChessIndex]
		const curIndex = wm.chessArr[moveChessIndex]
		let targetIndex = curIndex + stepNum
		const direction = curIndex < targetIndex?1:-1
		if(targetIndex >= this.cellsArr.length){
			targetIndex = targetIndex - this.cellsArr.length
		}

		wm.focusTo(curIndex, true, 200)
		.call(()=>{
			//计算棋子在屏幕上的位置并移到存放图层
			const tmpx = wm.mapContainer.x + chess.x
			const tmpy = wm.mapContainer.y + chess.y
			wm.tmpContainer.addChild(chess)
			chess.x = tmpx
			chess.y = tmpy

			const landY = chess.y
			const jumpY = chess.y - chess.jumpHeight
			this._moveChess = chess
			this.stepObj = {moveChessIndex, landY, jumpY,targetIndex, curIndex, direction}
			this.stepCallback = func
			wm.onStep(step, this)
		})
	}
	
	private _moveChess:Chess
	public get moveChessY() : any {
		return this._moveChess.y;
	}
	public set moveChessY(v : any) {
		if(this._moveChess){
			this._moveChess.y = v
		}
	}
	public get moveMapX() : number {
		return this.mapContainer.x;
	}
	public set moveMapX(v : number) {
		this.mapContainer.x = v;
	}
	public get moveMapY() : number {
		return this.mapContainer.y;
	}
	public set moveMapY(v : number) {
		this.mapContainer.y = v;
	}

	/**播放走棋动画 
	 * @param step 是否逐格移动
	*/
	public onStep(step:boolean, thisObj:WorldMap){
		let {
			moveChessIndex, landY, jumpY, 
			targetIndex, curIndex,direction, 
		} = thisObj.stepObj

		if(curIndex == targetIndex){
			thisObj.addChess(thisObj.chesses[moveChessIndex], moveChessIndex, targetIndex, false)
			thisObj._moveChess = null
			thisObj.stepObj = null
			thisObj._lock = false
			return
		}
		if(!step){
			const p =thisObj.getPositionWhileFocus(targetIndex)
			egret.Tween.get(thisObj)
			.to({
				moveChessY:jumpY,
				moveMapX:p.x,
				moveMapY:p.y
			}, 200)
			.to({
				moveChessY:landY
			}, 100)
			.call(()=>{
				thisObj.addChess(thisObj.chesses[moveChessIndex], moveChessIndex, targetIndex, false)
				thisObj._moveChess = null
				thisObj.stepObj = null
				thisObj._lock = false
			})
		}else{
			let target = curIndex+direction
			if(target >= thisObj.cellsArr.length){
				target = target - thisObj.cellsArr.length
			}
			const p =thisObj.getPositionWhileFocus(target)
			egret.Tween.get(thisObj)
			.to({
				moveChessY:jumpY,
				moveMapX:p.x,
				moveMapY:p.y
			}, 200)
			.to({
				moveChessY:landY
			}, 100)
			.call(()=>{
				thisObj.stepObj.curIndex = target
				thisObj.stepCallback && thisObj.stepCallback(target, target == targetIndex)
				// thisObj.startWalk(step, thisObj)
			})
		}
	}
	//#endregion

	public unlock(){
		this._lock = false
	}

	public focusToLiver(n:number, animate:boolean=false, delay:number=200):egret.Tween{
		const i = this.chessArr[n]
		return this.focusTo(i,animate,delay)
	}

	/**居中显示第n个格子 */
	public focusTo(n:number, animate:boolean = false, delay:number=200):egret.Tween{
		const cell  = this.cellsArr[n]
		const container = this.mapContainer
		
		if(!animate){
			return egret.Tween.get(container)
			.set({
				x: this.width/2 - cell.x - cell.width/2,
				y: this.height/2 - cell.y - cell.height/2
			})
		}else{
			return egret.Tween.get(container)
			.to({
				x: this.width/2 - cell.x - cell.width/2,
				y: this.height/2 - cell.y - cell.height/2
			}, delay)
		}
	}

	/**获取居中显示第n个格子时地图的位置*/
	public getPositionWhileFocus(n:number){
		const cell  = this.cellsArr[n]
		const x = this.width/2 - cell.x - cell.width/2
		const y = this.height/2 - cell.y - cell.height/2
		return new egret.Point(x, y)
	}

	public dispose(){
		this.rollbtn.removeEventListener("touchTap", this.onRollBtnClicked, this)
		this.vrbtn.removeEventListener("touchTap", this.onVRBtnClicked, this)
	}

	private onComplete(e:eui.UIEvent=null){
		const map = this

		map.removeEventListener(eui.UIEvent.COMPLETE, map.onComplete, map)

		map.rollbtn.addEventListener("touchTap", map.onRollBtnClicked, map)
		map.vrbtn.addEventListener("touchTap", map.onVRBtnClicked, map)
		map.infobtn.addEventListener("touchTap", map.onInfoBtnClick, map)
		map.bagbtn.addEventListener("touchTap", map.onBagBtnClicked, map)
		map.liverMenu.addEventListener(GameEvents.FOCUS2LIVER, map.onFocus2Liver, map)

		const s = WorldData.cellNum
		const z = WorldData.cellSize
		map.mapContainer.width = s*z
		map.mapContainer.height = s*z
		map._dragController = new DragController(map.mapContainer, (v:boolean)=>{this.setIsDragging(v)})

		const totCellNum:number = s*4 - 4
		let cells:MapCell[] = []
		let cells2:{[key:string]:number} = {}
		for(let i=0; i<totCellNum; i++){
			const data = map.data.getCell(i)
			let cell = new MapCell(data.v.iconUrl, data.r.iconUrl)
			let cx = 0
			let cy = 0
			if(i<s){
				cx = i
				cy = 0
			}else if(i<s*2-1){
				cx = s-1
				cy = i-(s-1)
			}else if(i<s*3-2){
				cx = s*3-3-i
				cy = s-1
			}else if(i<s*4-3){
				cx = 0
				cy = s*4-4-i
			}
			cell.x = cx*z
			cell.y = cy*z
			cell.cx = cx
			cell.cy = cy
			cells.push(cell)
			cells2[`${cx}_${cy}`] = i
			map.cellContainer.addChild(cell)
		}
		map.cellsArr = cells
		map.cellsMap = cells2
		map.chessArr = [0,0,0,0]
	}

	private setIsDragging(v:boolean){
		// console.log("setIsDragging")
		this.bottomBar.touchEnabled = !v
		this.bottomBar.touchChildren = !v
	}
	
	private onFocus2Liver(e:any){
		if(this._lock){
			return
		}
		const i = e.data
		const cellIndex = this.chessArr[i]
		this.focusTo(cellIndex, true)
	}
	
	private onRollBtnClicked(e:any){
		this.dispatchEvent(new egret.Event(GameEvents.START_ROLL))
	}
	

	private onVRBtnClicked(e:any){
		this.dispatchEvent(new egret.Event(GameEvents.VR_SWITCH))
	}

	private onInfoBtnClick(e:any){
		this.dispatchEvent(new egret.Event(GameEvents.SHOW_LIVER_DETAIL))
	}

	private onBagBtnClicked(e:any){
		this.dispatchEvent(new egret.Event(GameEvents.SHOW_NETA_BAG))
	}

	public static showSkillBar(s:Skill):SkillBar|null{
		if(!WorldMap.instance) return null
		const ins = WorldMap.instance
		const sb = new SkillBar(s)
		sb.x = ins.width 
		sb.y = 100
		ins.topContainer.addChild(sb)
		return sb
	}

	public static showGetNeta(n:Neta):NetaGetPanel|null{
		if(!WorldMap.instance) return null
		const ins = WorldMap.instance
		const np = NetaGetPanel.addNetaToShow(n)
		np.x = ins.width
		np.y = (ins.height-np.height)/2
		ins.topContainer.addChild(np)
		return np
	}

	public static showRollNum(n:number, r:string){
		if(!WorldMap.instance) return null
		const ins = WorldMap.instance
		ins.rollbtn.showRolledNum(n, r)
	}

	public static showEvtLog(des:string, url:string='', cb:(any)=>void=null):EvtLog|null{
		if(!WorldMap.instance) return null
		console.log("event log : ", des)
		const ins = WorldMap.instance
		const el = new EvtLog(des, url, cb)
		el.x = (ins.width - el.width)/2
		el.y = (ins.height-el.height)/2
		ins.menuContainer.addChild(el)
		return el
	}

	public static showPayGainPanel(n:number, cb:(any)=>void=null):PayGainPanel|null{
		if(!WorldMap.instance) return null
		
		const ins = WorldMap.instance
		const el = new PayGainPanel(n)
		el.x = (ins.width - el.width)/2
		el.y = (ins.height-el.height)/2
		ins.menuContainer.addChild(el)
		return el
	}

	public static showNpcPanel(npcs:NpcObj[]):NpcPanel2{
		if(!WorldMap.instance) return null
		const ins = WorldMap.instance
		const p = new NpcPanel2(npcs)
		p.x = ins.width
		p.y = ins.height/2
		ins.topContainer.addChild(p)
		return p
	}
}

/**走棋坐标数据 */
interface StepObj {
	/**棋子显示对象索引*/	
	moveChessIndex:number
	/**棋子落下的Y轴位置 */
	landY:number
	/**棋子弹起的Y轴位置 */
	jumpY:number
	/**目标格索引 */
	targetIndex:number
	/**当前格索引 */
	curIndex:number
	/**方向 */
	direction:number
}