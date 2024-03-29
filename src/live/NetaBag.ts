/** 持有neta集合*/
class NetaBag implements ISavable{
	public talk:Neta[]
	public game:Neta[]
	public song:SongNeta[]
	public spec:Neta[]
	public present:Neta[]
	public device:Device[]
	public equipment:Equipment[]
	private mc:MainCharacter
	private _valueLock:number
	public constructor(mc:MainCharacter=null) {
		this.talk = []
		this.game = []
		this.song = []
		this.spec = []
		this.present = []
		this.device = []
		this.equipment = []
		this.mc = mc
		this._valueLock = -1
	}

	public test(){
		const jsonFile = ['neta_spec_1_json', 'netas_daily_1_json', 'netas_game_1_json',
						'netas_present_1_json', 'netas_song_1_json',
						'device_1_json',
						'device_2_json',
						'device_spec_json',
						"equipment_json", "equipment_spec_json"]
		for(let jsonu of jsonFile){
			const arr = RES.getRes(jsonu)
			if(!arr)continue
			for(let obj of arr){
				// if(Math.random()>0.5)continue
				const n = NetaFactory.getNetaFromObj(obj)
				if(n.type == NetaType.TALK){
					this.modifyNeta(n, 'get', false, 3, false)
				}else{
					this.modifyNeta(n, 'get', false, 1, false)
				}
				
			}
		}
	}

	public filterNetas2Select(ty:NetaType):INetaSelectObj[]{
		const ns = this.filterNetas0(ty)
		const selectns = ns.map((v:Neta)=>{
			return {
				neta:v,
				selected:false
			}
		})
		return selectns
	}

	public filterNeta2Shop(ty:NetaType, playerStore:NetaBag):INetaSelectObj[]{
		const ns = this.filterNetas0(ty)
		const ns2 = playerStore.filterNetas0(ty)
		const maxValue = this._valueLock
		const shopns = ns.map((v:Neta)=>{
			const able = v.value > maxValue && maxValue != -1
			for(let n of ns2){
				if(n.name == v.name){
					return {
						neta:v,
						selected:false,
						holded:true,
						valueLock: able
					}
				}
			}
			return {
				neta:v,
				selected:false,
				valueLock: able
			}
		})
		return shopns
	}

	public filterNetas0(ty:NetaType){
		switch(ty){
			case NetaType.DEVICE:
				return this.device
			case NetaType.GAME:
				return this.game
			case NetaType.SONG:
				return this.song
			case NetaType.TALK:
				return this.talk
			case NetaType.SPEC:
				return this.spec
			case NetaType.PRESENT:
				return this.present
			case NetaType.EQUIPMENT:
				return this.equipment
		}
	}

	/**
	 * 修改包中neta
	 * @param n 要修改的neta
	 * @param ty 是获得还是使用
	 * @param showInfo 是否显示获得信息
	 */
	public modifyNeta(n :Neta, ty:"get"|"use", showInfo:boolean=false, num:number=1, checkEffect:boolean=true):any{
		if(!n)return
		let fn:(n:Neta, num:number)=>void
		try{
			if(ty == 'get'){
				this.add(n, num)
			}else if(ty == 'use'){
				this.minus(n, num)
			}
		}catch(err){
			console.log("================")
			console.log("modifyNeta Failed : ", n)
			console.log("reason : ", err)
		}
		

		let np = null
		if(ty == 'get' && showInfo){
			// np = WorldMap.showGetNeta(n)
			np = NetaGetPanel.addNetaToShow(n)
			this.mc.dispatchEvent(new ShowEvent(np, 'top'))
		}

		if(ty == 'get' && checkEffect){
			let tobj:TargetObj = {
				bag:this
			}
			if(this.mc){
				const mc = this.mc
				tobj = {
					...tobj,
					mc:mc.ddata,
					mc2:mc.data,
					mc3:mc.edata,
					player:mc
				}
			}
			n.onGain(tobj)

			const trigger = this.mc.checkIfSkillsTriggered(GamePhrase.GET_NETA, Math.random())
			trigger.triggerNeta(n)
		}
		return np
	}

	/**随机丢失一个neta
	 * @param ty neta类型
	 * @param n 丢失数量，默认-1为全部丢失
	 */
	public lostNeta(ty:NetaType, n:number=-1){
		if(ty == NetaType.PRESENT || ty == NetaType.SPEC){
			return
		}
		let arr:Neta[] = this.filterNetas0(ty)
		if(arr.length == 0)return
		const i = Math.floor(Math.random()*arr.length)
		const neta = arr[i]
		if(n !=-1 && neta.times > n){
			console.log(`neta ${neta.name} 使用次数减少 ${n}`)
			neta.times -= n
			if(neta.times <= 0){
				arr.splice(i, 1)
			}
		}else{
			console.log("丢失neta ：", neta.name)
			arr.splice(i, 1)
		}		
	}

	/**检查道具过期情况 */
	public checkDeviceChange(){
		const devices:Device[] = this.device.filter((d:Device)=>{ return d['passTurn']!=undefined })
		for(let d of devices){
			const cos:ChangeObj[] = d['passTurn']()
			if(cos){
				for(let co of cos){
					this.modifyNeta(co.newNeta, 'get', true, co.num)
					this.modifyNeta(d, 'use', false, co.num)
				}
			}
		}
	}


	/**检查neta数组arr中是否已有n，有则次数+1， 没有添加 */
	protected add(n:Neta, num:number=1){
		let arr:Neta[]
		switch(n.type){
			case NetaType.DEVICE:
				arr = this.device
				break
			case NetaType.TALK:
				arr = this.talk
				break
			case NetaType.GAME:
				arr = this.game
				break
			case NetaType.SONG:
				arr = this.song
				break
			case NetaType.PRESENT:
				arr = this.present
				break
			case NetaType.SPEC:
				arr = this.spec
				break	
			case NetaType.EQUIPMENT:
				arr = this.equipment
				break
		}
		for(let tmp of arr){
			if(tmp.name == n.name){
				if(tmp.times == -1){
					return
				}
				tmp.times += num 
				return
			}
		}
		if(n.times!=-1) n.times = num
		arr.push(n)
	}

	protected minus(n:Neta, num:number=1){
		let arr:Neta[]
		switch(n.type){
			case NetaType.DEVICE:
				arr = this.device
				break
			case NetaType.TALK:
				arr = this.talk
				break
			case NetaType.GAME:
				arr = this.game
				break
			case NetaType.SONG:
				arr = this.song
				break
			case NetaType.PRESENT:
				arr = this.present
				break
			case NetaType.SPEC:
				arr = this.spec
				break	
			case NetaType.EQUIPMENT:
				arr = this.equipment
				break
		}
		for(let i=0;i<arr.length;i++){
			let tmp = arr[i]
			if(tmp.name == n.name){
				if(n.type == NetaType.SONG){
					(n as SongNeta).startCD()
				}
				if(tmp.times <= -1){
					return
				}
				tmp.times -= num
				if(tmp.times <= 0){
					arr.splice(i,1)
				}
				return
			}
		}
	}

	/**可购买neta的价格上限，超过该价格的neta会显示disable样式，默认值为-1不限制 (梦追翔技能用属性 )*/
	public set valueLock(v:number){
		this._valueLock = v
	}

	public get saveObj(){
		const t = this
		function f(arr:Neta[]):any[]{
			return arr.map((v:Neta)=>{
				return v.saveObj
			})
		}
		let arr = []
		arr = arr.concat(f(t.talk))
		arr = arr.concat(f(t.game))
		arr = arr.concat(f(t.song))
		arr = arr.concat(f(t.device))
		arr = arr.concat(f(t.equipment))
		arr = arr.concat(f(t.present))
		arr = arr.concat(f(t.spec))
		return arr
	}
	
	public set saveObj(v:INetaSaveObj[]){
		const t = this
		const netas = NetaFactory.loadAllNetas(v)
		t.talk = netas.filter((v:Neta)=>{
			return v.type == NetaType.TALK
		})
		t.game = netas.filter((v:Neta)=>{
			return v.type == NetaType.GAME
		})
		t.song = netas.filter((v:Neta)=>{
			return v.type == NetaType.SONG
		}) as SongNeta[]
		t.device = netas.filter((v:Neta)=>{
			return v.type == NetaType.DEVICE
		}) as Device[]
		t.equipment = netas.filter((v:Neta)=>{
			return v.type == NetaType.EQUIPMENT
		}) as Equipment[]
		t.spec = netas.filter((v:Neta)=>{
			return v.type == NetaType.SPEC
		})
		t.present = netas.filter((v:Neta)=>{
			return v.type == NetaType.PRESENT
		})
	}

	public getRollNeta(){
		const t = this
		const arr = [].concat(t.talk,t.game,t.song,t.present, t.spec)
		if(arr.length == 0) return null
		let ret:Neta[] = []
		for(let i=0;i<3;i++){
			ret.push(arr[Math.floor(Math.random()*arr.length)])
		}
		return ret
	}
}

interface INetaSelectObj{
	neta:Neta,
	selected:boolean
	holded?:boolean
	valueLock?:boolean
}