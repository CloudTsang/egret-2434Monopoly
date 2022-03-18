interface Effect{
    /**效果类型 */
    type:string
    /**数据 */
    data:any
	trigger?:string
}

interface TargetObj{
	neta?:Neta
	allNeta?:Neta[]
	stream?:Stream
	bag?:NetaBag
	/**临时数据 */
	mc?:CData
	/** 永久数据*/
	mc2?:CData
	/**事件数据 */
	mc3?:EventData
	npc?:Liver|BaseLiver	
	player?:MainCharacter
	tgtPlayer?:MainCharacter[]
}

class EffectHandler extends BaseObj{
    protected effect:Effect[]
	
    constructor(){
        super()
        this.effect = []
    }

    protected handle(ty:EffectType, data:any, target:TargetObj = null){
		switch(ty){
			case EffectType.STAT_CHANGE:
			case EffectType.TEMP_STAT_CHANGE:
				try{
					this.onStatChange(data, target)
				}catch(err){
					console.error(err)
				}
				break
			case EffectType.GET_NETA:				
				const newNeta = NetaFactory.getNetaFromObj(data)
                if(target.bag){
                    target.bag.modifyNeta(newNeta, "get" ,true)
                }
				break
			case EffectType.GET_BUFF:
				const cname = data
				if(!cname) return
				const fn = egret.getDefinitionByName(cname)
				if(!fn || (!target.player && !target.tgtPlayer)) return
				if(!target.tgtPlayer){
					const buff = new fn(target.player)
					target.player.getBuff(buff)
				}else{
					for(let tp of target.tgtPlayer){
						const buff = new fn(tp)
						tp.getBuff(buff)
					}
				}
				break
			case EffectType.REMOVE_BUFF:
				if(target.player){
					target.player.removeBuff(data)
				}
			case EffectType.PLAY_BGS:
				SoundManager.instance.playBgs(data)
		}
	}

    protected onStatChange(data:any, target:TargetObj){
		const changeStr:string = data
		const changeArr:string[] = changeStr.split(',')
		for(let s of changeArr){
			const marr = s.match(/\{.+\}/g)
			if(marr.length == 0){
				continue
			}
			const prop:string = marr[0] 
            const propArr:string[] = prop.substr(1,prop.length-2).split('.')
			if(!target[propArr[0]]) return
			
			const ori = target[propArr[0]][propArr[1]]
			const evalS = s.replace(marr[0], ori)
			target[propArr[0]][propArr[1]] = eval(evalS)
		}
	}

	protected checkReq(data:string, target:TargetObj){
		if(!data) return true
		const arr = data.split(',')
		for(let s of arr){
			const marr = s.match(/\{.+\}/g)
			if(marr.length == 0){
				continue
			}
			const prop:string = marr[0] 
            const propArr:string[] = prop.substr(1,prop.length-2).split('.')
			const ori = target[propArr[0]][propArr[1]]
			const evalS = s.replace(marr[0], ori)
			const result = eval(evalS)
			if(!result) return false
		}
		return true
	}
}