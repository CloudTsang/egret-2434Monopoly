class NormalReal extends MapEvent{
	private _el:EvtLog

	public constructor(obj:any) {
		super(obj)
	}

	protected onSelected(e:egret.Event){
		this.dispatchEvent(new egret.Event(GameEvents.EVENT_START))

		const i = e.data.index

		const {n, r} = Roll.random(this._mc)
		/**roll后马上执行的方法 */
		let fn:()=>void = null
		/**点击对话框后执行的方法 */
		let fn2:()=>void = null

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
					fn2 = ()=>{
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
					fn2 = ()=>{
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
						this._mc.data[prop] += rate
					}
					fn2 = ()=>{
						this.onLogTap()
					}
					break
				default:
					log = this.getLog(r, log, '')
					fn=()=>{
						this._mc.data[dataStr] += rate
					}
					fn2 = ()=>{
						this.onLogTap()
					}
					break
			}
			
			const evtLog = WorldMap.showEvtLog(log)
			this._el = evtLog
			fn && fn()
			evtLog.addEventListener("touchTap", (e)=>{
				fn2 && fn2()
				
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
		let words = RES.getRes("words_json")
		switch(prop){
			case "":
				tmp = words['log_prop'][r as string]
				return oriLog.replace("{result}", tmp)
			case "neta":
				tmp = words['log_neta'][r as string]
				if(r == RollResult.BIG_FAIL){
					return tmp
				}
				return oriLog.replace("{result}", tmp)
			
			case "commu|money":
				const obj1 = words['log_baito'][r as string]
				tmp = obj1[0]
				tmp2 = obj1[1]
				return oriLog.replace("{result1}", tmp).replace("{result0}", tmp2)
			//'commu','talk','strength','sense','sing','game','tech'
			default:
				return oriLog.replace("{result}", words['propName'][prop])
				
		}

	}
}