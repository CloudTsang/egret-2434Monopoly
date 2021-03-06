/** ๆๆneta้ๅ*/
class NetaBag {
	public talk:Neta[]
	public game:Neta[]
	public song:SongNeta[]
	public spec:Neta[]
	public present:Neta[]
	public device:Device[]
	private mc:MainCharacter
	private _valueLock:number
	public constructor(mc:MainCharacter=null) {
		this.talk = []
		this.game = []
		this.song = []
		this.spec = []
		this.present = []
		this.device = []
		this.mc = mc
		this._valueLock = -1
	}

	public test(){
		const jsonFile = ['neta_spec_1_json', 'netas_daily_1_json', 'netas_game_1_json',
						'netas_present_1_json', 'netas_song_1_json',
						'device_1_json',
						'device_2_json',
						'device_spec_json']
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
		}
	}

	/**
	 * ไฟฎๆนๅไธญneta
	 * @param n ่ฆไฟฎๆน็neta
	 * @param ty ๆฏ่ทๅพ่ฟๆฏไฝฟ็จ
	 * @param showInfo ๆฏๅฆๆพ็คบ่ทๅพไฟกๆฏ
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

	/**้ๆบไธขๅคฑไธไธชneta
	 * @param ty neta็ฑปๅ
	 * @param n ไธขๅคฑๆฐ้๏ผ้ป่ฎค-1ไธบๅจ้จไธขๅคฑ
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
			console.log(`neta ${neta.name} ไฝฟ็จๆฌกๆฐๅๅฐ ${n}`)
			neta.times -= n
			if(neta.times <= 0){
				arr.splice(i, 1)
			}
		}else{
			console.log("ไธขๅคฑneta ๏ผ", neta.name)
			arr.splice(i, 1)
		}		
	}

	/**ๆฃๆฅ้ๅท่ฟๆๆๅต */
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


	/**ๆฃๆฅnetaๆฐ็ปarrไธญๆฏๅฆๅทฒๆn๏ผๆๅๆฌกๆฐ+1๏ผ ๆฒกๆๆทปๅ? */
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

	/**ๅฏ่ดญไนฐneta็ไปทๆ?ผไธ้๏ผ่ถ่ฟ่ฏฅไปทๆ?ผ็netaไผๆพ็คบdisableๆ?ทๅผ๏ผ้ป่ฎคๅผไธบ-1ไธ้ๅถ (ๆขฆ่ฟฝ็ฟๆ่ฝ็จๅฑๆง )*/
	public set valueLock(v:number){
		this._valueLock = v
	}
}

interface INetaSelectObj{
	neta:Neta,
	selected:boolean
	holded?:boolean
	valueLock?:boolean
}