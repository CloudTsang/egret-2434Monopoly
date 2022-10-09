/**角色数据 */
class CData implements ISavable{
	public allLock:boolean = false
	/**所持金 */
	private _money:number = 0
	public moneyLock:boolean = false
	/**体力 */
	private _strength:number = 0
	public strengthLock:boolean = false
	/**运气 */
	private _luck:number = 0 
	public luckLock:boolean = false
	/**感性，影响neta获取概率 */
	private _sense:number = 0 
	public senseLock:boolean = false
	/**交流力，影响联动效果 */
	private _commu:number = 0
	public commuLock:boolean = false 
	/**游戏力 */
	private _game:number = 0
	public gameLock:boolean = false
	/**歌力 */
	private _sing:number = 0
	public singLock:boolean = false
	/**杂谈力 */
	private _talk:number = 0 
	public talkLock:boolean = false
	/**技术力 */
	private _tech:number = 0
	public techLock:boolean = false

	private _minusLock:boolean
	/**
	 * @param minusLock 修改值是否不可小于0
	 */
	 constructor(obj:any=null, minusLock:boolean=false){
		 this._minusLock = minusLock
		 if(obj){
			for(let k in obj){
				this[k] = obj[k]
			}
		 }
	 }

	 /**交流力，影响联动效果 */
	 public get commu() : number {
		 return this._commu;
	 }
	 public set commu(v : number) {
		 if(v<0 && this._minusLock)return
		 if(this.commuLock || this.allLock) return
		 this._commu = v;
	 }
	 /**游戏力 */
	 public get game() : number {
		 return this._game;
	 }
	 public set game(v : number) {
		  if(v<0 && this._minusLock)return
		 if(this.gameLock || this.allLock) return
		 this._game = v;
	 }
	 /**运气 */
	 public get luck() : number {
		 return this._luck;
	 }
	 public set luck(v : number) {
		  if(v<0 && this._minusLock)return
		 if(this.luckLock || this.allLock) return
		 this._luck = v;
	 }
	 /**所持金 */
	 public get money() : number {
		 return this._money;
	 }
	 public set money(v : number) {
		 if(v<0) v=0
		 if(this.moneyLock || this.allLock) return
		 this._money = v;
	 }
	 /**感性，影响neta获取概率 */
	 public get sense() : number {
		 return this._sense;
	 }
	 public set sense(v : number) {
		 if(v<0 && this._minusLock)return
		 if(this.senseLock || this.allLock) return
		 this._sense = v;
	 }
	 /**歌力 */
	 public get sing() : number {
		 return this._sing;
	 }
	 public set sing(v : number) {
		 if(v<0 && this._minusLock)return
		 if(this.singLock || this.allLock) return
		 this._sing = v;
	 }
	 /**体力 */
	 public get strength() : number {
		 return this._strength;
	 }
	 public set strength(v : number) {
		 if(v<0 && this._minusLock)return
		 if(this.strengthLock || this.allLock) return
		 this._strength = v;
	 }
	/**杂谈力 */
	 public get talk() : number {
		 return this._talk;
	 }
	 public set talk(v : number) {
		 if(v<0 && this._minusLock)return
		 if(this.talkLock || this.allLock) return
		 this._talk = v;
	 }
	 /**技术力 */
	  public get tech() : number {
		 return this._tech;
	 }
	 public set tech(v : number) {
		 if(v<0 && this._minusLock)return
		 if(this.techLock || this.allLock) return
		 this._tech = v;
	 }

	 public get saveObj(){
		 const t = this
		 return {
			 commu: t.commu,
			 tech: t.tech,
			 talk: t.talk,
			 strength: t.strength,
			 luck: t.luck,
			 game: t.game,
			 sing: t.sing,
			 sense: t.sense,
			 money: t.money
		 }
	 }

	 public set saveObj(v:ICDataSaveObj){
		 const t = this
		 t._commu = v.commu
		 t._game = v.game
		 t._luck = v.luck
		 t._sing = v.sing
		 t._money = v.money
		 t._talk = v.talk
		 t._sense = v.sense
		 t._strength = v.strength
		 t._tech = v.tech
	 }
	 
}


