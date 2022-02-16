class SoundManager {
	private _bgm:egret.Sound;
	private _bgmChannel:egret.SoundChannel;
	private _bgmPosition:number;
	private _bgs:{[key:string]:egret.Sound}
	private static _ins:SoundManager;
	public static instance(){
		if(!SoundManager._ins){
			SoundManager._ins = new SoundManager();
		}
		return SoundManager._ins
	}

	public constructor() {
		LifecycleCallback.addFunc('bgm', ()=>{this.pause()}, ()=>{this.resume()})
		this._bgs = {}
	}

	public play(name:string, loops:boolean=true){
		// return
		if(this._bgm){
			this._bgmChannel.stop();
			this._bgm.close();			
		}
		this._bgm = RES.getRes(name)
		this._bgm.type = egret.Sound.MUSIC;
		this._bgmChannel = this._bgm.play(0, loops?0:1);	
	}

	public playBgs(name:string){
		let s:egret.Sound 
		if(!this._bgs[name]){
			s = RES.getRes(name) as egret.Sound
		}else{
			s = this._bgs[name]
		}
		s.play(0,1)
		 
	}

	public resume(){
		if(!this._bgm){
			return;	
		}
		this._bgmChannel = this._bgm.play(this._bgmPosition);				
	}

	public pause(){
		if(this._bgm){	
			this._bgmPosition = this._bgmChannel.position
			this._bgmChannel.stop();	
			// this._bgm.close();				
		}
	}
}