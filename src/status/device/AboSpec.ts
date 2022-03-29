class AboSpec   extends Device {
	private _jsonObj:any
	public constructor(obj:any) {
		super(obj)
		this._jsonObj = obj
	}
	//树莓，获得时得到一个减体力状态，复数获得时叠加减少的数值。
	//使用成功时，树莓数量减少一个，减体力状态减少的数值减一，且重置由于使用失败而增加的减少数值
	//使用失败时，树莓数量不变，减体力状态减少的数值加一

	/**获得时发生的效果 */
	public onGain(obj:TargetObj):any{
		if(!obj.player)return
		let buff = new TreeBerry(obj.player)
		obj.player.getBuff(buff)
	}

	public onUse(obj:TargetObj):any{
		const mc = obj.player
		const tgt = obj.tgtPlayer
		if(!mc || !tgt) return
		
		let {n, r} = Roll.random(mc, "", true)
		//test
		// r = RollResult.FAIL
		let tp = tgt[0]
		let failed = false
		if(r == RollResult.FAIL || r == RollResult.BIG_FAIL){
			r = RollResult.FAIL
			tp = mc
			failed = true
		}else{
			r = RollResult.SUCCESS
		}
		WorldMap.focusToPlayer(tp)
		.wait(100)
		.call(()=>{		
			
			this.dispatchEvent(new RollEvent(n,r))
			// console.log('this.dnum : ', this.dnum)
			if(failed){
				let buff = new TreeBerry(obj.player, this._times+1)
				mc.removeBuff("TreeBerry")
				mc.getBuff(buff)

				const item = new AboSpec(this._jsonObj)
				tp.netaBag.modifyNeta(item, 'get', false, 2, false)
				SoundManager.instance.playBgs('dededon_short_mp3')
			}else{
				if(this._times <= 1){
					mc.removeBuff('TreeBerry')
				}else{
					const buff = new TreeBerry(mc, this._times-1)
					mc.removeBuff('TreeBerry')
					mc.getBuff(buff)
				}
				let buff = new TreeBerry(tp, 1)
				tp.getBuff(buff)

				const item = new AboSpec(this._jsonObj)
				tp.netaBag.modifyNeta(item, 'get', false, 1, false)

			}
			tp.dispObj.showAttacked()
		})
		.wait(1000)
		.call(()=>{
			WorldMap.focusToPlayer(mc)
			this.dispatchEvent(new egret.Event(GameEvents.DEVICE_FINISH))
		})
		
	}
}