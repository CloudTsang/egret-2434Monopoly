interface NetaBaseProp{
	pop:number,
	safe:number,
	meme:number
}

 class Neta extends EffectHandler{
	/**人气度，影响直播获取的粉丝数 */
	public pop:number
	/**安全度，影响直播炎上或被ban的概率 */
	public safe:number
	/**谜因度，影响直播以外粉丝增长速度 */
	public meme:number

	protected _oriData:NetaBaseProp

	/**使用次数， -1为无限次 */
	protected _times:number

	/**是否可用于耐久，耐久直播中必须至少含有1个耐久neta */
	public long:boolean
	/**是否只能用于联动配信 */
	public collaboOnly:boolean
	/**类型 */
	public type:NetaType
	/**是否选中 */
	public selected:boolean
	/**购买价格 */
	public value:number
	/**是好感度赠礼的情况：持有liver */
	public owner:string
	public constructor(obj:any) {
		super()		
		this.ID = egret.getQualifiedClassName(this)//obj['id']
		this.name = obj['name']
		this.des = obj['des']
		this.type = this.str2type(obj['type'])

		const data = obj['data']
		this.owner = obj['owner']?obj['owner']:null
		this._times = data['times']
		this.effect = data['effect']?data['effect']:[]
		this.iconUrl = obj['iconUrl']?obj['iconUrl']:"netaicons_json#empty"

		if(obj['value']){
			this.value = obj['value']
		}else{  
			if(this.type == NetaType.GAME){
				this.value = 5000
			}else if(this.type == NetaType.SONG){
				this.value = 500
			}else{
				this.value = 0
			}
		}
		if(this.type!=NetaType.DEVICE){
			this.pop = data['pop']
			this.safe = data['safe']
			this.meme = data['meme']
			this._oriData = {
				pop:this.pop,
				safe:this.safe,
				meme:this.meme
			}
		}
		
	}

	public set times(v:number){
		if(v<=-1)v=-1
		this._times = v
	}
	public get times(){
		return this._times
 	}
	 /**使用时发生的效果 */
	public onUse(obj:TargetObj):any{
		if(!this.effect)return
		const effects = this.effect
		for(let ef of effects){
			if(ef['trigger'] != 'use')continue
			if(ef['req']){
				const cr = this.checkReq(ef['req'], obj)
				if(!cr) continue
			}
			this.handle(ef.type, ef.data, obj)
		}
	}
	/**获得时发生的效果 */
	public onGain(obj:TargetObj):any{
		if(!this.effect)return
		const effects = this.effect
		for(let ef of effects){
			if(ef['trigger'] != 'get')continue
			if(ef['req']){
				const cr = this.checkReq(ef['req'], obj)
				if(!cr) continue
			}
			this.handle(ef.type, ef.data, obj)
		}
	}

	public reset(){
		const n = this
		n.pop = n._oriData.pop
		n.meme = n._oriData.meme
		n.safe = n._oriData.safe
	}

	private str2type(s:string){
		switch(s){
			case "song":
				return NetaType.SONG
			case "daily":
				return NetaType.TALK
			case "game":
				return NetaType.GAME
			case "spec":
				return NetaType.SPEC
			case "present":
				return NetaType.PRESENT
			case "device":
				return NetaType.DEVICE
			case "equipment":
				return NetaType.EQUIPMENT
		}
	} 
}

class GameNeta extends Neta{
	private _reduce:number
	private _usage:number
	
	public constructor(obj:any) {
		super(obj)
		this._reduce = obj['reduce']?obj['reduce']:5
		this._usage = 0
	}
	public onUse(obj:TargetObj):any{
		super.onUse(obj)
		this._usage ++ 
		if(this._usage == this._reduce){
			console.log(`${this.name}效果衰减`)
			this._oriData.pop = Math.round(this._oriData.pop/2)
		}
	}
}

class SongNeta extends Neta{
	/**歌唱力需求(隐藏值)，liver歌唱力低于该值会降低直播效果 */
	public songReq:number
	/**每隔cd回合才能使用一次歌唱neta */
	public cd:number
	protected curCD:number
	public constructor(obj:any) {
		super(obj)
		this.songReq = obj['songReq']?obj['songReq']:1
		this.cd = obj['cd']?obj['cd']:3
		this.curCD = 0
	}

	public startCD(){
		this.curCD = this.cd+1
	}

	public clearCD(){
		this.curCD = 0
	}

	public onCD(){
		if(this.curCD>0){
			this.curCD --
		}
	}

	public get usable(){
		return this.curCD == 0
	}
}
 