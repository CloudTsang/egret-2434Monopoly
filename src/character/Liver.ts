class Liver extends BaseObj{
	public static allLivers:BaseLiver[]
	public static init(playersID:string[]){
		let arr:BaseLiver[] = RES.getRes("alllivers_json")
		arr = arr.filter((v:BaseLiver)=>{
			return playersID.indexOf(v.ID) < 0
		})
		Liver.allLivers = arr
	}
	public constructor() {
		super()
	}
}

interface BaseLiver{
	ID:string,
	name:string,
	des:string,
	iconUrl:string,
	tag?:string[]
}

interface NpcObj extends BaseLiver{
	favor:number
}