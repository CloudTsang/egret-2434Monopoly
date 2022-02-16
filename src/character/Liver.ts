class Liver extends BaseObj{
	public static allLivers:BaseLiver[]
	public static init(){
		Liver.allLivers = RES.getRes("alllivers_json")
	}
	public constructor() {
		super()
	}
}

interface BaseLiver{
	id:string,
	name:string,
	des:string,
	iconUrl:string,
	tag?:string[]
}

interface NpcObj extends BaseLiver{
	favor:number
}