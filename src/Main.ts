//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {
    private currentScene:egret.DisplayObject
    private world:WorldController
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
            context.onUpdate = () => {

            }
        })

        // egret.lifecycle.onPause = () => {
        //     egret.ticker.pause();
        // }

        // egret.lifecycle.onResume = () => { 
        //     egret.ticker.resume();
        // }

        LifecycleCallback.addFunc("ticker", 
        ()=>{
            egret.ticker.pause();
        },
        ()=>{
             egret.ticker.resume();
        }
        )

        //inject the custom material parser
        //?????????????????????????????????
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        this.runGame().catch(e => {
            console.log(e);
        })



    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //??????????????????????????????,??????????????????????????????????????????????????????
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    /**
     * ??????????????????
     * Create a game scene
     */
    private createGameScene() {

        LifecycleCallback.regist()
       
        WorldData.STAGE_W = this.stage.stageWidth
        WorldData.STAGE_H = this.stage.stageHeight

        const bg = new egret.Shape()
        bg.graphics.beginFill(0xBBBBBB)
        bg.graphics.drawRect(0,0,WorldData.STAGE_W,WorldData.STAGE_H)
        bg.graphics.endFill()
        this.addChild(bg)
        this.toTitle(null)
        // this.toWorld({
        //     data:{
        //         livers:[ 'umeo_json',"mito_json"]
        //         // livers:['mito_json', 'toya_json', 'rion_json', 'sasaki_json']
        //     }
        // })
        return

    }

    protected toTitle(e:egret.Event){
        SoundManager.instance.stop()
        if(this.currentScene) this.removeChild(this.currentScene)
        const title = new TitlePage()
        title.width = WorldData.STAGE_W
        title.height = WorldData.STAGE_H
        this.currentScene = title
        this.addChild(title)

        title.once(GameEvents.TO_PLAYER_SELECT, this.toPlayerSelect, this)

    }

    protected toPlayerSelect(e:egret.Event){
        this.removeChild(this.currentScene)

        WorldData.gameMode = e.data.mode
        const playSelect:StartSelectPanel = new StartSelectPanel()
        playSelect.width = WorldData.STAGE_W
        playSelect.height = WorldData.STAGE_H
        playSelect.once(GameEvents.GAME_START, this.toWorld, this)
        this.currentScene = playSelect
        this.addChild(playSelect)
    }

    protected toWorld(e:any){
        if(this.currentScene) this.removeChild(this.currentScene)

        const mcs = e.data.livers//['mito_json', 'toya_json', 'rion_json', 'sasaki_json']
        //test
        // const mcs = ['mito_json']
        const tnum = e.data.turn
        if(!mcs)return
        const world = new WorldController(this.stage)
        world.initMap()
        world.initPlayer(mcs)
        world.initUI()
        world.once(GameEvents.GAME_FINISH, this.toScore, this)
        this.world = world
    }

    protected toScore(e:any){
        if(this.world){
            this.world.dispose()
        }
        const score = new ScorePanel(e.data.score)
        this.currentScene = score
        this.addChild(score)     
        score.once(GameEvents.BACK2TITLE, this.toTitle, this)
    }
}