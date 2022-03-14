class Curse extends egret.Sprite{
	private blackBack:BlackBack
	private doll:CurseDoll
	public constructor() {
		super()
		const blackBack:BlackBack = new BlackBack(WorldData.STAGE_W, WorldData.STAGE_W)
		const doll:CurseDoll = new CurseDoll()
		doll.x = WorldData.STAGE_W/2
		doll.y = WorldData.STAGE_H/2
		this.blackBack = blackBack
		this.doll = doll
		this.addChild(blackBack)
		this.addChild(doll)
	}

	public play(cur:MainCharacter, tgt:MainCharacter, cb:()=>void=null){
		const doll = this.doll
		const blackBack = this.blackBack
		SoundManager.instance.pause()
		SoundManager.instance.playBgs('horror_mp3')
		blackBack.fadeIn()
		let tw1 = doll.fadeIn()
		if(cur.index == tgt.index){
			tw1 = tw1.wait(500)
		}else{
			tw1 = tw1.call(()=>{
				WorldMap.focusToPlayer(tgt)
			})
		}
		tw1.wait(1000)
		doll.fadeOut(tw1)
		.call(()=>{
			blackBack.fadeOut()
			tgt.dispObj.showAttacked()
		})
		.wait(500)
		.call(()=>{
			WorldMap.focusToPlayer(cur)
			SoundManager.instance.resume()
			cb && cb()
		})
	}
}