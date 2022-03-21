class RotionSports  extends Neta{
	public constructor(obj:any) {
		super(obj)
	}

	 /**使用时发生的效果 */
	public onUse(obj:TargetObj):any{
		if(!obj.stream || !obj.player){
			return
		}
		let rotionNeta:Neta
		const bag = obj.player.netaBag
		for(let n of bag.device){
			if(n.ID == 'NetaDeviceRotion'){
				rotionNeta = n
				break
			}
		}
		if(!rotionNeta){
			return
		}
		const t = rotionNeta.times
		console.log(`使用${rotionNeta.times}个${rotionNeta.name}提升${this.name}直播效果`)
		bag.modifyNeta(rotionNeta, "use", false, t)
		obj.stream.baseRate += t * 0.2
	}
}