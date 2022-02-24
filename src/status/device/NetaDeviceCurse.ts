class NetaDeviceCurse  extends Device{
	public constructor(obj:any) {
		super(obj)
		this.target = EffectTarget.SELECT_ONE
	}

	 /**使用时发生的效果 */
	public onUse(obj:TargetObj):any{
		const mc = obj.player
		const tgt = obj.tgtPlayer
		if(!mc || !tgt) return
		
		let {n, r} = Roll.random(mc)
		const rate = this.getRate(r)
		
		let effectee1:MainCharacter
		let effectee2:MainCharacter
		if(rate > 0){
			effectee1 = tgt[0]
			effectee2 = mc
		}else{
			effectee1 = mc
			effectee2 = tgt[0]
		}

		egret.Tween.get(this)
		.call(()=>{
			if(rate < 0){
				SoundManager.instance.playBgs('dededon_short_mp3')
			}
			WorldMap.showRollNum(n, r)
		})
		.wait(500)
		.call(()=>{
			WorldMap.showCurseEffect(mc, effectee1, ()=>{
				this.onCurse(rate, effectee1, effectee2)
				this.dispatchEvent(new egret.Event(GameEvents.DEVICE_FINISH))
			})
			
		})
	}
	/**
	 * @param effectee1 效果损害方
	 * @param effectee2 效果收益方
	 */
	protected onCurse(rate:number, effectee1:MainCharacter, effectee2:MainCharacter=null){
		if(!effectee1)return
		for(let ef of this.effect){
			const c = ef['count']?ef['count']:1
			let num = c*Math.abs(rate)
			switch(ef.type){
				case EffectType.GET_BUFF:
					const bname = ef.data
					let fn = egret.getDefinitionByName(bname)
					if(!fn){
						console.warn("诅咒的buff类型未设置")
						return
					}
					console.log(`对${effectee1.name}附加${num}回合buff:${bname}`)
					let buff = new fn(effectee1, num+1)
					effectee1.getBuff(buff)
					break
				case EffectType.LOSE_NETA:
					for(let i=0; i<num; i++){
						effectee1.netaBag.lostNeta(NetaType.TALK, 1)
					}
					break
				case EffectType.STAT_CHANGE:
					break
				case EffectType.SUBS_TRAN:
					const num2 = effectee1.subscribe >= num? num : effectee1.subscribe
					effectee1.subscribe-=num2
					effectee2.subscribe+=num2
					break
			}
		}
	}

	protected getRate(r:RollResult){
		let rate = 0
		switch(r){
			case RollResult.BIG_SUCCESS:
				rate = 4
				break
			case RollResult.SUCCESS:
				rate = 2
				break
			case RollResult.NORMAL:
				rate = 1
				break
			case RollResult.FAIL:
				rate = -1
				break
			case RollResult.BIG_FAIL:
				rate = -2
				break
		}
		return rate
	}
}