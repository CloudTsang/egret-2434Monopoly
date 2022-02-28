class WorldController {
	public players:MainCharacter[]
	public map:WorldMap
	public cPanel:CharaterPanel
	public bagPanel:StreamPreparePanel
	public playerSelectPanel:PlayerSelectPanel

	public menu:IDisposable
	public menus:IDisposable[]
	private stage:egret.Stage
	public currentPlayer:0|1|2|3
	public stageMode = [true,true,true,true]
	private phrase:string

	public curTurn:number

	private cellDatas:MapData
	private stream:Stream
	/**当前玩家所在棋子的索引 */
	private chessCellIndexes:number[]

	/**正在处理效果中的道具  */
	private _handlingDevice:Device
	/**是否跳过行动，用于事件中途、使用道具时得到<停止><睡眠>状态时直接跳过回合 */
	private _shouldSkip:boolean

	private _lock:boolean
	private _handling:boolean
	public constructor(stage:egret.Stage) {
		this.stage = stage
		this.stageMode = [true,true,true,true]
		// this.stageMode = [false,false,false,false]
		this.curTurn = 1
		window['testPlay'] = ()=>{this.testPlay()}
	}

	public initMap(){
		this.cellDatas = new MapData()

		let map = new WorldMap(this.cellDatas)
		map.addEventListener(GameEvents.START_ROLL, this.onStartRoll, this)
		map.addEventListener(GameEvents.VR_SWITCH, this.onVRSwitch, this)
		map.addEventListener(GameEvents.SHOW_LIVER_DETAIL, this.onShowLiver, this)
		map.addEventListener(GameEvents.SHOW_NETA_BAG, this.onShowNetaBag, this)
		this.map = map
		this.stage.addChild(map)
	}

	public initPlayer(arr:string[]){
        let mcarr:MainCharacter[] = []
		this.chessCellIndexes = [0,0,0,0]

		let mcdatas:any[] = []
		let pIDs:string[] = []

        for(let i=0;i<arr.length;i++){
            const mcdata = RES.getRes(arr[i])
            mcdatas.push(mcdata)
			pIDs.push(mcdata['id'])
        }
		Liver.init(pIDs)

		for(let i=0;i<mcdatas.length;i++){
			const mcdata = mcdatas[i]
			let mc = new MainCharacter(mcdata, i)
            mcarr.push(mc)
			this.map.addChess(mc.dispObj, mc.index)
		}

		this.players = mcarr
		this.currentPlayer = 0

		const fp = this.players[0]
		this.map.subs.setNum(fp.subscribe)
		this.map.money.setNum(fp.money)
		this.map.focusTo(0)
		fp.addEventListener(GameEvents.STAT_CHANGE, this.onLiverStatChange, this)
		fp.addEventListener(GameEvents.PLAYER_READY, this.onPlayerReady, this)
		fp.onTurnStart()
		
		this.cellDatas.shuffleLiver()
	}

	public initUI(){
		this.menus = []
		this.map.liverMenu.setPlayers(this.players)

		this.stage.addEventListener("touchTap", this.onSound, this)
	}

	private onSound(e:any){
		this.stage.removeEventListener("touchTap", this.onSound, this)
		SoundManager.instance.play('vtl1_mp3', true)
	}

	protected onStartRoll(e:any){
		if(this._lock){
			return
		}
		this._lock = true
		this.phrase = GamePhrase.DICE_ROLL
		let n = this.curPlayer.checkStepNum()
		if(n == 0){
			n = Roll.random(this.curPlayer).n
		}
		this.map.showRollNum(n, RollResult.NORMAL)
		this.map.walkChess(this.currentPlayer, n, (i:number, v:boolean)=>{this.onChessStep(i,v)})
	}

	protected onChessStep(curIndex:number, finish:boolean){
		this.chessCurIndex = curIndex
		const cell:CellData = this.cellDatas.getCell(curIndex)
		if(curIndex == 0){
			//回到起点
			cell.addEventListener(GameEvents.EVENT_FINISH, finish?this.onStartPointFinish:this.onStartPoint, this)
			cell.trigger(this.stageMode[this.currentPlayer],
						this.curPlayer)		
			return
		}

		this.map.onStep(true, this.map)
		if(finish){
			//test
			// this.nextPlayer()
			// return

			this.menus = []
			cell.addEventListener(GameEvents.EVENT_START, this.onEventStart, this)
			cell.addEventListener(GameEvents.EVENT_FINISH, this.onEventFinish, this)
			const menu = cell.trigger(this.stageMode[this.currentPlayer],
						this.curPlayer)
			if(!menu){
				this._lock = false
				return
			}
			this.showMenu(menu)
		} 
	}

	protected showMenu(menu:any){
		if(!menu){
			return
		}
		this.phrase = GamePhrase.BEFORE_SELECT
		menu.addEventListener(GameEvents.ACTION_CONFIRM, this.onActionSelected, this, false, true)
		this.pushMenu({data:menu})
	}

	protected onActionSelected(e:egret.Event){	
		if(this._handling) return 
		this._handling = true
		const ctrller = this
		const ty = e.data.ty
		
		ctrller.phrase = GamePhrase.BEFORE_ACTION
		let stg = ctrller.players[ctrller.currentPlayer].checkIfSkillsTriggered(GamePhrase.BEFORE_ACTION, Roll.random3())
		stg.trigger()
		switch(ty){
			case GameEvents.STREAM_PREPARE:
				//进入直播准备
				const mc = ctrller.players[ctrller.currentPlayer]
				const ty2 = e.data.ty2
				ctrller.menu && ctrller.map.removeMenu(ctrller.menu)
				ctrller.stream = new Stream(mc, ctrller.curTurn, ty2, ctrller.cellDatas.getCell(ctrller.chessCurIndex).getNpc(mc.npc))
				ctrller.stream.addEventListener(GameEvents.STREAM_END, this.onStreamEnd,this)

				let menu = new StreamPreparePanel(mc.netaBag, ty2)
				menu.addEventListener(GameEvents.STREAM_START, ctrller.onStreamStart, ctrller)
				menu.addEventListener(GameEvents.MENU_CANCEL, ctrller.popMenu, ctrller)

				ctrller.stream.streamPreparePanel = menu
				ctrller.pushMenu({data:menu})
				break
			default:
				break
		}
	}

	protected onStreamStart(e:any=null){
		const ctrller = this

		if(ctrller.stream.type == StreamType.PRESENT){
			SoundManager.instance.play('vtl3_mp3', false)
		}else{
			SoundManager.instance.play('vtl2_mp3', false)
		}
		
		let stg2 = ctrller.players[ctrller.currentPlayer].checkIfSkillsTriggered(GamePhrase.BEFORE_STREAM, Roll.random3())
		stg2.triggerStream(ctrller.stream)
		ctrller.phrase = GamePhrase.IN_STREAM
		ctrller.stream.start((n:number, r:string)=>{
			ctrller.map.showRollNum(n,r)
		})
	}

	protected onStreamEnd(e:any=null){
		this._handling = false
		this.phrase = GamePhrase.AFTER_STREAM
		for(let m of this.menus){
			m.dispose()
		}
		this.menus = []
		setTimeout(()=>{
			SoundManager.instance.play('vtl1_mp3', true)
			this.nextPlayer()
		}, 2000);
		// const streamData:StreamBaseInfo = e.data
		// this.map.money.setTween2Num(this.curPlayer.money)
		// this.map.subs.setTween2Num(this.curPlayer.subscribe, ()=>{this.nextPlayer()})
	}

	protected onEventStart(e:egret.Event){
		this.popMenu()
	}

	protected onEventFinish(e:egret.Event){
		this._handling = false
		this.nextPlayer()
	}

	protected onStartPoint(e:any){
		this.map.onStep(true, this.map)
	}

	protected onStartPointFinish(e:any){
		this.map.onStep(true, this.map)
		this.nextPlayer()
	}

	protected nextPlayer(){
		this._handling = false
		this._shouldSkip = false
		const cell:CellData = this.cellDatas.getCell(this.chessCurIndex )
		cell.removeEventListener(GameEvents.EVENT_START, this.onEventStart, this)
		cell.removeEventListener(GameEvents.EVENT_FINISH, this.onEventFinish, this)

		const ctrller = this
		ctrller.onHideBag(null)
		ctrller.onHideLiver(null)

		const cp = ctrller.players[ctrller.currentPlayer]
		cp.removeEventListener(GameEvents.STAT_CHANGE, this.onLiverStatChange, this)
		cp.removeEventListener(GameEvents.PLAYER_READY, this.onPlayerReady, this)
		cp.onTurnEnd()

		ctrller.currentPlayer ++
		for(let m of ctrller.menus){
			m && m.dispose()
		}
		ctrller.menus = []
		ctrller.menu = null

		if(ctrller.currentPlayer == ctrller.players.length){
			//下回合
			ctrller.currentPlayer = 0
			ctrller.curTurn ++

			//重新打乱npc分布？
			ctrller.cellDatas.shuffleLiver()
		}


		const p = ctrller.players[ctrller.currentPlayer]
		const cur = ctrller.stageMode[ctrller.currentPlayer]
		ctrller.phrase = GamePhrase.TURN_START
		
		ctrller.map.subs.setNum(p.subscribe)
		ctrller.map.money.setNum(p.money)
		ctrller.map.setMode(cur)
		for(let mc of ctrller.players){
			mc.setMode(cur)
		}
		ctrller.map.liverMenu.current = ctrller.currentPlayer
		ctrller.map.focusToLiver(ctrller.currentPlayer, true)	

		p.addEventListener(GameEvents.STAT_CHANGE, this.onLiverStatChange, this)
		p.addEventListener(GameEvents.PLAYER_READY, this.onPlayerReady, this)
		p.onTurnStart()
		
	}

	protected onPlayerReady(e:egret.Event){
		const moveable = e.data.moveable
		if(!moveable){
			setTimeout(()=>{
				this.nextPlayer()
			}, 1000)
			return
		}
		this._lock = false
	}

	protected onLiverStatChange(e:any=null){
		const ty = e.data
		switch(ty){
			case "money":
				this.map.money.setTween2Num(this.curPlayer.money)
				break
			case "subscribe":
				this.map.subs.setTween2Num(this.curPlayer.subscribe)
				break
			case "skip":
				this._shouldSkip = true
				break
			default:
				break
		}
	}

	protected pushMenu(e:any=null){
		const ctrller = this
		const menu = e.data
		ctrller.map.addMenu(menu)
		ctrller.menus.push(menu)
		ctrller.menu = menu
	}

	protected popMenu(e:any=null){
		const ctrller = this
		if(ctrller.menus.length == 0){
			return false
		}
		ctrller.menus.pop()
		ctrller.menu && ctrller.menu.dispose()

		if(ctrller.menus.length > 0){
			ctrller.menu = ctrller.menus[ctrller.menus.length-1]
			ctrller.map.addMenu(ctrller.menu as any)
		}
		return true
	}

	protected onShowLiver(e:any){
		const ctrller = this
		if(ctrller.cPanel){
			ctrller.cPanel.dispose()
			ctrller.cPanel = null
			return
		}
		let cpanel = new CharaterPanel(ctrller.players[ctrller.currentPlayer])
		cpanel.x = (ctrller.stage.stageWidth - cpanel.width)/2
		cpanel.y = (ctrller.stage.stageHeight - cpanel.height)/2
		cpanel.addEventListener(GameEvents.MENU_CANCEL, ctrller.onHideLiver, ctrller)
		ctrller.cPanel = cpanel
		ctrller.stage.addChild(cpanel)
	}

	protected onHideLiver(e:any){
		if(!this.cPanel)return
		this.cPanel.removeEventListener(GameEvents.MENU_CANCEL, this.onHideLiver, this)
		this.cPanel.dispose()
		this.cPanel = null
	}

	protected onShowNetaBag(e:any){
		const ctrller = this
		if(ctrller.bagPanel){
			ctrller.bagPanel.dispose()
			ctrller.bagPanel = null
			return
		}
		let bagPanel = new StreamPreparePanel(ctrller.players[ctrller.currentPlayer].netaBag, '', PanelType.NORMAL)
		bagPanel.addEventListener(GameEvents.MENU_CANCEL, ctrller.onHideBag, ctrller)
		bagPanel.addEventListener(GameEvents.NETA_CONFIRM, ctrller.onUseNeta, ctrller)
		ctrller.bagPanel = bagPanel
		ctrller.stage.addChild(bagPanel)
	}

	protected onUseNeta(e:egret.Event){
		const ctrller = this
		if(ctrller._handling) return
		if(ctrller._handlingDevice) return
		const n:Device = e.data.neta
		const bp = this.bagPanel
		const mc:MainCharacter = ctrller.curPlayer
		n.addEventListener(GameEvents.DEVICE_FINISH, ctrller.onUseFinish, ctrller)
		ctrller._handlingDevice = n

		switch(n.target){
			case EffectTarget.SELF:
				n.onUse({player:mc, mc:mc.ddata, mc2:mc.data})
				break
			case EffectTarget.SELF_ROLL:
				ctrller.onHideBag(null)
				n.onUse({player:mc, mc:mc.ddata, mc2:mc.data})
				break
			case EffectTarget.SELECT_ONE:
			case EffectTarget.ALL_SELECT_ONE:
				//选择使用对象时先隐藏当前菜单
				// if(ctrller.menu) ctrller.map.removeMenu(ctrller.menu)
				this.map.setMenuLayerVisible(false)
				let tmp:number = ctrller.currentPlayer
				if(n.target == EffectTarget.ALL_SELECT_ONE) tmp = -1
				const psp:PlayerSelectPanel = WorldMap.showPlayerSelect(ctrller.players, tmp)
				psp.addEventListener(GameEvents.PLAYER_SELECTED, ctrller.onSelectPlayer, ctrller)
				psp.addEventListener(GameEvents.PLAYER_SELECT_CANCEL, ctrller.onCancelSelectPlayer, ctrller)
				// ctrller.onHideBag(null)
				this.stage.removeChild(this.bagPanel)
				ctrller.map.addChild(psp)
				ctrller.playerSelectPanel = psp
				
				break
			case EffectTarget.OTHER_ALL:
				this.map.setMenuLayerVisible(false)
				ctrller.onHideBag(null)
				let tgts:MainCharacter[] = []
				for(let p of this.players){
					if(p == mc) continue
					tgts.push(p)
				}
				n.onUse({player:mc, mc:mc.ddata, mc2:mc.data, tgtPlayer:tgts})
				break
			case EffectTarget.RANDOM_ONE_NPC:
				const cell = ctrller.cellDatas.getCell(ctrller.chessCurIndex)
				const npcs = cell.npcs
				let tgtNpc:number
				if(npcs.length == 0) {
					tgtNpc = Math.floor(Math.random()*Liver.allLivers.length)
				}else{
					tgtNpc = npcs[Math.floor(Math.random()*npcs.length)]
				}
				const npc = Liver.allLivers[tgtNpc]
				n.onUse({player:mc, mc:mc.ddata, mc2:mc.data, npc:npc})
				break
		}
	}

	protected onSelectPlayer(e:egret.Event){
		if(!this._handlingDevice)return
		if(this.playerSelectPanel) {
			this.playerSelectPanel.dispose()
		}
		const i = e.data.index
		const mc:MainCharacter = this.curPlayer
		const tgtp:MainCharacter[] = [this.players[i]]
		this._handlingDevice.onUse({player:mc, mc:mc.ddata, mc2:mc.data, tgtPlayer:tgtp})
	}

	protected onCancelSelectPlayer(e:egret.Event){
		this.map.setMenuLayerVisible(true)
		if(this.playerSelectPanel) {
			this.playerSelectPanel.dispose()
		}
		if(this.bagPanel){
			this.stage.addChild(this.bagPanel)
		}
	}

	protected onUseFinish(e:egret.Event){
		const n:Neta = e.target
		n.removeEventListener(GameEvents.DEVICE_FINISH, this.onUseFinish, this)
		const mc:MainCharacter = this.curPlayer
		
		if(this.menu) this.map.addMenu(this.menu)
		mc.netaBag.modifyNeta(n, 'use', false, 1, false)
		if(this.bagPanel){
			this.bagPanel.setNeta(n)
			this.bagPanel.netaSelectPanel.refresh({
				neta:n,
				selected:false
			})
		}
		
		this._handlingDevice = null
		// this.popMenu()
		this.map.setMenuLayerVisible(true)

		//使用道具完毕后检测到陷入停止状态时轮到下一位玩家
		if(this._shouldSkip){
			this.nextPlayer()
		}
		
	}

	protected onHideBag(e:any){
		if(!this.bagPanel) return
		this.bagPanel.removeEventListener(GameEvents.MENU_CANCEL, this.onHideBag, this)
		this.bagPanel.removeEventListener(GameEvents.NETA_CONFIRM, this.onUseNeta, this)
		this.bagPanel.dispose()
		this.bagPanel = null
	
	}

	protected onMenuClosed(e:egret.Event){
		e.target.dispose()
		e.target.removeEventListener(GameEvents.MENU_CANCEL, this.onMenuClosed, this)
		if(e.target == this.bagPanel){
			this.bagPanel = null
		}else if(e.target == this.cPanel){
			this.cPanel = null
		}
	}

	protected onVRSwitch(e:any){
		if(this._lock){
			return
		}
		this._lock = true
		const ctrller = this
		ctrller.stageMode[ctrller.currentPlayer] = !ctrller.stageMode[ctrller.currentPlayer]
		const cur = ctrller.stageMode[ctrller.currentPlayer]
		ctrller.map.setMode(cur)

		for(let mc of ctrller.players){
			mc.setMode(cur)
		}
		setTimeout(()=>{
			this._lock = false
		}, 500)
	}

	public get curPlayer():MainCharacter{
		return this.players[this.currentPlayer]
	}

	private set chessCurIndex(v:number){
		this.chessCellIndexes[this.currentPlayer] = v
	}
	private get chessCurIndex(){
		return this.chessCellIndexes[this.currentPlayer]
	}

	public testPlay(){
		console.log(this, this.players, this.currentPlayer)
		this.curPlayer.testPlay()
	}
}