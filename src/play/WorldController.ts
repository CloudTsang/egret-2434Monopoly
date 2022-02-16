class WorldController {
	public players:MainCharacter[]
	public map:WorldMap
	public cPanel:CharaterPanel
	public bagPanel:StreamPreparePanel

	public menu:IDisposable
	public menus:IDisposable[]
	private stage:egret.Stage
	public currentPlayer:0|1|2|3
	public stageMode = [true,true,true,true]
	private phrase:string

	public curTurn:number

	private cellDatas:MapData
	private stream:Stream
	private chessCurIndex:number

	private _lock:boolean
	private _handling:boolean
	public constructor(stage:egret.Stage) {
		this.stage = stage
		this.stageMode = [true,true,true,true]
		// this.stageMode = [false,false,false,false]
		this.curTurn = 1
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
        for(let i=0;i<arr.length;i++){
            let mcdata = RES.getRes(arr[i])
            let mc = new MainCharacter(mcdata, i)
			mc.addEventListener(GameEvents.STAT_CHANGE, this.onLiverStatChange, this)
			mc.addEventListener(GameEvents.PLAYER_READY, this.onPlayerReady, this)
            mcarr.push(mc)

			this.map.addChess(mc.dispObj, mc.index)
        }
		this.players = mcarr
		this.currentPlayer = 0
		this.players[0].onTurnStart()
		this.map.subs.setNum(this.players[0].subscribe)
		this.map.money.setNum(this.players[0].money)
		this.map.focusTo(0)

		this.cellDatas.shuffleLiver(this.players)
	}

	public initUI(){
		this.menus = []
		this.map.liverMenu.setPlayers(this.players)
	}

	protected onStartRoll(e:any){
		if(this._lock){
			return
		}
		this._lock = true
		this.phrase = GamePhrase.DICE_ROLL
		const {n, r} = Roll.random(this.curPlayer)
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
			this.nextPlayer()
		}, 2000);
		// const streamData:StreamBaseInfo = e.data
		// this.map.money.setTween2Num(this.curPlayer.money)
		// this.map.subs.setTween2Num(this.curPlayer.subscribe, ()=>{this.nextPlayer()})
	}

	protected onEventStart(e:egret.Event){
		console.log("onEventStart")
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
		const cell:CellData = this.cellDatas.getCell(this.chessCurIndex )
		cell.removeEventListener(GameEvents.EVENT_START, this.onEventStart, this)
		cell.removeEventListener(GameEvents.EVENT_FINISH, this.onEventFinish, this)

		const ctrller = this
		ctrller.players[ctrller.currentPlayer].onTurnEnd()
		ctrller.currentPlayer ++
		for(let m of ctrller.menus){
			m && m.dispose()
		}
		ctrller.menus = []
		if(ctrller.currentPlayer == ctrller.players.length){
			//下回合
			ctrller.currentPlayer = 0
			ctrller.curTurn ++
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
		// console.log('this.curPlayer : ', this.curPlayer, this.curPlayer.money)
		switch(ty){
			case "money":
				this.map.money.setTween2Num(this.curPlayer.money)
				break
			case "subscribe":
				this.map.subs.setTween2Num(this.curPlayer.subscribe)
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
		const n:Neta = e.data.neta
		const mc:MainCharacter = this.curPlayer
		n.onUse({player:mc, mc:mc.ddata, mc2:mc.data})
		mc.netaBag.modifyNeta(n, 'use', false, 1, false)
		this.bagPanel.setNeta(n)
		this.bagPanel.netaSelectPanel.refresh({
			neta:n,
			selected:false
		})
	}

	protected onHideBag(e:any){
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
}