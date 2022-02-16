class ToyaSkill2 extends Skill{
	public constructor(mc:MainCharacter, data:any) {
		super(mc, data)
	}

	public triggerStream(stream:Stream){
		const tot = stream.totalPop + stream.totalMeme
		if(tot > 10){
			return
		}
		super.triggerStream(stream)
	}
}