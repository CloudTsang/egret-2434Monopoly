class SaveData {
	public static gameData:IWorldSaveObj
	public static save(wc:WorldController){
		localStorage.setItem("savedata", JSON.stringify(wc.saveObj))
	}

	public static load(){
		const s = localStorage.getItem('savedata')
		if(!s || s == '') return null
		SaveData.gameData = JSON.parse(s)
		return SaveData.gameData
	}

	public static delete(){
		SaveData.gameData = null
		localStorage.removeItem('savedata')
	}
}

interface IWorldSaveObj{
	mode:GameMode,
	players: ICharacterSaveObj[]
	/**[虚拟格, 显示格] */
	cell: string[][]
	curPlayer: 0|1|2|3
	curTurn: number
	maxTurn: number,
	/**玩家所在棋子的索引 */
	chessCellIndexes: number[]
}

interface ICharacterSaveObj{
	index: number,
	id: string,

	/**基本状态 */
	data: ICDataSaveObj,
	/**临时状态 */
	data2: ICDataSaveObj,
	/**事件计数 */
	edata: any,
	stream: IStreamSaveObj[],
	
	buff: IBuffSaveObj[],
	neta: INetaSaveObj[],
	npc: any,

	equipment: string,	
	subs: number,
	/**订阅增长速度 */
	increase: number,
	/**回到起点收入 */
	income: number,
	anti: number,
	totalStep: number
}

interface ICDataSaveObj{
	commu: number,
	tech: number,
	talk: number,
	strength: number,
	luck: number,
	game: number,
	sing: number,
	sense: number,
	money: number
}

interface IStreamSaveObj extends StreamBaseInfo{}

interface IBuffSaveObj{
	id:string, time:number
}

interface INetaSaveObj{
	name: string,
	ty: NetaType,
	pop: number,
	meme: number,
	safe: number,
	/**可使用次数 */
	times: number
}

interface IGameSaveObj extends INetaSaveObj{
	/**已使用次数，达到一定次数时pop降低 */
	usage: number
}

interface ISongSaveObj extends INetaSaveObj{
	curCD: number
}