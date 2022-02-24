class NetaDeviceUnchi extends Device implements ChangeableDevice{
	/**变干记数 */
	public counters:number[]
	private TURN_2_CHANGE:number = 5
	public constructor(obj:any) {
		super(obj)
		this.counters = []
		for(let i=0;i<this._times; i++){
			this.counters.push(this.TURN_2_CHANGE)
		}
		
	}

	public set times(v:number){
		this.counters.push(this.TURN_2_CHANGE)
		this._times = v
	}

	public get times(){
		return this._times
	}

	public passTurn():ChangeObj[]{
		this.counters = this.counters.map((v:number)=>{ return v-=1 })
		const tochange = this.counters.filter((v:number)=>{ return v==0 })
		if(tochange.length > 0){
			let ret:ChangeObj[] = []
			try{
				for(let ef of this.effect){
					if(ef['type'] == EffectType.GET_NETA){
						const n = NetaFactory.getNetaFromObj(ef['data']) as Device
						ret.push({
							newNeta:n,
							num:tochange.length
						})
					}
				}
				return ret
			}catch(err){
				console.log(`${this.name} 变化数据出错 : ${err}`)
				return []
			}
		}else{
			return []
		}
	}
} 