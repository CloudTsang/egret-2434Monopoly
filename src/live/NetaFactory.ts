class NetaFactory {
	public static getNeta(ty:NetaType){
		let obj:any[]
		let jsonUrl:string
		let buildFn = Neta
		
		switch(ty){
			case NetaType.TALK:
				jsonUrl = 'netas_daily_1_json'
				break
			case NetaType.GAME:
				jsonUrl = 'netas_game_1_json'
				break
			case NetaType.SONG:
				jsonUrl = 'netas_song_1_json'
				buildFn = SongNeta
				break
			default:
				return null
		}
		obj = RES.getRes(jsonUrl)

		const tmp = obj[Math.floor(Math.random()*obj.length)]
		if(tmp['class']){
			const tmpfn = egret.getDefinitionByName(tmp['class'])
			if(tmpfn)buildFn = tmpfn
		}
		return new buildFn(tmp)
	}

	public static getNetaFromObj(obj:any):Neta{
		let fn = Neta
		if(obj['type'] == 'device'){
			fn = Device
		}else if(obj['type'] == 'song'){
			fn = SongNeta
		}
		
		if(obj['class']){
			const fn2 = egret.getDefinitionByName(obj['class'])
			if(fn2) fn = fn2
		}
		return new fn(obj)
	}

	/**获取总值在范围内的杂谈neta */
	public static getNetaWhichStatBetween(lower:number, higher:number){
		let buildFn = Neta
		let objs :any[] = RES.getRes('netas_daily_1_json')
		objs = objs.filter((obj:any)=>{
			const d = obj.data
			const s = d.meme + d.safe + d.pop
			// console.log(obj.name , s)
			return (lower==-1 || s>lower) && (higher==-1 || s<=higher)
		})
		console.log(objs)
		const tmp = objs[Math.floor(Math.random()*objs.length)]
		if(tmp['class']){
			const tmpfn = egret.getDefinitionByName(tmp['class'])
			if(tmpfn)buildFn = tmpfn
		}
		return new buildFn(tmp)
	}

	public static getPresentNeta(name:string){
		const objs = RES.getRes('netas_present_1_json')
		let netaData
		for(let obj of objs){
			if(obj['name'] == name){
				netaData = obj
				break
			}
		}
		return NetaFactory.getNetaFromObj(netaData)
	}

	public static getGiftNeta(name:string){
		const urls = ['device_spec_json', 'neta_spec_1_json']
		for(let u of urls){
			const objs:any[] = RES.getRes(u)
			for(let obj of objs){
				if(obj['owner'] && obj['owner'] == name){
					return NetaFactory.getNetaFromObj(obj)
				}
			}
		}
	}

	/**需要满足触发过特定事件才能获得的neta */
	public static getEvtNeta(name:string){
		const urls = ['neta_spec_2_json']
		for(let u of urls){
			const objs:any[] = RES.getRes(u)
			for(let obj of objs){
				if(obj['req'] && obj['req'] == name){
					return NetaFactory.getNetaFromObj(obj)
				}
			}
		}
	}

}