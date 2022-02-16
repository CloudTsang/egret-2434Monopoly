class NormalReal extends MapEvent{
	private _el:EvtLog

	public constructor(obj:any) {
		super(obj)
	}

	protected onSelected(e:egret.Event){
		this.dispatchEvent(new egret.Event(GameEvents.EVENT_START))

		const i = e.data.index

		const {n, r} = Roll.random(this._mc)
		let fn:()=>void = null

		egret.Tween.get(this)
		.wait(200)
		.call(()=>{
			WorldMap.showRollNum(n, r)
		})
		.wait(500)
		.call(()=>{
			const dataStr = this.selections[i].data
			
			let log = this.selections[i].log
			let rate = this.getUpRate(r)
			switch(dataStr){
				case "commu|money":		
					const rate2 = rate * 10000 * (1 + this._mc.strength/10)							
					log = this.getLog(r, log, dataStr)
					fn = ()=>{
						this._mc.data.commu = rate
						this._mc.money += rate2
						setTimeout(()=>{this.onLogTap()}, 200)
					}
					break
				case "neta":
					log = this.getLog(r, log, 'neta')
					let getNeta = null
					switch(r){
						case RollResult.BIG_SUCCESS:
							getNeta = NetaFactory.getNetaWhichStatBetween(9, -1)
							break
						case RollResult.SUCCESS:
							getNeta = NetaFactory.getNetaWhichStatBetween(6, -1)
							break
						case RollResult.NORMAL:
							getNeta = NetaFactory.getNetaWhichStatBetween(3, 9)
							break
						case RollResult.FAIL:
							getNeta = NetaFactory.getNetaWhichStatBetween(-1, 3)
							break
						case RollResult.BIG_FAIL:				
						getNeta = NetaFactory.getNetaWhichStatBetween(-1, 3)			
							break
					}
					fn = ()=>{
						this._mc.netaBag.modifyNeta(getNeta, 'get', true)
						this._el.dispose()
						this._el = null
						setTimeout(()=>{
							this._mc = null
							this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
						}, 3000)
					}
					break
				case "random":
					const arr = ['commu','talk','strength','sense','sing','game','tech']
					const i = Roll.random2(arr.length)
					const prop = arr[i]
					if(rate == 0) rate = 0.5
					log = this.getLog(r, log, prop)
					fn = ()=>{
						this._mc.data[prop] + rate
						this.onLogTap()
					}
					break
				default:
					log = this.getLog(r, log, '')
					fn=()=>{
						this._mc.data[dataStr] += rate
						this.onLogTap()
					}
					break
			}
			
			const evtLog = WorldMap.showEvtLog(log)
			this._el = evtLog
			evtLog.addEventListener("touchTap", (e)=>{
				fn()
			}, this)
		})
	}

	protected onLogTap(e:any=null){
		this._el.dispose()
		this._el = null
		this._mc = null
		this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
	}

	private getUpRate(r:RollResult){
		switch(r){
			case RollResult.BIG_SUCCESS:
				return 2
			case RollResult.SUCCESS:
				return 1.5
			case RollResult.NORMAL:
				return 1
			case RollResult.FAIL:
				return 0.5
			case RollResult.BIG_FAIL:
				return 0.1
		}
	}

	private getLog(r:RollResult, oriLog:string, prop:string=''){
		let tmp = ''
		let tmp2 = ''
		switch(prop){
			case "":
				switch(r){
					case RollResult.BIG_SUCCESS:
						tmp = '大幅地'
						break
					case RollResult.SUCCESS:
						tmp = "明显地"
						break
					case RollResult.NORMAL:
						tmp = "坚实地"
						break
					case RollResult.FAIL:
						tmp = "稍微"
						break
					case RollResult.BIG_FAIL:
						tmp = "也许"
						break
				}
				return oriLog.replace("{result}", tmp)
			case "neta":
				switch(r){
					case RollResult.BIG_SUCCESS:
						tmp = '斯巴拉西的'
						break
					case RollResult.SUCCESS:
						tmp = "有趣的"
						break
					case RollResult.NORMAL:
						tmp = "普通的"
						break
					case RollResult.FAIL:
						tmp = "微妙的"
						break
					case RollResult.BIG_FAIL:
						return "只是在街上瞎逛，什么事情都没发生"	
				}
				return oriLog.replace("{result}", tmp)
			
			case "commu|money":
				switch(r){
					case RollResult.BIG_SUCCESS:
						tmp = '大幅地'
						tmp2 = "厚厚一叠的"
						break
					case RollResult.SUCCESS:
						tmp = "明显地"
						tmp2 = '稍微多一些的'
						break
					case RollResult.NORMAL:
						tmp = "坚实地"
						tmp2 = "一如既往的"
						break
					case RollResult.FAIL:
						tmp = "稍微"
						tmp2 = "薄薄几张的"
						break
					case RollResult.BIG_FAIL:
						tmp = "也许"
						tmp2 = "少得可怜的"
						break
				}
				return oriLog.replace("{result1}", tmp).replace("{result0}", tmp2)
			//'commu','talk','strength','sense','sing','game','tech'
			case "commu":
				return oriLog.replace("{result}", "交流力")
			case "talk":
				return oriLog.replace("{result}", "杂谈力")
			case "strength":
				return oriLog.replace("{result}", "体力")
			case "sense":
				return oriLog.replace("{result}", "品位")
			case "sing":
				return oriLog.replace("{result}", "歌唱力")
			case "game":
				return oriLog.replace("{result}", "游戏力")
			case "tech":
				return oriLog.replace("{result}", "技术力")
				
		}

	}
}