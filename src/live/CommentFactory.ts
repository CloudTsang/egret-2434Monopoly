class CommentFactory {
	private objs:CommentsCollection
	constructor(){
		this.objs = RES.getRes("comment_1_json")
	}

	public getComment(ty:StreamType){
		let arr:string[]
		const tmp = Math.random()>0.5
		if(tmp){
			switch(ty){
				case StreamType.GAME:
					arr = this.objs.game
					break
				case StreamType.SING:
					arr = this.objs.sing
				default:
					arr = this.objs.normal
					break
			}

		}else{
			arr = this.objs.normal
		}

		return arr[Math.floor(Math.random()*arr.length)]
	}
	public getEnjoComment(){
		const arr = this.objs.enjo
		return arr[Math.floor(Math.random()*arr.length)]
	}
	public getAccidentComment(){
		const arr = this.objs.accident
		return arr[Math.floor(Math.random()*arr.length)]
	}
}

interface CommentsCollection{
	normal:string[]
	game:string[]
	sing:string[]
	accident:string[]
	enjo:string[]
}