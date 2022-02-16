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
	npc?:Liver	
	player?:MainCharacter
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
				const newNeta:Neta = new Neta(data)
                if(target.bag){
                    target.bag.modifyNeta(newNeta, "get" ,true)
                }
				break
			case EffectType.GET_BUFF:
				const cname = data['class']
				if(!cname) return
				const fn = egret.getDefinitionByName(cname)
				if(!fn || !target.player) return
				const buff = new fn(target.player)
				target.player.getBuff(buff)
				break
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
			console.log(evalS)
			const result = eval(evalS)
			if(!result) return false
		}
		return true
	}
}