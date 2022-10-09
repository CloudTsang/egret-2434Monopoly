/**状态基类 */
class Buff extends BaseObj implements ISavable{
	/**持续时间，0：数字，1：T回合S直播E发动效果 */
	public time:[number,"T"|"S"|"E"]
	/**buff是否不会在角色面板上显示图标 */
	protected hide:boolean
	protected mc:MainCharacter
	public overed:boolean
	public constructor(mc:MainCharacter, t:number=1) {
		super()
		this.ID = egret.getQualifiedClassName(this)
		this.time = [t,'E']
		this.mc = mc
	}

	public get desStr(){
		let tmp = ''
		switch(this.time[1]){
			case 'S':
				tmp = '次直播'
				break
			case 'T':
				tmp = '回合'
				break
			case 'E':
				tmp = '次生效'
				break
		}
		return `${this.des}\n持续:${this.time[0]}${tmp}`
	}


	public turnCD(){
		if(this.time[1] != "T"){
			return
		}
		this.cd()
	}

	public streamCD(){
		if(this.time[1] != "S"){
			return
		}
		this.cd()
	}

	protected cd(){
		this.time[0] -- 
		let min = 0
		//cd按回合算的buff在下回合失效
		if(this.time[1] == 'T') min = -1
		if(this.time[0] <= min){
			this.off()
			this.overed = true
		}
	}

	public on(){

	}

	public off(){

	}

	public effect(obj:TargetObj){
		
	}

	/**叠加同种buff效果 */
	public add(obj:Buff){
		this.time[0] += obj.time[0]
	}

	public get saveObj(){
		return {
			id:this.ID,
			time:this.time[0]
		}
	}
}