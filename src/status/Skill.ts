class Skill extends EffectHandler{
	public type:string
	protected mc:MainCharacter
	 /**发动阶段 */
    protected phrase:string
    /**概率计算式 */
    protected rate:string
	/**发动条件 */
	protected req:string 
	protected triggered:boolean 
	/**是否可以一个回合内多次触发 */
	protected always:boolean
	protected _cd:number
	
	public constructor(mc:MainCharacter, data:any) {
		super()
		this.name = data['name']
		this.des = data['des']
		this.effect = data['effect']?data['effect']:[]
		this.rate = data['rate']
		this.phrase = data['phrase']
		if(data['always']) this.always = data['always']
		else this.always = data['phrase'].indexOf("USE_")>=0
		
		this.type = data['type']
		this.req = data['req']
		this.mc = mc
		this._cd = 0
	}

	public cd(){
		this.triggered = false
		if(this._cd == 0){
			return
		}
		this._cd -- 
	}

	
	public shouldTrigger(phrase:string,v:number=0):boolean{
		if(!this.effect){//效果没做好
			return false
		}
		if(this._cd > 0){//cd没转好
			return false
		}
		if(this.triggered && !this.always){//已经发动技能了
			return false
		}
		//IN_STREAM字符串包含在IN_STREAM_COLLABO和IN_STREAM_SOLO中也能触发技能
		if(this.phrase.indexOf(phrase)<0){
			return false
		}
		try{
			const mc = this.mc
			const re = new RegExp(/\{mc.*\}/)
			let rateStr = this.rate
			const arr = re.exec(rateStr)

			if(arr){
				for(let i of arr){
					const prop = i.substring(4, i.length-1)
					rateStr = rateStr.replace(i, mc.data[prop])
				}
			}
			const r = eval(rateStr)
			// return true
			return v<r

		}catch(err){
			console.error(err)
			return false
		}
	}

	public reset(){
		this.triggered = false
	}

	public trigger(){
		console.log("skill : ", this.name)
		// WorldMap.showSkillBar(this)
		this.dispatchEvent(new SkillEvent(this))
		this.triggered = true
		const obj = {
			player:this.mc,
			mc:this.mc.ddata,
			bag:this.mc.netaBag
		}
		for(let e of this.effect){
			const ty = e.type
			const data = e.data
			this.handle(ty, data, obj)
		}
	}

	public triggerAction(){
		
	}

	public triggerNeta(neta:Neta, stream?:Stream){
		if(this.phrase.indexOf("NETA") < 0){
			return
		}
		
		const obj = {
			player:this.mc,
			neta:neta,
			mc:this.mc.ddata,
			stream:stream,
			bag:this.mc.netaBag
		}

		console.log("skill : ", this.name)
		// WorldMap.showSkillBar(this)
		this.dispatchEvent(new SkillEvent(this))
		this.triggered = true
		for(let e of this.effect){
			const ty = e.type
			const data = e.data
			this.handle(ty, data, obj)
		}
	}

	public triggerStream(stream:Stream){
		if(this.phrase.indexOf("STREAM") < 0){
			return
		}
		
		const obj:TargetObj = {
			player:this.mc,
			stream:stream,
			mc:this.mc.ddata,
			mc2:this.mc.data,
			mc3:this.mc.edata
		}
		if(!this.checkReq(this.req, obj)){
			return
		}
		console.log("skill : ", this.name)
		// WorldMap.showSkillBar(this)
		this.dispatchEvent(new SkillEvent(this))
		this.triggered = true
		for(let e of this.effect){
			const ty = e.type
			const data = e.data
			this.handle(ty, data, obj)
		}
	}

	public triggerBag(bag:NetaBag){
		console.log("skill : ", this.name)
		this.dispatchEvent(new SkillEvent(this))
		this.triggered = true
	}

	public triggerRollResult(r:string){
		console.log("skill : ", this.name)
		this.dispatchEvent(new SkillEvent(this))
		this.triggered = true
		return r
	}

	public triggerNumber(v:number){
		console.log("skill : ", this.name)
		this.dispatchEvent(new SkillEvent(this))
		this.triggered = true
		return v
	}

	

}

