/***触发事件的相关计数 */
class EventData implements ISavable{
	/**召唤恶魔的次数 */
	public devil:number = 0
	/**是否已升级至3.0 */
	public has3_0:boolean = false
	/**是否已有10w人3d */
	public has3D:boolean = false
	/**是否已主流出道 */
	public major:boolean = false
	/**直播十三机兵次数 */
	public aegis13:number = 0
	/**是否已得到海滨假日neta */
	public hasAegis13:boolean = false
	/**直播xb2次数 */
	public xb2:number = 0
	/**是否已得到xb2第7/8章neta */
	public hasXB2Ch78:boolean = false

	public constructor() {
	}

	/**检查是否满足特殊neta条件 */
	public checkHasNewNeta(){
		if(this.aegis13 >= 2 && !this.hasAegis13){
			return "aegis13"
		}
		if(this.xb2 >= 2 && !this.hasXB2Ch78){
			return 'xb2'
		}
		return null
	}

	public get saveObj(){
		return this
	}

	public set saveObj(v:any){
		const t = this
		for(let key in v){
			t[key] = v[key]
		}
	}
}