/**可操作角色 */
class MainCharacter extends Liver implements ISavable{
	/**现实 */
	protected reality:Reality;
	/**虚拟 */
	protected virtual:Virutal;
	/**角色数据 */
	public data:CData;
	/**临时角色数据（被buff修改过的值） */
	public ddata:CData;
	/**事件相关数据 */
	public edata:EventData;
	/**角色技能 */
	public skills:Skill[];
	/**订阅数 */
	private _subscribe:number
	/**增长速度 */
	public increase:number
	/**状态数组 */
	public buffs:Buff[]
	/**直播历史 */
	public stream:StreamBaseInfo[]
	/**显示棋子 */
	public dispObj:Chess
	/**持有neta */
	public netaBag:NetaBag
	/**liver好感度 */
	public npc:NpcFavour
	/**直播装备 */
	public equipment:Equipment
	/**anti数，炎上或事故时增加，降低回合开始时的增长 */
	private _anti:number
	/**anti增长锁 */
	public antiLock:boolean
	/**收益，回到起点时得到的金钱量 */
	public income:number
	/**当前vr模式, true=virtual, false=real */
	protected _current:boolean
	
	public index:number
	public constructor(obj:any, index:number) {
		super()
		this.index = index
		this.ID = obj['id']
		this.name = obj['name']
		this.data = new CData(obj['data'], true)
		this.ddata = new CData()
		this.edata = new EventData()
		this.iconUrl = obj['iconUrl']
		this.dispObj = new Chess(obj["chessV"], obj['chessR'])
		this.npc = new NpcFavour()

		this._current = true
		
		let skills:Skill[] = []
		for(let s of obj['skill']){
			let cfn = Skill
			if(s['class']){
				cfn = egret.getDefinitionByName(s['class'])
				if(!cfn) cfn = Skill
			}
			const genSkill = new cfn(this,s)
			genSkill.addEventListener(GameEvents.STAT_CHANGE, this.onSkillTriggered, this)
			skills.push(genSkill)
		}
		this.skills = skills

		this.subscribe = 0
		this.increase = 0
		this._anti = 0
		this.income = 50000
		this.stream = []
		this.buffs = []
		this.netaBag = new NetaBag(this)
		this.antiLock = false

		//test
		// if(this.index == 0)this.getBuff(new Enjo(this, 3))
		// this.getBuff(new Light(this, 3))
		// this.data.money = 5000000
		// this.increase = 1
		// this.getBuff(new MechLock(this,3))
		// this.edata.major = true
		// this.subscribe = 99999
		// this.data.sing = 10
		// this.npc['kaede'] = 4
		// this.npc['rin'] = 3
		// this.npc.modify("albio", 3)
	}

	public load(save:ICharacterSaveObj){
		const t = this
		t._subscribe = save.subs
		t.increase = save.increase
		t.income = save.income
		t._anti = save.anti
		t.stream = save.stream

		t.data.saveObj = save.data
		t.ddata.saveObj = save.data2
		t.edata.saveObj = save.edata
		t.npc.saveObj = save.npc
		t.netaBag.saveObj = save.neta
		if(save.equipment && save.equipment!=''){
			for(let eq of t.netaBag.equipment){
				if(eq.name == save.equipment){
					eq.isEquipped = true
					t.equipment = eq
					break
					
				}
			}
		}


		for(let bn0 of save.buff){
			const bn = egret.getDefinitionByName(bn0.id)
			if(bn){
				const buff = new bn(t, bn0.time)
				t.getBuff(buff)
			}
		}
		
	}

	public testPlay(){
		this.netaBag.test()
	}

	public checkIfSkillsTriggered(p:string, v:number=0, ranFunc?:()=>number):SkillsTrigger{
		let obj:SkillsTrigger = new SkillsTrigger()
		
		const skills = this.skills
		for(let i=0;i<skills.length;i++){
			const s = skills[i]
			const v2 = ranFunc?ranFunc():v
			if(s.shouldTrigger(p, v2)){
				obj.add(s)
			}
		}
		return obj
	}

	public onSkillTriggered(e:egret.Event){
		this.dispatchEvent(e)
	}

	public getBuff(nb:Buff){
		if(nb.ID == 'Stop' || nb.ID == 'Sleep'){
			this.dispatchEvent(new SkipEvent())
		}
		for(let b of this.buffs){
			if(b.name == nb.name){				
				b.add(nb)
				return
			}
		}
		this.buffs.push(nb)
		nb.on()
	}

	public removeBuff(id:string){
		const buffs = this.buffs
		for(let i=0;i<buffs.length;i++){
			const b = buffs[i]
			if(b.ID == id){
				b.off()
				buffs.splice(i, 1)
				return
			}
		}
	}

	/**检查buff和道具，获取固定移动步数，返回0时使用Roll */
	public checkStepNum(){
		for(let b of this.buffs){
			if(b.ID == "Lunpapa"){
				return 1
			}
		}
		return 0
	}

	public onTurnStart(){
		this.ddata = new CData()
		let movable:boolean = true

		let newSub = this.increase - this._anti
		if(newSub<0)newSub=0

		//回合开始技能判定
		const t = this.checkIfSkillsTriggered(GamePhrase.TURN_START, Roll.random3())
		t.trigger()
		for(let s of this.skills){
			s.cd()
		}

		//buff转cd
		let i=0
		while(i<this.buffs.length){
			let b = this.buffs[i]
			if(b.time[0]>=1){
				if(b.ID == 'Stop' || b.ID == 'Sleep') movable = false
				if(b.ID == 'Enjo'){
					//炎上期间粉丝停止并可以负增长
					newSub = Math.min(0, this.increase - this._anti)
				}
			}
			b.turnCD()
			if(b.overed){
				this.buffs.splice(i,1)
				continue
			}
			b.on()
			i++
		}

		//歌曲neta转cd
		for(let sn of this.netaBag.song){
			// console.log(sn.name)
			sn.onCD()
		}

		this.netaBag.checkDeviceChange()

		this.subscribe += newSub		

		let evt = new egret.Event(GameEvents.PLAYER_READY)
		evt.data = {
			moveable: movable
		}

		let ngp:NetaGetPanel;
		
		if(this.subscribe >= 100000 && !this.edata.has3D){
			this.edata.has3D = true
			const neta3d = NetaFactory.getPresentNeta('3D披露') 
			this.netaBag.modifyNeta(neta3d, 'get')
			//ngp = WorldMap.showGetNeta(neta3d)
			ngp = NetaGetPanel.addNetaToShow(neta3d)
		}

		const evtHasNeta = this.edata.checkHasNewNeta()
		if(evtHasNeta){
			const evtNeta = NetaFactory.getEvtNeta(evtHasNeta)
			if(evtNeta){
				this.netaBag.modifyNeta(evtNeta, 'get')
				// ngp = WorldMap.showGetNeta(evtNeta)
				ngp = NetaGetPanel.addNetaToShow(evtNeta)
			}
		}

		const npcHasGift = this.npc.checkHasGift()
		if(npcHasGift){
			const giftNeta = NetaFactory.getGiftNeta(npcHasGift)
			if(giftNeta){
				this.npc.getGift(npcHasGift)
				this.netaBag.modifyNeta(giftNeta, 'get')
				// ngp = WorldMap.showGetNeta(giftNeta)
				ngp = NetaGetPanel.addNetaToShow(giftNeta)
			}
			
		}
		if(ngp){
			this.dispatchEvent(new ShowEvent(ngp, "top"))
			ngp.addEventListener(eui.UIEvent.REMOVED_FROM_STAGE,(uie)=>{
				this.dispatchEvent(evt)
			}, this)
		}else{
			this.dispatchEvent(evt)
		}
		
		
	}

	public onTurnEnd(){
		// this.ddata = new CData()
	}

	/**现实虚拟切换 */
	public setMode(v:boolean){
		if(this.dispObj.lock){
			return false
		}
		this._current = v
		this.dispObj.setMode(this._current, true)
		return true
	}

	public get currentMode(){
		return this._current
	}

	public get game(){
		const r =  this.data.game + this.ddata.game
        return r<=0?0:r
	}
	
	public get commu(){
		const r =  this.data.commu + this.ddata.commu
        return r<=0?0:r
	}

	public get luck(){
		const r =  this.data.luck + this.ddata.luck
        return r<=0?0:r
	}

	public get sense(){
		const r = this.data.sense + this.ddata.sense
		return r<=0?0:r
	}

	public get sing(){
		const r =  this.data.sing + this.ddata.sing
        return r<=0?0:r
	}
	public get strength(){
		let r =  this.data.strength + this.ddata.strength
		if(r > 10) r = 10
		else if(r<=0) r = 0
        return r
	}
	public get talk(){
		const r =  this.data.talk + this.ddata.talk
        return r<=0?0:r
	}
	public get tech(){
		const r =  this.data.tech + this.ddata.tech
        return r<=0?0:r
	}

	public get money(){
		return this.data.money
	}
	public set money(v:number){
		const trigger = this.checkIfSkillsTriggered(GamePhrase.GET_MONEY, Roll.random3())
		trigger.triggerNumber(v-this.data.money)
		this.data.money = v
		this.dispatchEvent(new MoneyEvent())
		
	}
	public get subscribe(){
		return this._subscribe
	}
	public set subscribe(v:number){
		if(v<0)v=0
		this._subscribe = v
		this.dispatchEvent(new SubscribeEvent())
	}

	public get anti(){
		return this._anti
	}
	public set anti(v:number){
		if(this.antiLock && v>this._anti){
			return
		}
		if(v<0) v = 0
		console.log(`${this.name} 的anti变化至 ${v}`)
		this._anti = v
	}

	public get saveObj(){
		const t = this
		const obj = {
			index: t.index,
			id: t.ID,
			data: t.data.saveObj,
			data2: t.ddata.saveObj,
			edata: t.edata.saveObj,
			stream: t.stream,
			equipment: t.equipment? t.equipment.name:null,
			
			buff: t.buffs.map((b:Buff)=>{
				return b.saveObj
			}),
			neta: t.netaBag.saveObj,
			npc: t.npc.saveObj,
			subs: t._subscribe,
			increase: t.increase,
			income: t.income,
			anti: t._anti 
		}
		return obj
	}
}