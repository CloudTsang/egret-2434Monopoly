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
		try{
			let fn = Neta
			switch(obj['type']){
				case 'device':
					fn = Device
					break
				case 'song':
					fn = SongNeta
					break
				case 'game':
					fn = GameNeta
					break
				case 'equipment':
					fn = Equipment
					break
			}
			
			if(obj['class']){
				const fn2 = egret.getDefinitionByName(obj['class'])
				if(fn2) fn = fn2
			}
			return new fn(obj)
		}catch(err){
			console.log(err)
			return null
		}
		
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

	public static getGiftNeta2(names:string[]){
		const urls = ['device_spec_json', 'neta_spec_1_json']
		let gnObjs:any[] = []
		outer:
		for(let u of urls){
			const objs:any[] = RES.getRes(u)
			for(let obj of objs){
				if(obj['owner'] && names.indexOf(obj['owner'])>=0){
					gnObjs.push(obj)
				}
				if(gnObjs.length == 3){
					break outer;
				}
			}
		}
		if(gnObjs.length==0){
			return null
		}
		const i = Math.floor(Math.random()*gnObjs.length)
		return NetaFactory.getNetaFromObj(gnObjs[i])
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

	public static loadAllNetas(save:INetaSaveObj[]){
		const urls:string[] = [
			'netas_daily_1_json', 'netas_game_1_json', 'netas_song_1_json',
			'netas_present_1_json', 'neta_spec_1_json', 'neta_spec_2_json',
			'device_spec_json', 'device_1_json', 'device_2_json',
			'equipment_json', 'equipment_spec_json'
		]
		let arr:any[] = []
		for(let u of urls){
			arr = arr.concat(RES.getRes(u))
		}
		const ret:Neta[] = []
		for(let i=0; i<NetaType.LEN; i++){
			let tmp = save.filter((v:INetaSaveObj)=>{
				return v.ty == i
			})
			const tystr = Neta.type2str(i)
			let tmp2 = arr.filter((v:any)=>{
				return v['type'] == tystr
			})

			for(let obj1 of tmp){
				const n1 = obj1.name
				let rawdata:any = null
				let buildFn = Neta
				for(let obj2 of tmp2){
					const n2 = obj2['name']
					if(n1 == n2){
						rawdata = obj2
						break
					}
				}
				if(rawdata){
					const n = NetaFactory.getNetaFromObj(rawdata)
					if(n instanceof GameNeta){
						(n as GameNeta).usage = (obj1 as IGameSaveObj).usage
					}
					if(n instanceof SongNeta){
						(n as SongNeta).cd = (obj1 as ISongSaveObj).curCD
					}
					n.pop = obj1.pop
					n.safe = obj1.safe
					n.meme = obj1.meme
					n.times = obj1.times
					ret.push(n)
				}
			}
		}
		return ret
	}
}