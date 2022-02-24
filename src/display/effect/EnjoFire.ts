class EnjoFire extends egret.Sprite implements IDisposable{
	private _w:number
	private _p1:particle.GravityParticleSystem
	private _p2:particle.GravityParticleSystem
	private _p3:particle.GravityParticleSystem
	public constructor(width:number) {
		super()
		// this.graphics.beginFill(0x000000)
		// this.graphics.drawRect(0, 0, 100, 100)
		// this.graphics.endFill()
		this._w = width / 2
		const p1 = new particle.GravityParticleSystem(RES.getRes('firep1_png'), this.mountData(RES.getRes('firep1_json')))
		const p2 = new particle.GravityParticleSystem(RES.getRes('firep2_png'), this.mountData(RES.getRes('firep2_json')))
		const p3 = new particle.GravityParticleSystem(RES.getRes('firep3_png'), this.mountData(RES.getRes('firep3_json')))
			
		p1.start()
		p2.start()
		p3.start()
		
		this.addChild(p3)	
		this.addChild(p2)			
		this.addChild(p1)
		
		this._p1 = p1
		this._p2 = p2
		this._p3 = p3
	}

	public dispose(){
		const f = this
		f._p1.stop()
		f._p2.stop()
		f._p3.stop()
		f.removeChildren()
		f.parent && f.parent.removeChild(f)
	}
	

	private mountData(obj:any){
		obj['emitterVariance']['x'] = this._w
		obj['maxParticles'] /= 2
		return obj
	}
}