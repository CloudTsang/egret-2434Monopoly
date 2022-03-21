/**配信基类 */
class Stream extends egret.EventDispatcher{
	public netas:Neta[]
	/**联动对象 */
	public collaboMems:string[]
	/**是否耐久配信 */
	public isLong:boolean
	/**开始时间（回合数） */
	public startTurn:number

	protected totPop:number
	protected totSafe:number
	protected totMeme:number
	/**neta数值基础meme加成，将会添加到全部neta上 */
	public meme:number
	/**neta数值基础safe加成，将会添加到全部neta上 */
	public safe:number
	/**neta数值基础pop加成，将会添加到全部neta上 */
	public pop:number
	protected ty:string
	protected mc:MainCharacter
	
	protected panel:StreamPreparePanel

	protected netaNumMap:{[key:number]:number}
	protected comment:CommentFactory
	public baseRate:number
	/**基础事故率，越小发生事故的概率越低，可以为负数， */
	public accidentBaseRate:number
	/**基础炎上率，越小发生炎上的概率越低，可以为负数， */
	public enjoBaseRate:number

	private rollCb:(n:number,r:string)=>void=null

	public _totSubAdd:number
	public _totSubSpd:number
	protected accident:number
	protected enjo:number
	public superchat:number
	private npcs:NpcObj[]

	public curAccident:boolean
	public curEnjo:boolean
	
	private tgtObj:TargetObj

	/**是否应该得到spec neta，使用neta时没有炎上/事故且roll出大成功+3，成功+1, 最终结算时>=3可以从联动对象中得到一个spec neta*/
	private shouldGetSpecNeta:number

	public constructor(mc:MainCharacter, turn:number, ty:string, npcs:NpcObj[]) {
		super()
		this.netas = []
		this.collaboMems = []
		this.mc = mc

		this.totPop = 0
		this.totSafe = 0
		this.totMeme = 0
		this.pop = 0
		this.safe = 0
		this.meme = 0
		this.shouldGetSpecNeta = 0
		this.startTurn = turn
		this.ty = ty
		this.npcs = npcs
		this.netaNumMap = {
			[NetaType.GAME]:0,
			[NetaType.SONG]:0,
			[NetaType.TALK]:0,
			[NetaType.SPEC]:0,
			[NetaType.PRESENT]:0,
		}

		this.baseRate = this.getBaseRate()
		this.accidentBaseRate = 0
		this.enjoBaseRate = 1
		if(this.ty == StreamType.GAME){
			this.accidentBaseRate = 1
		}
		if(this.ty == StreamType.TALK){
			this.enjoBaseRate = 1.5
		}
	}

	public get type(){
		return this.ty
	}

	public set streamPreparePanel(v:StreamPreparePanel){
		this.panel = v
		this.panel.addEventListener(ItemList.ITEM_SELECTED, this.onNetaChanged, this)
	}

	public start(rollCallBack:(n:number,r:string)=>void=null){
		const st = this

		st.totPop += st.netas.length * st.pop
		st.totSafe += st.netas.length * st.safe
		st.totMeme += st.netas.length * st.meme

		st.totSubAdd = 0
		st.totSubSpd = 0
		st.curIndex = -1
		st.accident = 0
		st.enjo = 0
		st.superchat = 0
		st.rollCb = rollCallBack
		st.comment = new CommentFactory()

		const mc = this.mc
		st.tgtObj = {
			player:mc,
			stream:st,
			mc:mc.ddata,
			mc2:mc.data,
			mc3:mc.edata
		}

		for(let b of st.mc.buffs){
			b.effect(st.tgtObj)
		}

		for(let d of st.mc.netaBag.device){
			d.onHold(st.tgtObj)
		}

		st.getIfCollabo()
		if(st.collaboMems.length>0){
			console.log("联动配信 ： ", st.collaboMems)
			const trigger = st.mc.checkIfSkillsTriggered(GamePhrase.IN_STREAM_COLLABO, Roll.random3())
			trigger.triggerStream(this)
			let u = [st.mc.iconUrl]
			for(let npc of this.npcs){
				if(npc['joined']){
					u.push(npc.iconUrl)
				}
			}
			st.panel.setCollabo(u)
		}

		console.log('====================')
		console.log(`直播效果基础倍率 : ${st.baseRate}`)
		console.log(`直播事故基础倍率 : ${st.accidentBaseRate}`)
		console.log(`炎上发生基础倍率 : ${st.enjoBaseRate}`)

		st.panel.setStreamData(st.netas, st.totPop, st.totSafe, st.totMeme, st.netaRequest)
		st.panel.startStream()
		st.netaCalcTimeout()
	}

	private curIndex:number
	private netaCalcTimeout(){
		setTimeout(()=>{
			this.onNetaCalc()
		}, 1000)
	}

	protected onNetaCalc(e:egret.TimerEvent = null){
		const st = this
		st.curAccident = false
		st.curEnjo = false
		st.curIndex ++
		if(st.curIndex == st.netas.length){
			st.streamFinish()
			return
		}
		const neta = st.netas[st.curIndex]
		const stg = st.mc.checkIfSkillsTriggered(GamePhrase.USE_NETA, 0, Roll.random3)
		stg.triggerNeta(neta, this)
		let {n, r} = Roll.random(st.mc)
		//test
		// r = RollResult.BIG_SUCCESS

		if(st.rollCb){
			st.rollCb(n, r)
		}
		neta.onUse(st.tgtObj)
		if(neta.type == NetaType.SONG){
			(neta as SongNeta).startCD()
		}
		st.mc.netaBag.modifyNeta(neta, "use")


		let accident = st.getIfAccident()
		let enjo = accident || r == RollResult.BIG_SUCCESS?false:st.getIfEnjo(neta.safe)

		const rate = st.baseRate + st.getNetaRate(neta)
		const rate2 = st.getRollRate(r)
		let subPop = Math.round(500 * neta.pop * rate * rate2)
		let subMeme = Math.round(10 * neta.meme * rate * rate2)

		if(accident){
			const trigger = st.mc.checkIfSkillsTriggered(GamePhrase.STREAM_ACCIDENT, Roll.random3())
			trigger.triggerStream(this)
		}

		if(enjo){
			const tmp1 = st.mc.buffs.filter((b:Buff)=>{
				return b.ID.indexOf("EnjoGuard")>=0
			})
			if(tmp1.length>0){
				console.log("炎上被Buff防止")
				enjo = false
			}
		}

		if(enjo){
			const tmp1 = st.mc.netaBag.device.filter((n:Device)=>{
				return n.name == '灭火筒'
			})
			if(tmp1.length>0){
				console.log("炎上被灭火筒防止")
				const n = tmp1[0]
				st.mc.netaBag.modifyNeta(n, 'use')
				enjo = false
			}
		}

		if(enjo){
			const trigger = st.mc.checkIfSkillsTriggered(GamePhrase.STREAM_ENJO, Roll.random3())
			trigger.triggerStream(this)
			
		}

		st.curAccident = accident
		st.curEnjo = enjo

		if(st.curAccident){
			if(r == RollResult.NORMAL){
				subPop = Math.round(subPop/2)
				subMeme = Math.round(subMeme/2)
			}else if(r == RollResult.FAIL || r == RollResult.BIG_FAIL){
				subPop = 0
				subMeme = 0
			}
			st.accident ++
			st.mc.anti+=5
			SoundManager.instance.playBgs('dededon_short_mp3')
			this.dispatchEvent(new egret.Event(GameEvents.STREAM_ACCIDENT))
		}

		if(st.curEnjo){
			st.mc.getBuff(new Enjo(st.mc))
			st.mc.anti+=10
			this.dispatchEvent(new egret.Event(GameEvents.STREAM_ENJO))
		}

		if(!st.curEnjo && !st.curAccident){
			if(r == RollResult.SUCCESS){
				st.shouldGetSpecNeta ++
			}else if(r == RollResult.BIG_SUCCESS){
				st.shouldGetSpecNeta += 3
			}
		}

		st.totSubAdd += subPop
		st.totSubSpd += subMeme
		st.superchat += (Math.round(subPop/100) * 100)
		console.log('=========================')
		console.log("neta : ", neta.name)
		// console.log("roll : ", n, r)
		console.log(`pop:${neta.pop+st.pop}  safe:${neta.safe+st.safe}  meme:${neta.meme+st.meme}`)
		// console.log("倍率 : ", rate, rate2)
		console.log("增长率 : ", subPop, subMeme)
		st.setComments(10, accident, enjo)
		st.panel.streamPanel.useNeta(st.curIndex, st.totSubAdd, subPop, st.totSubSpd, subMeme, accident, enjo, st.netaCalcTimeout, st)
		neta.reset()
	}

	protected setComments(num:number = 10, accident:boolean = false, enjo:boolean = false){
		let carr = []
		const st = this
		for(let i=0;i<num; i++){
			let s:string
			if(accident){
				s = st.comment.getAccidentComment()
			}
			else if(enjo){
				s = st.comment.getEnjoComment()
			}
			else{
				s = st.comment.getComment(st.ty)
			}

			if(s.indexOf("{liver}")>=0){
				s = s.replace("{liver}", st.mc.name)
			}
			carr.push(s)
		}
		st.panel.showComment(carr)
	}

	protected streamFinish(){
		const st = this
		const trigger = st.mc.checkIfSkillsTriggered(GamePhrase.AFTER_STREAM, Roll.random3())
		trigger.triggerStream(st)
		st.panel.finishStream()
		for(let mem of st.collaboMems){
			st.mc.npc.modify(mem, 1) 
		}
		st.mc.subscribe += st.totSubAdd
		st.mc.money += st.superchat
		st.mc.increase += st.totSubSpd
		for(let b of st.mc.buffs){
			b.streamCD()
		}

		const obj = {
			isLong:st.isLong,
			ty:st.ty,
			startTurn:st.startTurn,
			totPop:st.totPop,
			totSafe:st.totSafe,
			totMeme:st.totMeme,
			totSub:st.totSubAdd,
			accident:st.accident,
			enjo:st.enjo,
			sc:st.superchat
		}
		st.mc.stream.push(obj)

		let e = new egret.Event(GameEvents.STREAM_END)
		e.data = obj

		if(st.shouldGetSpecNeta >= 3 && st.collaboMems.length>0){
			const giftNeta = NetaFactory.getGiftNeta2(st.collaboMems)
			if(giftNeta){
				const ngp:NetaGetPanel = st.mc.netaBag.modifyNeta(giftNeta, 'get', true)
				ngp.once(eui.UIEvent.REMOVED_FROM_STAGE, (e)=>{
					st.dispatchEvent(new egret.Event(GameEvents.STREAM_END))
				}, this)
			}else{
				st.dispatchEvent(new egret.Event(GameEvents.STREAM_END))
			}
		}else{
			st.dispatchEvent(new egret.Event(GameEvents.STREAM_END))
		}

		
	}

	/**直播基础倍率，根据直播类型和liver对应能力值计算 */
	private getBaseRate(){
		const st = this
		let rate = 1	
		let matchID = ''
		switch(st.ty){
			case StreamType.GAME:
				rate += st.mc.game/10
				matchID = 'StreamBuffGame'
				break
			case StreamType.TALK:
				rate += st.mc.talk/10
				matchID = 'StreamBuffTalk'
				break
			case StreamType.SING:
				rate += st.mc.sing/10
				matchID = 'StreamBuffSing'
				break
			case StreamType.PRESENT:
				rate = 1.25 + st.mc.tech/10
				break
		} 
		rate += st.mc.strength/50
		for(let buff of st.mc.buffs){
			if(buff.ID == matchID){
				rate += 0.2
				break
			}
			if(buff.ID == "StreamBuffCollabo" && st.collaboMems.length>0){
				rate += 0.2
			}
		}

		return rate
	}

	/**neta倍率， 根据neta类型和liver对应能力值计算 */
	private getNetaRate(n:Neta){
		const mc = this.mc
		let rate = 1
		switch(n.type){
			case NetaType.GAME:
				rate = mc.game/10
				break
			case NetaType.SONG:
				rate = mc.sing/10
				const n2 = n as SongNeta
				//歌力未达到要求时效果减半
				if(mc.sing < n2.songReq) {
					console.log(`${mc.name}的歌力${mc.sing}未达到歌曲${n2.name}的要求${n2.songReq}`)
					rate /= 2
				}
				break
			case NetaType.TALK:
				rate = mc.talk/10
				break
			case NetaType.SPEC:
				rate = mc.sense/10
				break
			case NetaType.PRESENT:
				rate = 2 + mc.tech/10
				break
		}
		return rate
	}

	/**roll倍率 */
	private getRollRate(r:string){
		let rate = 1
		switch(r){
			case RollResult.BIG_SUCCESS:
				rate = 2
				break
			case RollResult.SUCCESS:
				rate = 1.5
			case RollResult.NORMAL:
				break
			case RollResult.FAIL:
				rate = 0.5
				break
			case RollResult.BIG_FAIL:
				rate = 0.1
				break
		}
		return rate
	}

	private getIfCollabo(){
		const present = this.type == StreamType.PRESENT
		this.collaboMems = []
		const commu = this.mc.commu
		for(let npc of this.npcs){
			const f = npc.favor
			const n = Roll.random2(100)
			const n2 = f*10*(1+commu/5)
			// console.log(npc.name, commu, n, n2)
			//test
			// this.collaboMems.push(npc.ID)
			// npc['joined'] = true
			// continue
			if(n2 > n || present){
				//加入联动
				this.collaboMems.push(npc.ID)
				npc['joined'] = true
			}
		}
		
	}

	/**事故几率 */
	private getIfAccident(){
		const n1 = Roll.random2(10 - this.accidentBaseRate + this.mc.tech)
		return n1 <= 1		
	}
	/**炎上几率
	 * @param safe 当前neta安全值
	 */
	private getIfEnjo(safe:number){
		//test
		// return true
		if(safe == -1){
			return false
		}
		const n1 = Roll.random2(100+this.totSafe)

		const n2 = safe>0?this.totSafe/(safe*this.netas.length)*this.enjoBaseRate + 5 : 5
		return n1<n2
	}

	private getIfBan(){
		
	}

	private onNetaChanged(e:egret.Event){
		const st = this
		const obj:INetaSelectObj = e.data

		if(obj.neta.type == NetaType.SONG){
			const sn = obj.neta as SongNeta
			if(!sn.usable && st.panel){
				st.panel.setNeta(obj.neta)
				return
			}
		}
		
		obj.selected = !obj.selected
		
		const tmp = obj.selected?1:-1
		st.netaNumMap[obj.neta.type] += tmp
		st.totPop += obj.neta.pop * tmp
		st.totMeme += obj.neta.meme * tmp
		if(obj.neta.safe != -1){
			st.totSafe += obj.neta.safe * tmp
		}
		if(obj.selected){
			let tmp = false
			if(st.ty == StreamType.GAME){
				tmp = st.checkUniqueNeta(StreamType.GAME, NetaType.GAME, obj.neta)
			}else if(st.ty == StreamType.PRESENT){
				tmp = st.checkUniqueNeta(StreamType.PRESENT, NetaType.PRESENT, obj.neta)
			}
			if(!tmp){
				st.netas.push(obj.neta)
			}
		}else{
			const i = st.netas.indexOf(obj.neta)
			if(i>=0) st.netas.splice(i,1)
		}
		if(st.panel){
			st.panel.setNeta(obj.neta)
			st.panel.setStreamData(st.netas, st.totPop, st.totSafe, st.totMeme, st.netaRequest)
		}
	}

	private checkUniqueNeta(t1:StreamType, t2:NetaType, neta:Neta){
		const st = this
		if(st.ty == t1 && neta.type == t2){
			if(st.netas.length > 0 && st.netas[0].type == t2){
				const tmp = st.netas[0]
				st.totPop -= tmp.pop
				if(tmp.safe!=-1){
					st.totSafe -= tmp.safe
				}
				st.totMeme -= tmp.meme
				st.netaNumMap[tmp.type] --
				st.netas[0] = neta
			}else{
				st.netas.unshift(neta)
			}
			return true
		}
		return false
	}

	private get netaRequest(){
		switch(this.ty){
			case StreamType.PRESENT:
				return this.netaNumMap[NetaType.PRESENT] == 1
			case StreamType.SING:
				return this.netaNumMap[NetaType.SONG] >= 3
			case StreamType.TALK:
				return this.netaNumMap[NetaType.TALK]+this.netaNumMap[NetaType.SPEC] >= 3
			case StreamType.GAME:
				return this.netaNumMap[NetaType.GAME] == 1
		}
	}

	public get totalPop(){
		return this.totPop
	}
	public get totalSafe(){
		return this.totSafe
	}
	public get totalMeme(){
		return this.totMeme
	}

	public get totSubAdd(){
		return this._totSubAdd
	}

	public get totSubSpd(){
		return this._totSubSpd
	}

	public set totSubAdd(v:number){
		this._totSubAdd = v
		if(this.panel){
			this.panel.streamPanel.setTotSub(this._totSubAdd)
		}
	}

	public set totSubSpd(v:number){
		this._totSubSpd = v
		if(this.panel){
			this.panel.streamPanel.setSubSpd(this._totSubSpd)
		}
	}
}

interface StreamBaseInfo{
	/**是否耐久配信 */
	 isLong:boolean
	/**开始时间（回合数） */
	 startTurn:number

	 totPop:number
	 totSafe:number
	 totMeme:number
	 ty:StreamType
	 /**事故次数 */
	 accident:number
	 /**炎上次数 */
	 enjo:number
	 sc:number
	 totSub:number
}