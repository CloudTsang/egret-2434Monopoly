window.skins=window.skins||{};
                var __extends = this && this.__extends|| function (d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                        function __() {
                            this.constructor = d;
                        }
                    __.prototype = b.prototype;
                    d.prototype = new __();
                };
                window.generateEUI = window.generateEUI||{};
                generateEUI.paths = generateEUI.paths||{};
                generateEUI.styles = undefined;
                generateEUI.skins = {"eui.Button":"resource/eui_skins/normalbtn.exml","eui.CheckBox":"resource/eui_skins/CheckBoxSkin.exml","eui.RadioButton":"resource/eui_skins/RadioButtonSkin.exml","eui.HSlider":"resource/eui_skins/HSliderSkin.exml"};generateEUI.paths['resource/eui_skins/menuitem.exml'] = window.skins.menuitem = (function (_super) {
	__extends(menuitem, _super);
	function menuitem() {
		_super.call(this);
		this.skinParts = ["labelDisplay","labelSub"];
		
		this.height = 40;
		this.width = 360;
		this.elementsContent = [this._Rect1_i(),this.labelDisplay_i(),this.labelSub_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Rect1","fillColor",0xE5A137)
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Rect1","fillColor",0xCA8211)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Rect1","fillColor",0x97610C),
					new eui.SetProperty("labelDisplay","textColor",0x7F7B7B),
					new eui.SetProperty("labelDisplay","touchEnabled",false),
					new eui.SetProperty("labelSub","textColor",0x7F7B7B),
					new eui.SetProperty("labelSub","touchEnabled",false)
				])
		];
	}
	var _proto = menuitem.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		this._Rect1 = t;
		t.ellipseWidth = 50;
		t.fillColor = 0xE5A137;
		t.horizontalCenter = 0;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.strokeColor = 0xE5E0E0;
		t.strokeWeight = 3;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.horizontalCenter = 0;
		t.multiline = false;
		t.percentHeight = 100;
		t.percentWidth = 80;
		t.size = 24;
		t.text = "test";
		t.textAlign = "center";
		t.textColor = 0x000000;
		t.verticalAlign = "middle";
		t.wordWrap = false;
		return t;
	};
	_proto.labelSub_i = function () {
		var t = new eui.Label();
		this.labelSub = t;
		t.multiline = false;
		t.percentHeight = 100;
		t.right = 20;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x000000;
		t.verticalAlign = "middle";
		t.wordWrap = false;
		return t;
	};
	return menuitem;
})(eui.Skin);generateEUI.paths['resource/eui_skins/actmenu.exml'] = window.skins.actmenu = (function (_super) {
	__extends(actmenu, _super);
	function actmenu() {
		_super.call(this);
		this.skinParts = ["btnGameStream","btnSingStream","btnTalkStream","btnPresentStream","btnWatch","btnRest2"];
		
		this.height = 400;
		this.width = 260;
		this.elementsContent = [this._Group8_i()];
	}
	var _proto = actmenu.prototype;

	_proto._Group8_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Rect1_i(),this._Group7_i()];
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.ellipseWidth = 50;
		t.fillAlpha = 0.75;
		t.fillColor = 0x000000;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.strokeColor = 0xE5E0E0;
		t.strokeWeight = 3;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Group7_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		t.layout = this._VerticalLayout1_i();
		t.elementsContent = [this._Group1_i(),this.btnGameStream_i(),this._Group2_i(),this.btnSingStream_i(),this._Group3_i(),this.btnTalkStream_i(),this._Group4_i(),this.btnPresentStream_i(),this._Group5_i(),this.btnWatch_i(),this._Group6_i(),this.btnRest2_i()];
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.horizontalAlign = "center";
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 20;
		t.width = 200;
		t.x = 290;
		t.y = 103;
		return t;
	};
	_proto.btnGameStream_i = function () {
		var t = new eui.Button();
		this.btnGameStream = t;
		t.label = "游戏直播";
		t.percentWidth = 90;
		t.skinName = "skins.menuitem";
		t.x = 45;
		t.y = 70;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.height = 10;
		t.width = 200;
		t.x = 290;
		t.y = 103;
		return t;
	};
	_proto.btnSingStream_i = function () {
		var t = new eui.Button();
		this.btnSingStream = t;
		t.label = "歌回直播";
		t.percentWidth = 90;
		t.skinName = "skins.menuitem";
		t.x = 25;
		t.y = 50;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.height = 10;
		t.width = 200;
		t.x = 290;
		t.y = 103;
		return t;
	};
	_proto.btnTalkStream_i = function () {
		var t = new eui.Button();
		this.btnTalkStream = t;
		t.label = "杂谈直播";
		t.percentWidth = 90;
		t.skinName = "skins.menuitem";
		t.x = 15;
		t.y = 40;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.height = 10;
		t.width = 200;
		t.x = 290;
		t.y = 103;
		return t;
	};
	_proto.btnPresentStream_i = function () {
		var t = new eui.Button();
		this.btnPresentStream = t;
		t.label = "披露直播";
		t.percentWidth = 90;
		t.skinName = "skins.menuitem";
		t.x = 45;
		t.y = 70;
		return t;
	};
	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.height = 10;
		t.width = 200;
		t.x = 290;
		t.y = 103;
		return t;
	};
	_proto.btnWatch_i = function () {
		var t = new eui.Button();
		this.btnWatch = t;
		t.label = "观看其他直播";
		t.percentWidth = 90;
		t.skinName = "skins.menuitem";
		t.x = 35;
		t.y = 60;
		return t;
	};
	_proto._Group6_i = function () {
		var t = new eui.Group();
		t.height = 10;
		t.width = 200;
		t.x = 290;
		t.y = 103;
		return t;
	};
	_proto.btnRest2_i = function () {
		var t = new eui.Button();
		this.btnRest2 = t;
		t.label = "休息";
		t.percentWidth = 90;
		t.skinName = "skins.menuitem";
		t.x = 55;
		t.y = 80;
		return t;
	};
	return actmenu;
})(eui.Skin);generateEUI.paths['resource/eui_skins/actmenur.exml'] = window.skins.actmenur = (function (_super) {
	__extends(actmenur, _super);
	function actmenur() {
		_super.call(this);
		this.skinParts = ["btnGame","btnSing","btnStudy","btnWork","btnHangout","btnRest"];
		
		this.height = 400;
		this.width = 260;
		this.elementsContent = [this._Group8_i()];
	}
	var _proto = actmenur.prototype;

	_proto._Group8_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Rect1_i(),this._Group7_i()];
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.ellipseWidth = 100;
		t.fillAlpha = 1;
		t.fillColor = 0xE3863D;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.strokeColor = 0xE5E0E0;
		t.strokeWeight = 3;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Group7_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		t.layout = this._VerticalLayout1_i();
		t.elementsContent = [this._Group1_i(),this.btnGame_i(),this._Group2_i(),this.btnSing_i(),this._Group3_i(),this.btnStudy_i(),this._Group4_i(),this.btnWork_i(),this._Group5_i(),this.btnHangout_i(),this._Group6_i(),this.btnRest_i()];
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.horizontalAlign = "center";
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 20;
		t.width = 200;
		t.x = 290;
		t.y = 103;
		return t;
	};
	_proto.btnGame_i = function () {
		var t = new eui.Button();
		this.btnGame = t;
		t.label = "游戏";
		t.percentWidth = 90;
		t.skinName = "skins.menuitem";
		t.x = 45;
		t.y = 70;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.height = 10;
		t.width = 200;
		t.x = 290;
		t.y = 103;
		return t;
	};
	_proto.btnSing_i = function () {
		var t = new eui.Button();
		this.btnSing = t;
		t.label = "练歌";
		t.percentWidth = 90;
		t.skinName = "skins.menuitem";
		t.x = 25;
		t.y = 50;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.height = 10;
		t.width = 200;
		t.x = 290;
		t.y = 103;
		return t;
	};
	_proto.btnStudy_i = function () {
		var t = new eui.Button();
		this.btnStudy = t;
		t.label = "学习";
		t.percentWidth = 90;
		t.skinName = "skins.menuitem";
		t.x = 15;
		t.y = 40;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.height = 10;
		t.width = 200;
		t.x = 290;
		t.y = 103;
		return t;
	};
	_proto.btnWork_i = function () {
		var t = new eui.Button();
		this.btnWork = t;
		t.label = "打工";
		t.percentWidth = 90;
		t.skinName = "skins.menuitem";
		t.x = 45;
		t.y = 70;
		return t;
	};
	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.height = 10;
		t.width = 200;
		t.x = 290;
		t.y = 103;
		return t;
	};
	_proto.btnHangout_i = function () {
		var t = new eui.Button();
		this.btnHangout = t;
		t.label = "散步";
		t.percentWidth = 90;
		t.skinName = "skins.menuitem";
		t.x = 35;
		t.y = 60;
		return t;
	};
	_proto._Group6_i = function () {
		var t = new eui.Group();
		t.height = 10;
		t.width = 200;
		t.x = 290;
		t.y = 103;
		return t;
	};
	_proto.btnRest_i = function () {
		var t = new eui.Button();
		this.btnRest = t;
		t.label = "休息";
		t.percentWidth = 90;
		t.skinName = "skins.menuitem";
		t.x = 55;
		t.y = 80;
		return t;
	};
	return actmenur;
})(eui.Skin);generateEUI.paths['resource/eui_skins/cancelbtn.exml'] = window.skins.cancelbtn = (function (_super) {
	__extends(cancelbtn, _super);
	function cancelbtn() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 100;
		this.width = 100;
		this.elementsContent = [this._Image1_i()];
	}
	var _proto = cancelbtn.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.source = "icons_json#btnx";
		t.x = 0;
		t.y = 0;
		return t;
	};
	return cancelbtn;
})(eui.Skin);generateEUI.paths['resource/eui_skins/CheckBoxSkin.exml'] = window.skins.CheckBoxSkin = (function (_super) {
	__extends(CheckBoxSkin, _super);
	function CheckBoxSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_disabled_png")
				])
		];
	}
	var _proto = CheckBoxSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "checkbox_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return CheckBoxSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/collabopanel.exml'] = window.skins.collabopanel = (function (_super) {
	__extends(collabopanel, _super);
	function collabopanel() {
		_super.call(this);
		this.skinParts = ["txtTip","iconContainer"];
		
		this.height = 100;
		this.width = 800;
		this.elementsContent = [this._Rect1_i(),this._Group2_i()];
	}
	var _proto = collabopanel.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillAlpha = 0.7;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.txtTip_i(),this._Group1_i(),this.iconContainer_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.horizontalAlign = "center";
		t.paddingBottom = 20;
		t.paddingLeft = 20;
		t.paddingTop = 20;
		t.verticalAlign = "top";
		return t;
	};
	_proto.txtTip_i = function () {
		var t = new eui.Label();
		this.txtTip = t;
		t.percentHeight = 100;
		t.size = 24;
		t.text = "其他Liver来联动了！";
		t.verticalAlign = "middle";
		t.visible = false;
		t.width = 0;
		t.x = 103;
		t.y = 72;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.width = 20;
		return t;
	};
	_proto.iconContainer_i = function () {
		var t = new eui.Group();
		this.iconContainer = t;
		t.percentWidth = 100;
		t.x = 55;
		t.y = 76;
		return t;
	};
	return collabopanel;
})(eui.Skin);generateEUI.paths['resource/eui_skins/comment.exml'] = window.skins.comment = (function (_super) {
	__extends(comment, _super);
	function comment() {
		_super.call(this);
		this.skinParts = ["txt"];
		
		this.height = 40;
		this.width = 200;
		this.elementsContent = [this._Group1_i()];
		this._Image1_i();
		
		this._Image2_i();
		
		this.states = [
			new eui.State ("normal",
				[
				])
			,
			new eui.State ("fire",
				[
					new eui.AddItems("_Image1","_Group1",0,""),
					new eui.AddItems("_Image2","_Group1",1,""),
					new eui.SetProperty("txt","textAlign","center")
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data"],[0],this.txt,"text");
	}
	var _proto = comment.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		this._Group1 = t;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.txt_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.height = 40;
		t.source = "icons_json#fire";
		t.width = 40;
		t.x = 41;
		t.y = 16;
		return t;
	};
	_proto.txt_i = function () {
		var t = new eui.Label();
		this.txt = t;
		t.multiline = true;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.size = 22;
		t.verticalAlign = "middle";
		t.wordWrap = true;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.height = 40;
		t.source = "icons_json#fire";
		t.width = 40;
		t.x = 41;
		t.y = 16;
		return t;
	};
	return comment;
})(eui.Skin);generateEUI.paths['resource/eui_skins/confirmbtn.exml'] = window.skins.confirmbtn = (function (_super) {
	__extends(confirmbtn, _super);
	function confirmbtn() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 100;
		this.width = 100;
		this.elementsContent = [this._Image1_i()];
		this.states = [
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","source","icons_json#btnokdisable"),
					new eui.SetProperty("_Image1","touchEnabled",false)
				])
			,
			new eui.State ("up",
				[
					new eui.SetProperty("_Image1","touchEnabled",true)
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","icons_json#btnokdisabled")
				])
		];
	}
	var _proto = confirmbtn.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.source = "icons_json#btnok";
		t.x = 0;
		t.y = 0;
		return t;
	};
	return confirmbtn;
})(eui.Skin);generateEUI.paths['resource/eui_skins/custommenu.exml'] = window.skins.custommenu = (function (_super) {
	__extends(custommenu, _super);
	function custommenu() {
		_super.call(this);
		this.skinParts = ["selContainer"];
		
		this.height = 200;
		this.width = 400;
		this.elementsContent = [this._Rect1_i(),this.selContainer_i()];
	}
	var _proto = custommenu.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.ellipseWidth = 100;
		t.fillAlpha = 0.75;
		t.fillColor = 0x000000;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.touchEnabled = false;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.selContainer_i = function () {
		var t = new eui.Group();
		this.selContainer = t;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.touchChildren = true;
		t.touchEnabled = false;
		t.x = 0;
		t.y = 0;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 20;
		t.horizontalAlign = "center";
		t.verticalAlign = "middle";
		return t;
	};
	return custommenu;
})(eui.Skin);generateEUI.paths['resource/eui_skins/descriptPanel.exml'] = window.skins.descriptPanel = (function (_super) {
	__extends(descriptPanel, _super);
	function descriptPanel() {
		_super.call(this);
		this.skinParts = ["contents","btnCancel"];
		
		this.height = 450;
		this.width = 700;
		this.elementsContent = [this._Rect1_i(),this.contents_i(),this.btnCancel_i()];
		this._Label1_i();
		
		this._Label2_i();
		
		this._Label3_i();
		
		this._Image1_i();
		
		this._Group1_i();
		
		this._Image3_i();
		
		this._Image4_i();
		
		this._Group2_i();
		
		this._Group3_i();
		
		this._Image5_i();
		
		this._Group4_i();
		
		this._Group5_i();
		
		this.states = [
			new eui.State ("p1",
				[
					new eui.AddItems("_Label3","contents",2,"_Group6"),
					new eui.AddItems("_Image1","_Group6",0,""),
					new eui.AddItems("_Group1","_Group6",1,""),
					new eui.AddItems("_Image3","_Group6",1,"")
				])
			,
			new eui.State ("p2",
				[
					new eui.AddItems("_Label2","contents",2,"_Group6"),
					new eui.AddItems("_Image5","_Group4",0,""),
					new eui.AddItems("_Group4","_Group6",1,""),
					new eui.AddItems("_Group5","_Group6",1,""),
					new eui.SetProperty("_Label2","text","在[现实]棋盘中，可以提升Liver的能力、触发特殊事件获取直播neta、购买道具等等。玩法接近普通大富翁游戏。")
				])
			,
			new eui.State ("p3",
				[
					new eui.AddItems("_Label2","contents",2,"_Group6"),
					new eui.AddItems("_Image5","_Group4",0,""),
					new eui.AddItems("_Group4","_Group6",1,""),
					new eui.AddItems("_Group5","_Group6",1,""),
					new eui.SetProperty("_Label2","text","在[虚拟]棋盘中，可以进行消耗neta进行不同类型的直播，并且收获粉丝数。"),
					new eui.SetProperty("_Image5","source","vmenu_jpg"),
					new eui.SetProperty("_Label12","text","不同类型的直播\n对neta的需求不同"),
					new eui.SetProperty("_Image6","source","nselect_jpg"),
					new eui.SetProperty("_Image6","width",200),
					new eui.SetProperty("_Image6","height",240),
					new eui.SetProperty("_Label13","text","部分neta有数量消耗\n或使用冷却的设定")
				])
			,
			new eui.State ("p4",
				[
					new eui.AddItems("_Label1","contents",2,"_Group6"),
					new eui.AddItems("_Image4","_Group2",0,""),
					new eui.AddItems("_Group2","_Group6",1,""),
					new eui.AddItems("_Group3","_Group6",1,"")
				])
		];
	}
	var _proto = descriptPanel.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.ellipseWidth = 50;
		t.fillAlpha = 0.8;
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto.contents_i = function () {
		var t = new eui.Group();
		this.contents = t;
		t.horizontalCenter = 0;
		t.percentHeight = 90;
		t.percentWidth = 95;
		t.verticalCenter = 0;
		t.layout = this._VerticalLayout1_i();
		t.elementsContent = [this._Group6_i(),this._Label14_i()];
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		this._Label1 = t;
		t.horizontalCenter = 0;
		t.percentWidth = 100;
		t.size = 28;
		t.text = "~ 关于neta ~";
		t.textAlign = "center";
		t.y = 16;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		this._Label2 = t;
		t.multiline = true;
		t.percentWidth = 100;
		t.size = 26;
		t.wordWrap = true;
		t.x = 166;
		t.y = 47;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		this._Label3 = t;
		t.percentWidth = 100;
		t.size = 26;
		t.text = "操纵Liver，在[虚拟]棋盘和[现实]棋盘间切换，点击[骰子]按钮开始行动。";
		t.x = 38;
		t.y = 24;
		return t;
	};
	_proto._Group6_i = function () {
		var t = new eui.Group();
		this._Group6 = t;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 35;
		t.y = 66;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.horizontalAlign = "center";
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.height = 200;
		t.source = "chess_json#mitov";
		t.width = 120;
		t.x = 80;
		t.y = 72;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		this._Group1 = t;
		t.percentHeight = 100;
		t.width = 130;
		t.x = 350;
		t.y = 124;
		t.layout = this._VerticalLayout2_i();
		t.elementsContent = [this._Label4_i(),this._Image2_i()];
		return t;
	};
	_proto._VerticalLayout2_i = function () {
		var t = new eui.VerticalLayout();
		t.horizontalAlign = "center";
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Label4_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.size = 28;
		t.text = "←切换→";
		t.y = 64;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 100;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "icons_json#vrbtn1";
		t.width = 100;
		t.y = 91;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		this._Image3 = t;
		t.height = 200;
		t.source = "chess_json#mitor";
		t.width = 120;
		t.x = 326;
		t.y = 120;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		this._Group2 = t;
		t.percentHeight = 100;
		t.percentWidth = 40;
		t.x = 368;
		t.y = 108;
		t.elementsContent = [];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		this._Image4 = t;
		t.height = 240;
		t.horizontalCenter = 0;
		t.source = "netastat_jpg";
		t.verticalCenter = 0;
		t.width = 160;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		this._Group3 = t;
		t.percentHeight = 100;
		t.percentWidth = 60;
		t.x = 384;
		t.y = 120;
		t.layout = this._VerticalLayout3_i();
		t.elementsContent = [this._Label5_i(),this._Label6_i(),this._Label7_i(),this._Label8_i(),this._Label9_i(),this._Label10_i(),this._Label11_i()];
		return t;
	};
	_proto._VerticalLayout3_i = function () {
		var t = new eui.VerticalLayout();
		t.horizontalAlign = "center";
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Label5_i = function () {
		var t = new eui.Label();
		t.percentWidth = 100;
		t.size = 20;
		t.text = "直播的最终效果将由neta的三个数值决定:";
		t.x = 121;
		t.y = 40;
		return t;
	};
	_proto._Label6_i = function () {
		var t = new eui.Label();
		t.percentWidth = 100;
		t.size = 24;
		t.text = "POP(人气):直接提升直播增加的粉丝数";
		t.x = 43;
		t.y = 60;
		return t;
	};
	_proto._Label7_i = function () {
		var t = new eui.Label();
		t.percentWidth = 100;
		t.size = 20;
		t.text = "NPC赠礼以外的游戏类neta在多次使用后人气值会下降";
		t.textColor = 0x8E8585;
		t.x = 43;
		t.y = 60;
		return t;
	};
	_proto._Label8_i = function () {
		var t = new eui.Label();
		t.percentWidth = 100;
		t.size = 24;
		t.text = "SAFE(安全):影响直播发生炎上的概率";
		t.x = 43;
		t.y = 60;
		return t;
	};
	_proto._Label9_i = function () {
		var t = new eui.Label();
		t.percentWidth = 100;
		t.size = 20;
		t.text = "※当前版本的基础炎上概率在无道具技能影响的情况下在5~10%之间";
		t.textColor = 0x8E8585;
		t.x = 43;
		t.y = 60;
		return t;
	};
	_proto._Label10_i = function () {
		var t = new eui.Label();
		t.percentWidth = 100;
		t.size = 24;
		t.text = "MEME(谜因):提升每回合开始时粉丝自动增长的数量";
		t.x = 43;
		t.y = 60;
		return t;
	};
	_proto._Label11_i = function () {
		var t = new eui.Label();
		t.percentWidth = 100;
		t.size = 20;
		t.text = "※请理解为直播越[有梗]，切片带来的粉丝增长越高";
		t.textColor = 0x8E8585;
		t.x = 43;
		t.y = 60;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		this._Group4 = t;
		t.percentHeight = 100;
		t.percentWidth = 50;
		t.layout = this._VerticalLayout4_i();
		t.elementsContent = [this._Label12_i()];
		return t;
	};
	_proto._VerticalLayout4_i = function () {
		var t = new eui.VerticalLayout();
		t.horizontalAlign = "center";
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		this._Image5 = t;
		t.height = 240;
		t.horizontalCenter = 0;
		t.source = "rmenu_jpg";
		t.top = 0;
		t.width = 160;
		return t;
	};
	_proto._Label12_i = function () {
		var t = new eui.Label();
		this._Label12 = t;
		t.horizontalCenter = 0;
		t.percentWidth = 100;
		t.size = 24;
		t.text = "不同选项提升的能力不同";
		t.textAlign = "center";
		t.y = 150;
		return t;
	};
	_proto._Group5_i = function () {
		var t = new eui.Group();
		this._Group5 = t;
		t.percentHeight = 100;
		t.percentWidth = 50;
		t.x = 358;
		t.y = 62;
		t.layout = this._VerticalLayout5_i();
		t.elementsContent = [this._Image6_i(),this._Label13_i()];
		return t;
	};
	_proto._VerticalLayout5_i = function () {
		var t = new eui.VerticalLayout();
		t.horizontalAlign = "center";
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		this._Image6 = t;
		t.height = 140;
		t.horizontalCenter = 0;
		t.source = "mapicons_json#eventr";
		t.top = 20;
		t.width = 140;
		return t;
	};
	_proto._Label13_i = function () {
		var t = new eui.Label();
		this._Label13 = t;
		t.horizontalCenter = 0;
		t.percentWidth = 100;
		t.size = 24;
		t.text = "踏入[?]格子触发各种特殊事件";
		t.textAlign = "center";
		t.y = 150;
		return t;
	};
	_proto._Label14_i = function () {
		var t = new eui.Label();
		t.percentWidth = 100;
		t.size = 20;
		t.text = "点击以继续";
		t.textAlign = "center";
		t.textColor = 0x8E8E8E;
		t.x = 37;
		t.y = 254;
		return t;
	};
	_proto.btnCancel_i = function () {
		var t = new eui.Image();
		this.btnCancel = t;
		t.height = 40;
		t.source = "icons_json#close";
		t.width = 40;
		t.x = -20;
		t.y = -20;
		return t;
	};
	return descriptPanel;
})(eui.Skin);generateEUI.paths['resource/eui_skins/evtpanel_shop.exml'] = window.skins.evtpanel_shop = (function (_super) {
	__extends(evtpanel_shop, _super);
	function evtpanel_shop() {
		_super.call(this);
		this.skinParts = ["txtEvtName","txtDes","logContainer","menuContainer","netaPanel","baseContainer"];
		
		this.height = 640;
		this.width = 480;
		this.elementsContent = [this.baseContainer_i()];
	}
	var _proto = evtpanel_shop.prototype;

	_proto.baseContainer_i = function () {
		var t = new eui.Group();
		this.baseContainer = t;
		t.horizontalCenter = 0;
		t.percentHeight = 100;
		t.percentWidth = 70;
		t.touchEnabled = false;
		t.elementsContent = [this.logContainer_i(),this.menuContainer_i(),this.netaPanel_i()];
		return t;
	};
	_proto.logContainer_i = function () {
		var t = new eui.Group();
		this.logContainer = t;
		t.bottom = 30;
		t.height = 150;
		t.horizontalCenter = 0;
		t.percentWidth = 100;
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 72;
		t.y = 460;
		t.elementsContent = [this._Rect1_i(),this.txtEvtName_i(),this.txtDes_i()];
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.ellipseWidth = 100;
		t.fillAlpha = 0.7;
		t.fillColor = 0x252628;
		t.height = 150;
		t.maxHeight = 150;
		t.percentWidth = 100;
		return t;
	};
	_proto.txtEvtName_i = function () {
		var t = new eui.Label();
		this.txtEvtName = t;
		t.horizontalCenter = 0;
		t.size = 36;
		t.text = "~事件名~";
		t.top = 10;
		return t;
	};
	_proto.txtDes_i = function () {
		var t = new eui.Label();
		this.txtDes = t;
		t.percentWidth = 100;
		t.size = 34;
		t.text = "事件描述";
		t.textAlign = "center";
		t.top = 60;
		return t;
	};
	_proto.menuContainer_i = function () {
		var t = new eui.Group();
		this.menuContainer = t;
		t.height = 200;
		t.left = 50;
		t.scaleX = 1;
		t.scaleY = 1;
		t.top = 50;
		t.width = 200;
		t.x = 50;
		t.y = 50;
		return t;
	};
	_proto.netaPanel_i = function () {
		var t = new NetaPanel();
		this.netaPanel = t;
		t.right = 20;
		t.top = 40;
		return t;
	};
	return evtpanel_shop;
})(eui.Skin);generateEUI.paths['resource/eui_skins/evtpanel.exml'] = window.skins.evtpanel = (function (_super) {
	__extends(evtpanel, _super);
	function evtpanel() {
		_super.call(this);
		this.skinParts = ["txtEvtName","txtDes","logContainer","menuContainer","npcPanel"];
		
		this.height = 640;
		this.width = 480;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = evtpanel.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.percentHeight = 100;
		t.percentWidth = 70;
		t.touchEnabled = false;
		t.elementsContent = [this.logContainer_i(),this.menuContainer_i(),this.npcPanel_i()];
		return t;
	};
	_proto.logContainer_i = function () {
		var t = new eui.Group();
		this.logContainer = t;
		t.bottom = 30;
		t.height = 150;
		t.horizontalCenter = 0;
		t.percentWidth = 100;
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 72;
		t.y = 460;
		t.elementsContent = [this._Rect1_i(),this.txtEvtName_i(),this.txtDes_i()];
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.ellipseWidth = 100;
		t.fillAlpha = 0.7;
		t.fillColor = 0x252628;
		t.height = 150;
		t.maxHeight = 150;
		t.percentWidth = 100;
		return t;
	};
	_proto.txtEvtName_i = function () {
		var t = new eui.Label();
		this.txtEvtName = t;
		t.horizontalCenter = 0;
		t.size = 36;
		t.text = "~事件名~";
		t.top = 10;
		return t;
	};
	_proto.txtDes_i = function () {
		var t = new eui.Label();
		this.txtDes = t;
		t.percentWidth = 100;
		t.size = 34;
		t.text = "事件描述";
		t.textAlign = "center";
		t.top = 60;
		return t;
	};
	_proto.menuContainer_i = function () {
		var t = new eui.Group();
		this.menuContainer = t;
		t.height = 200;
		t.left = 50;
		t.scaleX = 1;
		t.scaleY = 1;
		t.top = 50;
		t.width = 200;
		t.x = 50;
		t.y = 50;
		return t;
	};
	_proto.npcPanel_i = function () {
		var t = new NpcPanel();
		this.npcPanel = t;
		t.height = 220;
		t.right = 0;
		t.verticalCenter = 0;
		t.width = 280;
		return t;
	};
	return evtpanel;
})(eui.Skin);generateEUI.paths['resource/eui_skins/gameStartSetting.exml'] = window.skins.gameStartSetting = (function (_super) {
	__extends(gameStartSetting, _super);
	function gameStartSetting() {
		_super.call(this);
		this.skinParts = ["cpn2Hide0","liver0","liver1","liver2","liver3","liver4","liver5","liver6","liver7","tslider","txtTurn","cpn2Hide1","btnStart"];
		
		this.height = 720;
		this.width = 1280;
		this.elementsContent = [this._Rect1_i(),this._Group6_i()];
	}
	var _proto = gameStartSetting.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xECECEC;
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto._Group6_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._VerticalLayout2_i();
		t.elementsContent = [this._Group1_i(),this.cpn2Hide0_i(),this._Group4_i(),this.cpn2Hide1_i(),this.btnStart_i(),this._Group5_i()];
		return t;
	};
	_proto._VerticalLayout2_i = function () {
		var t = new eui.VerticalLayout();
		t.horizontalAlign = "center";
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 5;
		t.width = 0;
		t.x = 885;
		t.y = 690;
		return t;
	};
	_proto.cpn2Hide0_i = function () {
		var t = new eui.Label();
		this.cpn2Hide0 = t;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.text = "拖动标签分配Liver操作顺序";
		t.textColor = 0x2E2A2A;
		t.top = 20;
		t.x = 456.99999999999994;
		t.y = 19.999999999999993;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._VerticalLayout1_i();
		t.elementsContent = [this._Group2_i(),this._Group3_i()];
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.liver0_i(),this.liver1_i(),this.liver2_i(),this.liver3_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 20;
		t.horizontalAlign = "center";
		t.verticalAlign = "middle";
		return t;
	};
	_proto.liver0_i = function () {
		var t = new PlayerIcon();
		this.liver0 = t;
		t.height = 250;
		t.width = 200;
		return t;
	};
	_proto.liver1_i = function () {
		var t = new PlayerIcon();
		this.liver1 = t;
		t.height = 250;
		t.width = 200;
		return t;
	};
	_proto.liver2_i = function () {
		var t = new PlayerIcon();
		this.liver2 = t;
		t.height = 250;
		t.width = 200;
		return t;
	};
	_proto.liver3_i = function () {
		var t = new PlayerIcon();
		this.liver3 = t;
		t.height = 250;
		t.width = 200;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout2_i();
		t.elementsContent = [this.liver4_i(),this.liver5_i(),this.liver6_i(),this.liver7_i()];
		return t;
	};
	_proto._HorizontalLayout2_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 20;
		t.horizontalAlign = "center";
		t.verticalAlign = "middle";
		return t;
	};
	_proto.liver4_i = function () {
		var t = new PlayerIcon();
		this.liver4 = t;
		t.height = 250;
		t.width = 200;
		return t;
	};
	_proto.liver5_i = function () {
		var t = new PlayerIcon();
		this.liver5 = t;
		t.height = 250;
		t.width = 200;
		return t;
	};
	_proto.liver6_i = function () {
		var t = new PlayerIcon();
		this.liver6 = t;
		t.height = 250;
		t.width = 200;
		return t;
	};
	_proto.liver7_i = function () {
		var t = new PlayerIcon();
		this.liver7 = t;
		t.height = 250;
		t.width = 200;
		return t;
	};
	_proto.cpn2Hide1_i = function () {
		var t = new eui.Group();
		this.cpn2Hide1 = t;
		t.percentWidth = 100;
		t.x = 870;
		t.y = 657;
		t.layout = this._HorizontalLayout3_i();
		t.elementsContent = [this._Label1_i(),this.tslider_i(),this.txtTurn_i(),this._Label2_i()];
		return t;
	};
	_proto._HorizontalLayout3_i = function () {
		var t = new eui.HorizontalLayout();
		t.horizontalAlign = "center";
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.scaleX = 1;
		t.scaleY = 1;
		t.text = "游玩时长：";
		t.textColor = 0x2E2A2A;
		t.x = 603;
		t.y = 85;
		return t;
	};
	_proto.tslider_i = function () {
		var t = new eui.HSlider();
		this.tslider = t;
		t.height = 20;
		t.maximum = 4;
		t.width = 100;
		t.x = 762;
		t.y = 11;
		return t;
	};
	_proto.txtTurn_i = function () {
		var t = new eui.Label();
		this.txtTurn = t;
		t.text = "10";
		t.textAlign = "center";
		t.textColor = 0x2E2A2A;
		t.width = 80;
		t.x = 736;
		t.y = 10;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.text = "个回合";
		t.textColor = 0x2E2A2A;
		t.x = 821;
		return t;
	};
	_proto.btnStart_i = function () {
		var t = new eui.Button();
		this.btnStart = t;
		t.bottom = 40;
		t.horizontalCenter = 0;
		t.label = "开始游戏";
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 560;
		t.y = 640;
		return t;
	};
	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.percentHeight = 5;
		t.width = 0;
		t.x = 885;
		t.y = 690;
		return t;
	};
	return gameStartSetting;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HSliderSkin.exml'] = window.skins.HSliderSkin = (function (_super) {
	__extends(HSliderSkin, _super);
	function HSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = HSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.height = 6;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_sb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.source = "thumb_png";
		t.verticalCenter = 0;
		return t;
	};
	return HSliderSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/itemlist.exml'] = window.skins.itemlist = (function (_super) {
	__extends(itemlist, _super);
	function itemlist() {
		_super.call(this);
		this.skinParts = ["itemListContainer","itemListScroller"];
		
		this.height = 200;
		this.width = 400;
		this.elementsContent = [this.itemListScroller_i()];
	}
	var _proto = itemlist.prototype;

	_proto.itemListScroller_i = function () {
		var t = new eui.Scroller();
		this.itemListScroller = t;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		t.viewport = this.itemListContainer_i();
		return t;
	};
	_proto.itemListContainer_i = function () {
		var t = new eui.List();
		this.itemListContainer = t;
		t.itemRendererSkinName = itemListObj;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	return itemlist;
})(eui.Skin);generateEUI.paths['resource/eui_skins/itemListObj.exml'] = window.itemListObj = (function (_super) {
	__extends(itemListObj, _super);
	function itemListObj() {
		_super.call(this);
		this.skinParts = ["checkbox","checkboxContainer","txtName","txtNum"];
		
		this.height = 60;
		this.width = 400;
		this.elementsContent = [this._Group1_i(),this._Group3_i()];
		this._Rect1_i();
		
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.AddItems("_Rect1","",0,"")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("txtName","textColor",0xA4A0A0),
					new eui.SetProperty("txtNum","textColor",0xA4A0A0)
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.selected"],[0],this.checkbox,"selected");
		eui.Binding.$bindProperties(this, ["hostComponent.data.neta.name"],[0],this.txtName,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.neta.times"],[0],this.txtNum,"text");
	}
	var _proto = itemListObj.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		this._Rect1 = t;
		t.ellipseWidth = 30;
		t.fillAlpha = 0;
		t.fillColor = 0xE7E798;
		t.horizontalCenter = 0;
		t.percentHeight = 96;
		t.percentWidth = 100;
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.touchChildren = true;
		t.touchEnabled = true;
		t.x = 0;
		t.y = 0;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.checkboxContainer_i(),this.txtName_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		return t;
	};
	_proto.checkboxContainer_i = function () {
		var t = new eui.Group();
		this.checkboxContainer = t;
		t.percentHeight = 100;
		t.scaleX = 1;
		t.scaleY = 1;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.width = 50;
		t.elementsContent = [this.checkbox_i()];
		return t;
	};
	_proto.checkbox_i = function () {
		var t = new eui.CheckBox();
		this.checkbox = t;
		t.enabled = true;
		t.horizontalCenter = 0;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		return t;
	};
	_proto.txtName_i = function () {
		var t = new eui.Label();
		this.txtName = t;
		t.percentHeight = 100;
		t.size = 24;
		t.textAlign = "left";
		t.textColor = 0xFFF7F7;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		t.x = 106;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.x = 0;
		t.y = 0;
		t.layout = this._HorizontalLayout2_i();
		t.elementsContent = [this.txtNum_i(),this._Group2_i()];
		return t;
	};
	_proto._HorizontalLayout2_i = function () {
		var t = new eui.HorizontalLayout();
		t.horizontalAlign = "right";
		return t;
	};
	_proto.txtNum_i = function () {
		var t = new eui.Label();
		this.txtNum = t;
		t.percentHeight = 100;
		t.size = 24;
		t.textColor = 0xFFFFFF;
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 2;
		return t;
	};
	return itemListObj;
})(eui.Skin);generateEUI.paths['resource/eui_skins/livenetapanel.exml'] = window.skins.livenetapanel = (function (_super) {
	__extends(livenetapanel, _super);
	function livenetapanel() {
		_super.call(this);
		this.skinParts = ["txtTip","itemContainer","itemScroller","netalistcontainer","commentList","commentScroller","txtNeta","txtPop","txtSafe","txtMeme","btnCancel","btnConfirm","btnContainer","txtDAdd","txtDSpd","txtSubAdd","txtSubSpd","streamResultContainer"];
		
		this.height = 200;
		this.maxHeight = 300;
		this.width = 800;
		this.elementsContent = [this._Group10_i()];
		this.txtTip_i();
		
		this._BasicLayout1_i();
		
		this._Group3_i();
		
		this._Group8_i();
		
		this.btnContainer_i();
		
		this.streamResultContainer_i();
		
		this.states = [
			new eui.State ("beforestream",
				[
					new eui.AddItems("txtTip","_Group1",0,""),
					new eui.AddItems("_Group8","_Group9",1,""),
					new eui.AddItems("btnContainer","_Group9",1,"")
				])
			,
			new eui.State ("onstream",
				[
					new eui.AddItems("_Group3","_Group9",1,""),
					new eui.AddItems("streamResultContainer","",1,""),
					new eui.SetProperty("_Group1","layout",this._BasicLayout1),
					new eui.SetProperty("_HorizontalLayout2","verticalAlign","middle")
				])
		];
	}
	var _proto = livenetapanel.prototype;

	_proto._Group10_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Rect1_i(),this._Group9_i()];
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillAlpha = 0.75;
		t.fillColor = 0x000000;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Group9_i = function () {
		var t = new eui.Group();
		this._Group9 = t;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		t.layout = this._HorizontalLayout2_i();
		t.elementsContent = [this._Group1_i()];
		return t;
	};
	_proto._HorizontalLayout2_i = function () {
		var t = new eui.HorizontalLayout();
		this._HorizontalLayout2 = t;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		this._Group1 = t;
		t.percentHeight = 100;
		t.percentWidth = 65;
		t.elementsContent = [this.netalistcontainer_i()];
		return t;
	};
	_proto.txtTip_i = function () {
		var t = new eui.Label();
		this.txtTip = t;
		t.bottom = 5;
		t.horizontalCenter = 0;
		t.size = 22;
		return t;
	};
	_proto.netalistcontainer_i = function () {
		var t = new eui.Group();
		this.netalistcontainer = t;
		t.horizontalCenter = 0;
		t.maxHeight = 200;
		t.percentHeight = 75;
		t.percentWidth = 94;
		t.top = 10;
		t.elementsContent = [this._Rect2_i(),this.itemScroller_i()];
		return t;
	};
	_proto._Rect2_i = function () {
		var t = new eui.Rect();
		t.fillAlpha = 0.6;
		t.horizontalCenter = 0;
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto.itemScroller_i = function () {
		var t = new eui.Scroller();
		this.itemScroller = t;
		t.horizontalCenter = 0;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.viewport = this.itemContainer_i();
		return t;
	};
	_proto.itemContainer_i = function () {
		var t = new eui.List();
		this.itemContainer = t;
		t.itemRendererSkinName = skins.streamlistobj;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.layout = this._HorizontalLayout1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		this._Group3 = t;
		t.percentHeight = 96;
		t.percentWidth = 35;
		t.x = 610;
		t.elementsContent = [this.commentScroller_i()];
		return t;
	};
	_proto.commentScroller_i = function () {
		var t = new eui.Scroller();
		this.commentScroller = t;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.verticalCenter = 0;
		t.viewport = this._Group2_i();
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.elementsContent = [this.commentList_i()];
		return t;
	};
	_proto.commentList_i = function () {
		var t = new eui.List();
		this.commentList = t;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.top = 0;
		return t;
	};
	_proto._Group8_i = function () {
		var t = new eui.Group();
		this._Group8 = t;
		t.percentHeight = 100;
		t.percentWidth = 25;
		t.layout = this._VerticalLayout1_i();
		t.elementsContent = [this._Group4_i(),this._Group5_i(),this._Group6_i(),this._Group7_i()];
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 3;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.percentHeight = 25;
		t.percentWidth = 100;
		t.elementsContent = [this._Image1_i(),this.txtNeta_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 30;
		t.left = 0;
		t.source = "icons_json#neta";
		t.verticalCenter = 0;
		t.width = 100;
		return t;
	};
	_proto.txtNeta_i = function () {
		var t = new eui.Label();
		this.txtNeta = t;
		t.right = 30;
		t.text = "0";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.percentHeight = 25;
		t.percentWidth = 100;
		t.elementsContent = [this._Image2_i(),this.txtPop_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 30;
		t.left = 0;
		t.source = "icons_json#pop";
		t.verticalCenter = 0;
		t.width = 100;
		return t;
	};
	_proto.txtPop_i = function () {
		var t = new eui.Label();
		this.txtPop = t;
		t.right = 30;
		t.text = "0";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group6_i = function () {
		var t = new eui.Group();
		t.percentHeight = 25;
		t.percentWidth = 100;
		t.elementsContent = [this._Image3_i(),this.txtSafe_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 30;
		t.left = 0;
		t.source = "icons_json#safe";
		t.verticalCenter = 0;
		t.width = 100;
		return t;
	};
	_proto.txtSafe_i = function () {
		var t = new eui.Label();
		this.txtSafe = t;
		t.right = 30;
		t.text = "0";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group7_i = function () {
		var t = new eui.Group();
		t.percentHeight = 25;
		t.percentWidth = 100;
		t.elementsContent = [this._Image4_i(),this.txtMeme_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.height = 30;
		t.left = 0;
		t.source = "icons_json#meme";
		t.verticalCenter = 0;
		t.width = 100;
		return t;
	};
	_proto.txtMeme_i = function () {
		var t = new eui.Label();
		this.txtMeme = t;
		t.right = 30;
		t.text = "0";
		t.verticalCenter = 0;
		return t;
	};
	_proto.btnContainer_i = function () {
		var t = new eui.Group();
		this.btnContainer = t;
		t.percentHeight = 100;
		t.percentWidth = 10;
		t.layout = this._VerticalLayout2_i();
		t.elementsContent = [this.btnCancel_i(),this.btnConfirm_i()];
		return t;
	};
	_proto._VerticalLayout2_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto.btnCancel_i = function () {
		var t = new eui.Component();
		this.btnCancel = t;
		t.percentHeight = 50;
		t.percentWidth = 100;
		t.skinName = "skins.cancelbtn";
		return t;
	};
	_proto.btnConfirm_i = function () {
		var t = new eui.Button();
		this.btnConfirm = t;
		t.currentState = "disabled";
		t.percentHeight = 50;
		t.percentWidth = 100;
		t.skinName = "skins.confirmbtn";
		t.visible = true;
		return t;
	};
	_proto.streamResultContainer_i = function () {
		var t = new eui.Group();
		this.streamResultContainer = t;
		t.height = 80;
		t.percentWidth = 100;
		t.visible = true;
		t.y = 200;
		t.elementsContent = [this._Rect3_i(),this.txtDAdd_i(),this.txtDSpd_i(),this._Group12_i()];
		return t;
	};
	_proto._Rect3_i = function () {
		var t = new eui.Rect();
		t.fillAlpha = 0.75;
		t.fillColor = 0x000000;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.txtDAdd_i = function () {
		var t = new eui.Label();
		this.txtDAdd = t;
		t.alpha = 0;
		t.bold = true;
		t.textAlign = "right";
		t.textColor = 0x1DE3FF;
		t.x = 328;
		t.y = 40;
		return t;
	};
	_proto.txtDSpd_i = function () {
		var t = new eui.Label();
		this.txtDSpd = t;
		t.alpha = 0;
		t.bold = true;
		t.textAlign = "right";
		t.textColor = 0x1DE3FF;
		t.x = 696;
		t.y = 40;
		return t;
	};
	_proto._Group12_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout3_i();
		t.elementsContent = [this._Label1_i(),this.txtSubAdd_i(),this._Group11_i(),this._Label2_i(),this.txtSubSpd_i()];
		return t;
	};
	_proto._HorizontalLayout3_i = function () {
		var t = new eui.HorizontalLayout();
		t.paddingLeft = 20;
		t.paddingRight = 20;
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 32;
		t.text = "直播效果：";
		t.verticalCenter = 0;
		t.x = 33;
		return t;
	};
	_proto.txtSubAdd_i = function () {
		var t = new eui.Label();
		this.txtSubAdd = t;
		t.size = 32;
		t.text = "0";
		t.textAlign = "center";
		t.verticalAlign = "justify";
		t.width = 200;
		t.x = 216;
		t.y = 29;
		return t;
	};
	_proto._Group11_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.width = 30;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 32;
		t.text = "增长速度：";
		t.verticalCenter = 0;
		t.x = 33;
		return t;
	};
	_proto.txtSubSpd_i = function () {
		var t = new eui.Label();
		this.txtSubSpd = t;
		t.size = 32;
		t.text = "0";
		t.textAlign = "center";
		t.width = 140;
		t.x = 216;
		t.y = 29;
		return t;
	};
	_proto._BasicLayout1_i = function () {
		var t = new eui.BasicLayout();
		this._BasicLayout1 = t;
		return t;
	};
	return livenetapanel;
})(eui.Skin);generateEUI.paths['resource/eui_skins/liverinfobtn.exml'] = window.skins.liverinfobtn = (function (_super) {
	__extends(liverinfobtn, _super);
	function liverinfobtn() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 60;
		this.width = 100;
		this.elementsContent = [this._Image1_i()];
	}
	var _proto = liverinfobtn.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.source = "icons_json#infobtn";
		t.x = 0;
		t.y = 0;
		return t;
	};
	return liverinfobtn;
})(eui.Skin);generateEUI.paths['resource/eui_skins/liverselect.exml'] = window.skins.liverselect = (function (_super) {
	__extends(liverselect, _super);
	function liverselect() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 300;
		this.width = 600;
	}
	var _proto = liverselect.prototype;

	return liverselect;
})(eui.Skin);generateEUI.paths['resource/eui_skins/liversmenu.exml'] = window.skins.liversmenu = (function (_super) {
	__extends(liversmenu, _super);
	function liversmenu() {
		_super.call(this);
		this.skinParts = ["iconContainer0","iconContainer1","iconContainer2","iconContainer3"];
		
		this.height = 400;
		this.width = 100;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = liversmenu.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 10;
		t.y = 10;
		t.layout = this._VerticalLayout1_i();
		t.elementsContent = [this.iconContainer0_i(),this.iconContainer1_i(),this.iconContainer2_i(),this.iconContainer3_i()];
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto.iconContainer0_i = function () {
		var t = new eui.Group();
		this.iconContainer0 = t;
		t.percentHeight = 25;
		t.percentWidth = 100;
		return t;
	};
	_proto.iconContainer1_i = function () {
		var t = new eui.Group();
		this.iconContainer1 = t;
		t.percentHeight = 25;
		t.percentWidth = 100;
		return t;
	};
	_proto.iconContainer2_i = function () {
		var t = new eui.Group();
		this.iconContainer2 = t;
		t.percentHeight = 25;
		t.percentWidth = 100;
		return t;
	};
	_proto.iconContainer3_i = function () {
		var t = new eui.Group();
		this.iconContainer3 = t;
		t.percentHeight = 25;
		t.percentWidth = 100;
		return t;
	};
	return liversmenu;
})(eui.Skin);generateEUI.paths['resource/eui_skins/logpanel.exml'] = window.skins.logpanel = (function (_super) {
	__extends(logpanel, _super);
	function logpanel() {
		_super.call(this);
		this.skinParts = ["txtDes","img"];
		
		this.height = 240;
		this.width = 560;
		this.elementsContent = [this._Rect1_i(),this.txtDes_i(),this._Label1_i(),this.img_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.txt"],[0],this.txtDes,"text");
	}
	var _proto = logpanel.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.ellipseWidth = 50;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.txtDes_i = function () {
		var t = new eui.Label();
		this.txtDes = t;
		t.horizontalCenter = 0;
		t.percentHeight = 90;
		t.percentWidth = 90;
		t.textAlign = "center";
		t.touchEnabled = false;
		t.verticalAlign = "middle";
		t.wordWrap = false;
		t.y = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.bottom = 10;
		t.horizontalCenter = 0;
		t.percentWidth = 90;
		t.size = 24;
		t.text = "点击继续";
		t.textAlign = "center";
		t.textColor = 0xC2B9B9;
		t.touchEnabled = false;
		return t;
	};
	_proto.img_i = function () {
		var t = new eui.Image();
		this.img = t;
		t.height = 200;
		t.horizontalCenter = 0;
		t.touchEnabled = false;
		t.width = 200;
		t.y = -220;
		return t;
	};
	return logpanel;
})(eui.Skin);generateEUI.paths['resource/eui_skins/maincharacter.exml'] = window.maincharacter = (function (_super) {
	__extends(maincharacter, _super);
	function maincharacter() {
		_super.call(this);
		this.skinParts = ["img","txtName","txtSubs","txtIncrease","txtStream","txtPrevStream","txtMoney","buffContainer","txts1","txts2","txts3","txts4","txtluck","txtSense","txtCommu","txtStrength","txtTalk","txtGame","txtSing","txtTech","btnClose","txtTips","containerTips"];
		
		this.height = 500;
		this.width = 700;
		this.elementsContent = [this._Group40_i(),this.containerTips_i()];
	}
	var _proto = maincharacter.prototype;

	_proto._Group40_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.touchChildren = true;
		t.touchEnabled = true;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Rect1_i(),this._Group39_i(),this.btnClose_i()];
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.ellipseWidth = 50;
		t.fillAlpha = 1;
		t.fillColor = 0xEAB35D;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.strokeColor = 0x000000;
		t.strokeWeight = 5;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Group39_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		t.layout = this._HorizontalLayout3_i();
		t.elementsContent = [this._Group8_i(),this._Group38_i()];
		return t;
	};
	_proto._HorizontalLayout3_i = function () {
		var t = new eui.HorizontalLayout();
		return t;
	};
	_proto._Group8_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.percentHeight = 100;
		t.percentWidth = 30;
		t.verticalCenter = 0;
		t.layout = this._VerticalLayout1_i();
		t.elementsContent = [this.img_i(),this._Group1_i(),this.txtName_i(),this._Group2_i(),this._Group3_i(),this._Group4_i(),this._Group5_i(),this._Group6_i(),this._Group7_i(),this._Label5_i(),this.txtMoney_i()];
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.horizontalAlign = "center";
		t.verticalAlign = "middle";
		return t;
	};
	_proto.img_i = function () {
		var t = new eui.Image();
		this.img = t;
		t.percentHeight = 28;
		t.percentWidth = 70;
		t.source = "resource/assets/mito.png";
		t.x = 90;
		t.y = 194;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 10;
		t.x = 52;
		t.y = 330;
		return t;
	};
	_proto.txtName_i = function () {
		var t = new eui.Label();
		this.txtName = t;
		t.size = 26;
		t.textColor = 0x000000;
		t.x = 103;
		t.y = 338;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.height = 10;
		t.x = 52;
		t.y = 330;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.height = 40;
		t.percentWidth = 90;
		t.x = 51;
		t.y = 440;
		t.layout = this._BasicLayout1_i();
		t.elementsContent = [this._Label1_i(),this.txtSubs_i()];
		return t;
	};
	_proto._BasicLayout1_i = function () {
		var t = new eui.BasicLayout();
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.left = 0;
		t.size = 22;
		t.text = "订阅数";
		t.textColor = 0x000000;
		t.verticalCenter = 0;
		return t;
	};
	_proto.txtSubs_i = function () {
		var t = new eui.Label();
		this.txtSubs = t;
		t.right = 0;
		t.size = 26;
		t.textColor = 0x000000;
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.height = 40;
		t.percentWidth = 90;
		t.x = 51;
		t.y = 440;
		t.layout = this._BasicLayout2_i();
		t.elementsContent = [this._Label2_i(),this.txtIncrease_i()];
		return t;
	};
	_proto._BasicLayout2_i = function () {
		var t = new eui.BasicLayout();
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.left = 0;
		t.size = 22;
		t.text = "增长速度";
		t.textColor = 0x000000;
		t.verticalCenter = 0;
		return t;
	};
	_proto.txtIncrease_i = function () {
		var t = new eui.Label();
		this.txtIncrease = t;
		t.right = 0;
		t.size = 26;
		t.textColor = 0x000000;
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.height = 40;
		t.percentWidth = 90;
		t.x = 51;
		t.y = 440;
		t.layout = this._BasicLayout3_i();
		t.elementsContent = [this._Label3_i(),this.txtStream_i()];
		return t;
	};
	_proto._BasicLayout3_i = function () {
		var t = new eui.BasicLayout();
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		t.left = 0;
		t.size = 22;
		t.text = "直播次数";
		t.textColor = 0x000000;
		t.verticalCenter = 0;
		return t;
	};
	_proto.txtStream_i = function () {
		var t = new eui.Label();
		this.txtStream = t;
		t.right = 0;
		t.size = 26;
		t.textColor = 0x000000;
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group6_i = function () {
		var t = new eui.Group();
		t.height = 40;
		t.percentWidth = 90;
		t.x = 51;
		t.y = 440;
		t.layout = this._BasicLayout4_i();
		t.elementsContent = [this._Label4_i(),this.txtPrevStream_i()];
		return t;
	};
	_proto._BasicLayout4_i = function () {
		var t = new eui.BasicLayout();
		return t;
	};
	_proto._Label4_i = function () {
		var t = new eui.Label();
		t.left = 0;
		t.size = 22;
		t.text = "上次直播";
		t.textColor = 0x000000;
		t.verticalCenter = 0;
		return t;
	};
	_proto.txtPrevStream_i = function () {
		var t = new eui.Label();
		this.txtPrevStream = t;
		t.right = 0;
		t.size = 26;
		t.textColor = 0x000000;
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group7_i = function () {
		var t = new eui.Group();
		t.height = 10;
		t.x = 119;
		t.y = 522;
		return t;
	};
	_proto._Label5_i = function () {
		var t = new eui.Label();
		t.size = 22;
		t.text = "金钱 ¥";
		t.textColor = 0x000000;
		t.x = 105;
		t.y = 525;
		return t;
	};
	_proto.txtMoney_i = function () {
		var t = new eui.Label();
		this.txtMoney = t;
		t.size = 32;
		t.text = "";
		t.textColor = 0xF6FF2F;
		t.x = 96;
		t.y = 558;
		return t;
	};
	_proto._Group38_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 70;
		t.x = 535;
		t.y = 348;
		t.layout = this._VerticalLayout6_i();
		t.elementsContent = [this.buffContainer_i(),this._Group17_i(),this._Group37_i()];
		return t;
	};
	_proto._VerticalLayout6_i = function () {
		var t = new eui.VerticalLayout();
		t.horizontalAlign = "center";
		t.verticalAlign = "middle";
		return t;
	};
	_proto.buffContainer_i = function () {
		var t = new eui.Group();
		this.buffContainer = t;
		t.name = "buffContainer";
		t.percentHeight = 10;
		t.percentWidth = 100;
		t.touchChildren = true;
		t.touchEnabled = true;
		t.layout = this._HorizontalLayout1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Group17_i = function () {
		var t = new eui.Group();
		t.percentHeight = 40;
		t.percentWidth = 100;
		t.layout = this._VerticalLayout2_i();
		t.elementsContent = [this._Group10_i(),this._Group12_i(),this._Group14_i(),this._Group16_i()];
		return t;
	};
	_proto._VerticalLayout2_i = function () {
		var t = new eui.VerticalLayout();
		t.horizontalAlign = "center";
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Group10_i = function () {
		var t = new eui.Group();
		t.height = 44;
		t.percentWidth = 95;
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 14;
		t.y = -264;
		t.elementsContent = [this._Rect2_i(),this._Image1_i(),this.txts1_i(),this._Group9_i()];
		return t;
	};
	_proto._Rect2_i = function () {
		var t = new eui.Rect();
		t.ellipseWidth = 50;
		t.fillColor = 0xE5A137;
		t.horizontalCenter = 0;
		t.percentHeight = 90;
		t.percentWidth = 95;
		t.strokeColor = 0xECE6E6;
		t.strokeWeight = 3;
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.source = "icons_json#pskill";
		t.width = 52;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.txts1_i = function () {
		var t = new eui.Label();
		this.txts1 = t;
		t.italic = true;
		t.percentWidth = 85;
		t.right = 0;
		t.size = 28;
		t.text = "";
		t.textColor = 0x000000;
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group9_i = function () {
		var t = new eui.Group();
		t.name = "containers1";
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto._Group12_i = function () {
		var t = new eui.Group();
		t.height = 44;
		t.percentWidth = 95;
		t.x = 206;
		t.y = 255;
		t.elementsContent = [this._Rect3_i(),this._Image2_i(),this.txts2_i(),this._Group11_i()];
		return t;
	};
	_proto._Rect3_i = function () {
		var t = new eui.Rect();
		t.ellipseWidth = 50;
		t.fillColor = 0xE5A137;
		t.horizontalCenter = 0;
		t.percentHeight = 90;
		t.percentWidth = 95;
		t.strokeColor = 0xECE6E6;
		t.strokeWeight = 3;
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.source = "icons_json#pskill";
		t.width = 52.567;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.txts2_i = function () {
		var t = new eui.Label();
		this.txts2 = t;
		t.italic = true;
		t.percentWidth = 85;
		t.right = 0;
		t.size = 28;
		t.text = "";
		t.textColor = 0x000000;
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group11_i = function () {
		var t = new eui.Group();
		t.name = "containers2";
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto._Group14_i = function () {
		var t = new eui.Group();
		t.height = 44;
		t.percentWidth = 95;
		t.x = 206;
		t.y = 255;
		t.elementsContent = [this._Rect4_i(),this._Image3_i(),this.txts3_i(),this._Group13_i()];
		return t;
	};
	_proto._Rect4_i = function () {
		var t = new eui.Rect();
		t.ellipseWidth = 50;
		t.fillColor = 0xE5A137;
		t.horizontalCenter = 0;
		t.percentHeight = 90;
		t.percentWidth = 95;
		t.strokeColor = 0xECE6E6;
		t.strokeWeight = 3;
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.source = "icons_json#nskill";
		t.width = 52.567;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.txts3_i = function () {
		var t = new eui.Label();
		this.txts3 = t;
		t.italic = true;
		t.percentWidth = 85;
		t.right = 0;
		t.size = 28;
		t.text = "";
		t.textColor = 0x000000;
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group13_i = function () {
		var t = new eui.Group();
		t.name = "containers3";
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto._Group16_i = function () {
		var t = new eui.Group();
		t.height = 44;
		t.percentWidth = 95;
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 14;
		t.y = -66;
		t.elementsContent = [this._Rect5_i(),this._Image4_i(),this.txts4_i(),this._Group15_i()];
		return t;
	};
	_proto._Rect5_i = function () {
		var t = new eui.Rect();
		t.ellipseWidth = 50;
		t.fillColor = 0xE5A137;
		t.horizontalCenter = 0;
		t.percentHeight = 90;
		t.percentWidth = 95;
		t.strokeColor = 0xECE6E6;
		t.strokeWeight = 3;
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.source = "icons_json#nskill";
		t.width = 52.567;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.txts4_i = function () {
		var t = new eui.Label();
		this.txts4 = t;
		t.italic = true;
		t.percentWidth = 85;
		t.right = 0;
		t.size = 28;
		t.text = "";
		t.textColor = 0x000000;
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group15_i = function () {
		var t = new eui.Group();
		t.name = "containers4";
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto._Group37_i = function () {
		var t = new eui.Group();
		t.percentHeight = 50;
		t.percentWidth = 100;
		t.layout = this._VerticalLayout3_i();
		t.elementsContent = [this._Group36_i()];
		return t;
	};
	_proto._VerticalLayout3_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto._Group36_i = function () {
		var t = new eui.Group();
		t.percentHeight = 90;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout2_i();
		t.elementsContent = [this._Group26_i(),this._Group35_i()];
		return t;
	};
	_proto._HorizontalLayout2_i = function () {
		var t = new eui.HorizontalLayout();
		return t;
	};
	_proto._Group26_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 50;
		t.layout = this._VerticalLayout4_i();
		t.elementsContent = [this._Group19_i(),this._Group21_i(),this._Group23_i(),this._Group25_i()];
		return t;
	};
	_proto._VerticalLayout4_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto._Group19_i = function () {
		var t = new eui.Group();
		t.percentHeight = 25;
		t.percentWidth = 100;
		t.elementsContent = [this._Label6_i(),this._Label7_i(),this.txtluck_i(),this._Group18_i()];
		return t;
	};
	_proto._Label6_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.size = 55;
		t.text = "L U C K";
		t.textAlign = "center";
		t.textColor = 0xE4A035;
		t.verticalAlign = "bottom";
		return t;
	};
	_proto._Label7_i = function () {
		var t = new eui.Label();
		t.left = 30;
		t.size = 26;
		t.text = "运气：";
		t.textColor = 0x000000;
		t.verticalCenter = 0;
		return t;
	};
	_proto.txtluck_i = function () {
		var t = new eui.Label();
		this.txtluck = t;
		t.bold = true;
		t.right = 30;
		t.text = "";
		t.textColor = 0x000000;
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group18_i = function () {
		var t = new eui.Group();
		t.name = "container0";
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto._Group21_i = function () {
		var t = new eui.Group();
		t.percentHeight = 25;
		t.percentWidth = 100;
		t.elementsContent = [this._Label8_i(),this._Label9_i(),this.txtSense_i(),this._Group20_i()];
		return t;
	};
	_proto._Label8_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.size = 50;
		t.text = "S E N S E";
		t.textAlign = "center";
		t.textColor = 0xE4A035;
		t.verticalAlign = "bottom";
		return t;
	};
	_proto._Label9_i = function () {
		var t = new eui.Label();
		t.left = 30;
		t.size = 26;
		t.text = "品位：";
		t.textColor = 0x000000;
		t.verticalCenter = 0;
		return t;
	};
	_proto.txtSense_i = function () {
		var t = new eui.Label();
		this.txtSense = t;
		t.bold = true;
		t.right = 30;
		t.text = "";
		t.textColor = 0x000000;
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group20_i = function () {
		var t = new eui.Group();
		t.name = "container1";
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto._Group23_i = function () {
		var t = new eui.Group();
		t.percentHeight = 25;
		t.percentWidth = 100;
		t.elementsContent = [this._Label10_i(),this._Label11_i(),this.txtCommu_i(),this._Group22_i()];
		return t;
	};
	_proto._Label10_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.size = 46;
		t.text = "C O M M U";
		t.textAlign = "center";
		t.textColor = 0xE4A035;
		t.verticalAlign = "bottom";
		return t;
	};
	_proto._Label11_i = function () {
		var t = new eui.Label();
		t.left = 30;
		t.size = 26;
		t.text = "交流能力：";
		t.textColor = 0x000000;
		t.verticalCenter = 0;
		return t;
	};
	_proto.txtCommu_i = function () {
		var t = new eui.Label();
		this.txtCommu = t;
		t.bold = true;
		t.right = 30;
		t.text = "";
		t.textColor = 0x000000;
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group22_i = function () {
		var t = new eui.Group();
		t.name = "container2";
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto._Group25_i = function () {
		var t = new eui.Group();
		t.percentHeight = 25;
		t.percentWidth = 100;
		t.elementsContent = [this._Label12_i(),this._Label13_i(),this.txtStrength_i(),this._Group24_i()];
		return t;
	};
	_proto._Label12_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.size = 40;
		t.text = "STRENGTH";
		t.textAlign = "center";
		t.textColor = 0xE4A035;
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Label13_i = function () {
		var t = new eui.Label();
		t.left = 30;
		t.size = 26;
		t.text = "体能：";
		t.textColor = 0x000000;
		t.verticalCenter = 0;
		return t;
	};
	_proto.txtStrength_i = function () {
		var t = new eui.Label();
		this.txtStrength = t;
		t.bold = true;
		t.right = 30;
		t.text = "";
		t.textColor = 0x000000;
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group24_i = function () {
		var t = new eui.Group();
		t.name = "container3";
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto._Group35_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 50;
		t.layout = this._VerticalLayout5_i();
		t.elementsContent = [this._Group28_i(),this._Group30_i(),this._Group32_i(),this._Group34_i()];
		return t;
	};
	_proto._VerticalLayout5_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto._Group28_i = function () {
		var t = new eui.Group();
		t.percentHeight = 25;
		t.percentWidth = 100;
		t.elementsContent = [this._Label14_i(),this._Label15_i(),this.txtTalk_i(),this._Group27_i()];
		return t;
	};
	_proto._Label14_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.size = 55;
		t.text = "T A L K";
		t.textAlign = "center";
		t.textColor = 0xE4A035;
		t.verticalAlign = "bottom";
		return t;
	};
	_proto._Label15_i = function () {
		var t = new eui.Label();
		t.left = 30;
		t.size = 26;
		t.text = "杂谈力：";
		t.textColor = 0x000000;
		t.verticalCenter = 0;
		return t;
	};
	_proto.txtTalk_i = function () {
		var t = new eui.Label();
		this.txtTalk = t;
		t.bold = true;
		t.right = 30;
		t.text = "";
		t.textColor = 0x000000;
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group27_i = function () {
		var t = new eui.Group();
		t.name = "container4";
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto._Group30_i = function () {
		var t = new eui.Group();
		t.percentHeight = 25;
		t.percentWidth = 100;
		t.elementsContent = [this._Label16_i(),this._Label17_i(),this.txtGame_i(),this._Group29_i()];
		return t;
	};
	_proto._Label16_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.size = 55;
		t.text = "G A M E";
		t.textAlign = "center";
		t.textColor = 0xE4A035;
		t.verticalAlign = "bottom";
		return t;
	};
	_proto._Label17_i = function () {
		var t = new eui.Label();
		t.left = 30;
		t.size = 26;
		t.text = "游戏力：";
		t.textColor = 0x000000;
		t.verticalCenter = 0;
		return t;
	};
	_proto.txtGame_i = function () {
		var t = new eui.Label();
		this.txtGame = t;
		t.bold = true;
		t.right = 30;
		t.text = "";
		t.textColor = 0x000000;
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group29_i = function () {
		var t = new eui.Group();
		t.name = "container5";
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto._Group32_i = function () {
		var t = new eui.Group();
		t.percentHeight = 25;
		t.percentWidth = 100;
		t.elementsContent = [this._Label18_i(),this._Label19_i(),this.txtSing_i(),this._Group31_i()];
		return t;
	};
	_proto._Label18_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.size = 55;
		t.text = "S I N G";
		t.textAlign = "center";
		t.textColor = 0xE4A035;
		t.verticalAlign = "bottom";
		return t;
	};
	_proto._Label19_i = function () {
		var t = new eui.Label();
		t.left = 30;
		t.size = 26;
		t.text = "歌力：";
		t.textColor = 0x000000;
		t.verticalCenter = 0;
		return t;
	};
	_proto.txtSing_i = function () {
		var t = new eui.Label();
		this.txtSing = t;
		t.bold = true;
		t.right = 30;
		t.text = "";
		t.textColor = 0x000000;
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group31_i = function () {
		var t = new eui.Group();
		t.name = "container6";
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto._Group34_i = function () {
		var t = new eui.Group();
		t.percentHeight = 25;
		t.percentWidth = 100;
		t.elementsContent = [this._Label20_i(),this._Label21_i(),this.txtTech_i(),this._Group33_i()];
		return t;
	};
	_proto._Label20_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.size = 55;
		t.text = "T E C H";
		t.textAlign = "center";
		t.textColor = 0xE4A035;
		t.verticalAlign = "bottom";
		return t;
	};
	_proto._Label21_i = function () {
		var t = new eui.Label();
		t.left = 30;
		t.size = 26;
		t.text = "技术力：";
		t.textColor = 0x000000;
		t.verticalCenter = 0;
		return t;
	};
	_proto.txtTech_i = function () {
		var t = new eui.Label();
		this.txtTech = t;
		t.bold = true;
		t.right = 30;
		t.text = "";
		t.textColor = 0x000000;
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group33_i = function () {
		var t = new eui.Group();
		t.name = "container7";
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto.btnClose_i = function () {
		var t = new eui.Image();
		this.btnClose = t;
		t.fillMode = "scale";
		t.height = 30;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "icons_json#close";
		t.touchEnabled = true;
		t.width = 30;
		t.x = 10.9;
		t.y = 9.547;
		return t;
	};
	_proto.containerTips_i = function () {
		var t = new eui.Group();
		this.containerTips = t;
		t.height = 100;
		t.maxHeight = 100;
		t.maxWidth = 300;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.visible = false;
		t.width = 300;
		t.x = 775;
		t.y = 93;
		t.elementsContent = [this._Rect6_i(),this.txtTips_i()];
		return t;
	};
	_proto._Rect6_i = function () {
		var t = new eui.Rect();
		t.ellipseWidth = 30;
		t.fillAlpha = 0.8;
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto.txtTips_i = function () {
		var t = new eui.Label();
		this.txtTips = t;
		t.horizontalCenter = 0;
		t.percentHeight = 90;
		t.percentWidth = 90;
		t.size = 22;
		t.text = "";
		t.textAlign = "left";
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		return t;
	};
	return maincharacter;
})(eui.Skin);generateEUI.paths['resource/eui_skins/mainstage.exml'] = window.skins.mainstage = (function (_super) {
	__extends(mainstage, _super);
	function mainstage() {
		_super.call(this);
		this.skinParts = ["bgV","bgR","cellContainer","mapContainer","vrbtn","rollbtn","infobtn","subs","money","bagbtn","bottomBar","tmpContainer","menuContainer","liverMenu","topContainer","txtTurn"];
		
		this.height = 720;
		this.width = 1280;
		this.elementsContent = [this._Group1_i(),this.mapContainer_i(),this.bottomBar_i(),this.tmpContainer_i(),this.menuContainer_i(),this.liverMenu_i(),this.topContainer_i(),this.txtTurn_i()];
	}
	var _proto = mainstage.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.elementsContent = [this._Rect1_i(),this.bgV_i(),this.bgR_i()];
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillAlpha = 1;
		t.fillColor = 0xECECEC;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.bgV_i = function () {
		var t = new eui.Image();
		this.bgV = t;
		t.alpha = 0.3;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.source = "bgv_jpg";
		return t;
	};
	_proto.bgR_i = function () {
		var t = new eui.Image();
		this.bgR = t;
		t.alpha = 0.3;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.source = "bgr_jpg";
		t.visible = false;
		return t;
	};
	_proto.mapContainer_i = function () {
		var t = new eui.Group();
		this.mapContainer = t;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.cellContainer_i()];
		return t;
	};
	_proto.cellContainer_i = function () {
		var t = new eui.Group();
		this.cellContainer = t;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.bottomBar_i = function () {
		var t = new eui.Group();
		this.bottomBar = t;
		t.bottom = 0;
		t.height = 0;
		t.percentWidth = 100;
		t.right = 0;
		t.touchChildren = true;
		t.touchEnabled = false;
		t.elementsContent = [this.vrbtn_i(),this.rollbtn_i(),this.infobtn_i(),this.subs_i(),this.money_i(),this.bagbtn_i()];
		return t;
	};
	_proto.vrbtn_i = function () {
		var t = new VRBtn();
		this.vrbtn = t;
		t.bottom = 20;
		t.height = 100;
		t.right = 20;
		t.scaleX = 1;
		t.scaleY = 1;
		t.touchEnabled = true;
		t.width = 100;
		return t;
	};
	_proto.rollbtn_i = function () {
		var t = new RollBtn();
		this.rollbtn = t;
		t.bottom = 0;
		t.height = 120;
		t.horizontalCenter = 0;
		t.touchEnabled = true;
		t.width = 150;
		return t;
	};
	_proto.infobtn_i = function () {
		var t = new LiverInfoBtn();
		this.infobtn = t;
		t.bottom = 20;
		t.height = 60;
		t.left = 20;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 100;
		return t;
	};
	_proto.subs_i = function () {
		var t = new Subscribe();
		this.subs = t;
		t.bottom = 150;
		t.height = 120;
		t.left = 20;
		t.width = 200;
		return t;
	};
	_proto.money_i = function () {
		var t = new Money();
		this.money = t;
		t.bottom = 90;
		t.height = 60;
		t.left = 20;
		t.width = 200;
		return t;
	};
	_proto.bagbtn_i = function () {
		var t = new eui.Image();
		this.bagbtn = t;
		t.bottom = 20;
		t.height = 60;
		t.left = 140;
		t.source = "icons_json#bag";
		t.width = 60;
		return t;
	};
	_proto.tmpContainer_i = function () {
		var t = new eui.Group();
		this.tmpContainer = t;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.menuContainer_i = function () {
		var t = new eui.Group();
		this.menuContainer = t;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.touchChildren = true;
		t.touchEnabled = false;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.liverMenu_i = function () {
		var t = new LiversMenu();
		this.liverMenu = t;
		t.height = 400;
		t.left = 0;
		t.top = 0;
		t.width = 100;
		return t;
	};
	_proto.topContainer_i = function () {
		var t = new eui.Group();
		this.topContainer = t;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.txtTurn_i = function () {
		var t = new eui.Label();
		this.txtTurn = t;
		t.bold = true;
		t.right = 20;
		t.text = "TURN 1";
		t.textColor = 0x2E2A2A;
		t.top = 20;
		return t;
	};
	return mainstage;
})(eui.Skin);generateEUI.paths['resource/eui_skins/money.exml'] = window.skins.money = (function (_super) {
	__extends(money, _super);
	function money() {
		_super.call(this);
		this.skinParts = ["txtMoney"];
		
		this.height = 80;
		this.width = 300;
		this.elementsContent = [this._Rect1_i(),this._Image1_i(),this.txtMoney_i()];
	}
	var _proto = money.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.ellipseWidth = 50;
		t.fillAlpha = 0.65;
		t.percentHeight = 70;
		t.percentWidth = 100;
		t.verticalCenter = 0;
		t.x = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.source = "icons_json#money";
		t.x = -13;
		t.y = 0;
		return t;
	};
	_proto.txtMoney_i = function () {
		var t = new eui.Label();
		this.txtMoney = t;
		t.multiline = false;
		t.percentWidth = 60;
		t.right = 30;
		t.text = "0";
		t.textAlign = "right";
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		t.wordWrap = false;
		return t;
	};
	return money;
})(eui.Skin);generateEUI.paths['resource/eui_skins/netapanel.exml'] = window.skins.netapanel = (function (_super) {
	__extends(netapanel, _super);
	function netapanel() {
		_super.call(this);
		this.skinParts = ["img","imgType","txtPop","txtSafe","txtMeme","statContainer","txtName","txtDes","iconGet","iconGift"];
		
		this.height = 200;
		this.width = 600;
		this.elementsContent = [this._Group8_i(),this.iconGift_i()];
	}
	var _proto = netapanel.prototype;

	_proto._Group8_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Rect1_i(),this._Group7_i(),this.iconGet_i()];
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.ellipseWidth = 50;
		t.fillAlpha = 0.75;
		t.fillColor = 0x000000;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Group7_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		t.layout = this._HorizontalLayout2_i();
		t.elementsContent = [this._Group1_i(),this._Group6_i()];
		return t;
	};
	_proto._HorizontalLayout2_i = function () {
		var t = new eui.HorizontalLayout();
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 25;
		t.x = 12;
		t.y = 41;
		t.elementsContent = [this.img_i(),this.imgType_i()];
		return t;
	};
	_proto.img_i = function () {
		var t = new eui.Image();
		this.img = t;
		t.height = 120;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 120;
		return t;
	};
	_proto.imgType_i = function () {
		var t = new eui.Image();
		this.imgType = t;
		t.height = 50;
		t.source = "icons_json#game";
		t.width = 50;
		t.x = 10;
		t.y = 15;
		return t;
	};
	_proto._Group6_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 75;
		t.x = 327;
		t.y = 38;
		t.layout = this._BasicLayout1_i();
		t.elementsContent = [this.statContainer_i(),this._Group5_i()];
		return t;
	};
	_proto._BasicLayout1_i = function () {
		var t = new eui.BasicLayout();
		return t;
	};
	_proto.statContainer_i = function () {
		var t = new eui.Group();
		this.statContainer = t;
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.minHeight = 60;
		t.percentWidth = 100;
		t.scaleX = 1;
		t.scaleY = 1;
		t.visible = false;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Group2_i(),this._Group3_i(),this._Group4_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 33;
		t.visible = false;
		t.x = 186;
		t.y = 154;
		t.elementsContent = [this._Image1_i(),this.txtPop_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 40;
		t.left = 0;
		t.source = "icons_json#pop";
		t.verticalCenter = 0;
		t.width = 80;
		return t;
	};
	_proto.txtPop_i = function () {
		var t = new eui.Label();
		this.txtPop = t;
		t.right = 30;
		t.size = 38;
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 33;
		t.visible = false;
		t.x = 186;
		t.y = 154;
		t.elementsContent = [this._Image2_i(),this.txtSafe_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 40;
		t.left = 0;
		t.source = "icons_json#safe";
		t.verticalCenter = 0;
		t.width = 80;
		t.y = 22;
		return t;
	};
	_proto.txtSafe_i = function () {
		var t = new eui.Label();
		this.txtSafe = t;
		t.right = 30;
		t.size = 38;
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 33;
		t.visible = false;
		t.x = 186;
		t.y = 154;
		t.elementsContent = [this._Image3_i(),this.txtMeme_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 40;
		t.left = 0;
		t.source = "icons_json#meme";
		t.verticalCenter = 0;
		t.width = 80;
		t.y = 22;
		return t;
	};
	_proto.txtMeme_i = function () {
		var t = new eui.Label();
		this.txtMeme = t;
		t.right = 30;
		t.size = 38;
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.percentWidth = 90;
		t.top = 0;
		t.layout = this._VerticalLayout1_i();
		t.elementsContent = [this.txtName_i(),this.txtDes_i()];
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto.txtName_i = function () {
		var t = new eui.Label();
		this.txtName = t;
		t.height = 50;
		t.horizontalCenter = 0;
		t.percentWidth = 100;
		t.size = 34;
		t.textAlign = "center";
		t.verticalAlign = "bottom";
		t.y = 0;
		return t;
	};
	_proto.txtDes_i = function () {
		var t = new eui.Label();
		this.txtDes = t;
		t.percentWidth = 100;
		t.size = 28;
		t.top = 0;
		return t;
	};
	_proto.iconGet_i = function () {
		var t = new eui.Image();
		this.iconGet = t;
		t.bottom = 0;
		t.height = 60;
		t.right = 0;
		t.source = "icons_json#get";
		t.width = 100;
		return t;
	};
	_proto.iconGift_i = function () {
		var t = new eui.Group();
		this.iconGift = t;
		t.height = 50;
		t.horizontalCenter = 0;
		t.visible = true;
		t.width = 200;
		t.y = -40;
		t.elementsContent = [this._Rect2_i(),this._Label1_i()];
		return t;
	};
	_proto._Rect2_i = function () {
		var t = new eui.Rect();
		t.ellipseWidth = 50;
		t.fillColor = 0xE151EA;
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.text = "Liver赠礼";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		return t;
	};
	return netapanel;
})(eui.Skin);generateEUI.paths['resource/eui_skins/netapanel2.exml'] = window.skins.netapanel2 = (function (_super) {
	__extends(netapanel2, _super);
	function netapanel2() {
		_super.call(this);
		this.skinParts = ["img","imgType","txtHold","txtName","txtDes","txtPop","txtSafe","txtMeme","statContainer","btn","txtSongTip","dataContainer"];
		
		this.height = 450;
		this.width = 340;
		this.elementsContent = [this._Group8_i()];
	}
	var _proto = netapanel2.prototype;

	_proto._Group8_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Rect1_i(),this._Group7_i()];
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.ellipseWidth = 50;
		t.fillAlpha = 0.75;
		t.fillColor = 0x000000;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Group7_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		t.layout = this._VerticalLayout4_i();
		t.elementsContent = [this._Group1_i(),this.dataContainer_i()];
		return t;
	};
	_proto._VerticalLayout4_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 30;
		t.percentWidth = 100;
		t.x = 12;
		t.y = 41;
		t.elementsContent = [this.img_i(),this.imgType_i(),this.txtHold_i()];
		return t;
	};
	_proto.img_i = function () {
		var t = new eui.Image();
		this.img = t;
		t.height = 120;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 120;
		return t;
	};
	_proto.imgType_i = function () {
		var t = new eui.Image();
		this.imgType = t;
		t.height = 50;
		t.source = "";
		t.width = 50;
		t.x = 10;
		t.y = 15;
		return t;
	};
	_proto.txtHold_i = function () {
		var t = new eui.Label();
		this.txtHold = t;
		t.lineSpacing = 10;
		t.right = 10;
		t.size = 24;
		t.text = "持有数";
		t.textAlign = "center";
		t.top = 15;
		return t;
	};
	_proto.dataContainer_i = function () {
		var t = new eui.Group();
		this.dataContainer = t;
		t.percentHeight = 70;
		t.percentWidth = 100;
		t.x = 327;
		t.y = 38;
		t.layout = this._BasicLayout1_i();
		t.elementsContent = [this._Group2_i(),this._Group6_i(),this.txtSongTip_i()];
		return t;
	};
	_proto._BasicLayout1_i = function () {
		var t = new eui.BasicLayout();
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.percentWidth = 96;
		t.top = 0;
		t.layout = this._VerticalLayout1_i();
		t.elementsContent = [this.txtName_i(),this.txtDes_i()];
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto.txtName_i = function () {
		var t = new eui.Label();
		this.txtName = t;
		t.height = 36;
		t.horizontalCenter = 0;
		t.percentWidth = 100;
		t.size = 28;
		t.textAlign = "center";
		t.verticalAlign = "bottom";
		t.y = 0;
		return t;
	};
	_proto.txtDes_i = function () {
		var t = new eui.Label();
		this.txtDes = t;
		t.percentWidth = 100;
		t.size = 24;
		t.textAlign = "left";
		t.top = 0;
		return t;
	};
	_proto._Group6_i = function () {
		var t = new eui.Group();
		t.bottom = 10;
		t.horizontalCenter = 0;
		t.minHeight = 60;
		t.percentWidth = 100;
		t.scaleX = 1;
		t.scaleY = 1;
		t.layout = this._VerticalLayout3_i();
		t.elementsContent = [this.statContainer_i(),this.btn_i()];
		return t;
	};
	_proto._VerticalLayout3_i = function () {
		var t = new eui.VerticalLayout();
		t.horizontalAlign = "center";
		t.verticalAlign = "top";
		return t;
	};
	_proto.statContainer_i = function () {
		var t = new eui.Group();
		this.statContainer = t;
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.minHeight = 60;
		t.percentWidth = 96;
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 6;
		t.y = -72;
		t.layout = this._VerticalLayout2_i();
		t.elementsContent = [this._Group3_i(),this._Group4_i(),this._Group5_i()];
		return t;
	};
	_proto._VerticalLayout2_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.percentHeight = 33;
		t.percentWidth = 100;
		t.x = 186;
		t.y = 154;
		t.elementsContent = [this._Image1_i(),this.txtPop_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 40;
		t.left = 0;
		t.source = "icons_json#pop";
		t.verticalCenter = 0;
		t.width = 80;
		return t;
	};
	_proto.txtPop_i = function () {
		var t = new eui.Label();
		this.txtPop = t;
		t.right = 30;
		t.size = 38;
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.percentHeight = 33;
		t.percentWidth = 100;
		t.x = 186;
		t.y = 154;
		t.elementsContent = [this._Image2_i(),this.txtSafe_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 40;
		t.left = 0;
		t.source = "icons_json#safe";
		t.verticalCenter = 0;
		t.width = 80;
		t.y = 22;
		return t;
	};
	_proto.txtSafe_i = function () {
		var t = new eui.Label();
		this.txtSafe = t;
		t.right = 30;
		t.size = 38;
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.percentHeight = 33;
		t.percentWidth = 100;
		t.x = 186;
		t.y = 154;
		t.elementsContent = [this._Image3_i(),this.txtMeme_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 40;
		t.left = 0;
		t.source = "icons_json#meme";
		t.verticalCenter = 0;
		t.width = 80;
		t.y = 22;
		return t;
	};
	_proto.txtMeme_i = function () {
		var t = new eui.Label();
		this.txtMeme = t;
		t.right = 30;
		t.size = 38;
		t.verticalCenter = 0;
		return t;
	};
	_proto.btn_i = function () {
		var t = new eui.Button();
		this.btn = t;
		t.bottom = 10;
		t.horizontalCenter = 0;
		t.label = "使用";
		t.scaleX = 1;
		t.scaleY = 1;
		t.visible = true;
		t.x = 70;
		t.y = 10;
		return t;
	};
	_proto.txtSongTip_i = function () {
		var t = new eui.Label();
		this.txtSongTip = t;
		t.bottom = 10;
		t.horizontalCenter = 0;
		t.size = 20;
		t.text = "歌曲neta需要隔数个回合才能再使用";
		t.visible = true;
		return t;
	};
	return netapanel2;
})(eui.Skin);generateEUI.paths['resource/eui_skins/normalbtn.exml'] = window.skins.normalbtn = (function (_super) {
	__extends(normalbtn, _super);
	function normalbtn() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.height = 40;
		this.width = 160;
		this.elementsContent = [this._Rect1_i(),this.labelDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Rect1","fillColor",0xDE9015)
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Rect1","fillColor",0xC58606)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Rect1","fillColor",0x9E660E),
					new eui.SetProperty("_Rect1","touchEnabled",false),
					new eui.SetProperty("_Rect1","touchChildren",false)
				])
		];
	}
	var _proto = normalbtn.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		this._Rect1 = t;
		t.ellipseWidth = 40;
		t.fillColor = 0xDE9015;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.horizontalCenter = 0;
		t.percentHeight = 100;
		t.percentWidth = 90;
		t.size = 30;
		t.textAlign = "center";
		t.verticalAlign = "middle";
		return t;
	};
	return normalbtn;
})(eui.Skin);generateEUI.paths['resource/eui_skins/npcpanel.exml'] = window.skins.npcpanel = (function (_super) {
	__extends(npcpanel, _super);
	function npcpanel() {
		_super.call(this);
		this.skinParts = ["txtType","icon0","txt0","heart0","icon1","txt1","heart1","icon2","txt2","heart2"];
		
		this.height = 240;
		this.width = 240;
		this.elementsContent = [this._Group5_i()];
		this.txtType_i();
		
		this.txt0_i();
		
		this.txt1_i();
		
		this.txt2_i();
		
		this.states = [
			new eui.State ("default",
				[
					new eui.AddItems("txtType","_Group4",0,""),
					new eui.AddItems("txt0","_Group1",2,"heart0"),
					new eui.AddItems("txt1","_Group2",2,"heart1"),
					new eui.AddItems("txt2","_Group3",2,"heart2")
				])
			,
			new eui.State ("change",
				[
					new eui.AddItems("txtType","_Group4",0,""),
					new eui.AddItems("txt0","_Group1",2,"heart0"),
					new eui.AddItems("txt1","_Group2",2,"heart1"),
					new eui.AddItems("txt2","_Group3",2,"heart2"),
					new eui.SetProperty("txtType","text","Liver好感度变动:")
				])
			,
			new eui.State ("simp",
				[
					new eui.SetProperty("","width",120),
					new eui.SetProperty("","height",200)
				])
		];
	}
	var _proto = npcpanel.prototype;

	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Rect1_i(),this._Group4_i()];
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.ellipseWidth = 50;
		t.fillAlpha = 0.7;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		this._Group4 = t;
		t.horizontalCenter = 0;
		t.percentHeight = 90;
		t.percentWidth = 90;
		t.verticalCenter = 0;
		t.layout = this._VerticalLayout1_i();
		t.elementsContent = [this._Group1_i(),this._Group2_i(),this._Group3_i()];
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto.txtType_i = function () {
		var t = new eui.Label();
		this.txtType = t;
		t.percentWidth = 100;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 26;
		t.text = "联动可能的Liver:";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		this._Group1 = t;
		t.height = 50;
		t.percentWidth = 100;
		t.x = -1.167;
		t.y = 29.667;
		t.layout = this._BasicLayout1_i();
		t.elementsContent = [this.icon0_i(),this.heart0_i()];
		return t;
	};
	_proto._BasicLayout1_i = function () {
		var t = new eui.BasicLayout();
		return t;
	};
	_proto.icon0_i = function () {
		var t = new eui.Image();
		this.icon0 = t;
		t.height = 40;
		t.left = 0;
		t.verticalCenter = 0;
		t.width = 40;
		return t;
	};
	_proto.txt0_i = function () {
		var t = new eui.Label();
		this.txt0 = t;
		t.left = 60;
		t.size = 24;
		t.verticalCenter = 0;
		return t;
	};
	_proto.heart0_i = function () {
		var t = new eui.Image();
		this.heart0 = t;
		t.height = 30;
		t.right = 0;
		t.verticalCenter = 0;
		t.width = 30;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		this._Group2 = t;
		t.height = 50;
		t.percentWidth = 100;
		t.x = -1.167;
		t.y = 29.667;
		t.layout = this._BasicLayout2_i();
		t.elementsContent = [this.icon1_i(),this.heart1_i()];
		return t;
	};
	_proto._BasicLayout2_i = function () {
		var t = new eui.BasicLayout();
		return t;
	};
	_proto.icon1_i = function () {
		var t = new eui.Image();
		this.icon1 = t;
		t.height = 40;
		t.left = 0;
		t.verticalCenter = 0;
		t.width = 40;
		return t;
	};
	_proto.txt1_i = function () {
		var t = new eui.Label();
		this.txt1 = t;
		t.left = 60;
		t.size = 24;
		t.verticalCenter = 0;
		return t;
	};
	_proto.heart1_i = function () {
		var t = new eui.Image();
		this.heart1 = t;
		t.height = 30;
		t.right = 0;
		t.verticalCenter = 0;
		t.width = 30;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		this._Group3 = t;
		t.height = 50;
		t.percentWidth = 100;
		t.x = -1.167;
		t.y = 29.667;
		t.layout = this._BasicLayout3_i();
		t.elementsContent = [this.icon2_i(),this.heart2_i()];
		return t;
	};
	_proto._BasicLayout3_i = function () {
		var t = new eui.BasicLayout();
		return t;
	};
	_proto.icon2_i = function () {
		var t = new eui.Image();
		this.icon2 = t;
		t.height = 40;
		t.left = 0;
		t.verticalCenter = 0;
		t.width = 40;
		return t;
	};
	_proto.txt2_i = function () {
		var t = new eui.Label();
		this.txt2 = t;
		t.left = 60;
		t.size = 24;
		t.verticalCenter = 0;
		return t;
	};
	_proto.heart2_i = function () {
		var t = new eui.Image();
		this.heart2 = t;
		t.height = 30;
		t.right = 0;
		t.verticalCenter = 0;
		t.width = 30;
		return t;
	};
	return npcpanel;
})(eui.Skin);generateEUI.paths['resource/eui_skins/paygainpanel.exml'] = window.skins.paygainpanel = (function (_super) {
	__extends(paygainpanel, _super);
	function paygainpanel() {
		_super.call(this);
		this.skinParts = ["txtTitle","txtNum"];
		
		this.height = 260;
		this.width = 500;
		this.elementsContent = [this._Rect1_i(),this._Group3_i()];
		this.states = [
			new eui.State ("win",
				[
					new eui.SetProperty("txtTitle","text","帕青哥收支"),
					new eui.SetProperty("txtNum","textColor",0xD3A413)
				])
			,
			new eui.State ("lose",
				[
					new eui.SetProperty("txtNum","textColor",0xCB0D0D)
				])
		];
	}
	var _proto = paygainpanel.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.ellipseWidth = 100;
		t.fillAlpha = 0.7;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		t.layout = this._VerticalLayout1_i();
		t.elementsContent = [this._Group1_i(),this.txtTitle_i(),this._Group2_i(),this.txtNum_i()];
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.horizontalAlign = "center";
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 5;
		return t;
	};
	_proto.txtTitle_i = function () {
		var t = new eui.Label();
		this.txtTitle = t;
		t.text = "《游戏》收支";
		t.x = 183;
		t.y = 67;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.percentHeight = 25;
		return t;
	};
	_proto.txtNum_i = function () {
		var t = new eui.Label();
		this.txtNum = t;
		t.size = 60;
		t.text = "0";
		t.x = 212;
		t.y = 161;
		return t;
	};
	return paygainpanel;
})(eui.Skin);generateEUI.paths['resource/eui_skins/playerselectpanel.exml'] = window.skins.playerselectpanel = (function (_super) {
	__extends(playerselectpanel, _super);
	var playerselectpanel$Skin1 = 	(function (_super) {
		__extends(playerselectpanel$Skin1, _super);
		function playerselectpanel$Skin1() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","icons_json#close")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","icons_json#close")
					])
			];
		}
		var _proto = playerselectpanel$Skin1.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "icons_json#close";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return playerselectpanel$Skin1;
	})(eui.Skin);

	function playerselectpanel() {
		_super.call(this);
		this.skinParts = ["txtTips","img0","img1","img2","img3","btnCancel"];
		
		this.height = 250;
		this.width = 500;
		this.elementsContent = [this._Rect1_i(),this._Group9_i(),this.btnCancel_i()];
		this._Group6_i();
		
		this.states = [
			new eui.State ("allplayer",
				[
					new eui.AddItems("_Group6","_Group7",1,""),
					new eui.SetProperty("","width",650)
				])
			,
			new eui.State ("other",
				[
				])
		];
	}
	var _proto = playerselectpanel.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.ellipseWidth = 100;
		t.fillAlpha = 0.7;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Group9_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		t.layout = this._VerticalLayout1_i();
		t.elementsContent = [this._Group1_i(),this.txtTips_i(),this._Group2_i(),this._Group7_i(),this._Group8_i()];
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 5;
		t.percentWidth = 100;
		return t;
	};
	_proto.txtTips_i = function () {
		var t = new eui.Label();
		this.txtTips = t;
		t.percentWidth = 100;
		t.text = "请选择道具的使用对象";
		t.textAlign = "center";
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.height = 15;
		t.percentWidth = 100;
		return t;
	};
	_proto._Group7_i = function () {
		var t = new eui.Group();
		this._Group7 = t;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Group3_i(),this._Group4_i(),this._Group5_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 33;
		t.elementsContent = [this.img0_i()];
		return t;
	};
	_proto.img0_i = function () {
		var t = new eui.Image();
		this.img0 = t;
		t.horizontalCenter = 0;
		t.percentHeight = 80;
		t.percentWidth = 80;
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 33;
		t.elementsContent = [this.img1_i()];
		return t;
	};
	_proto.img1_i = function () {
		var t = new eui.Image();
		this.img1 = t;
		t.horizontalCenter = 0;
		t.percentHeight = 80;
		t.percentWidth = 80;
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 33;
		t.elementsContent = [this.img2_i()];
		return t;
	};
	_proto.img2_i = function () {
		var t = new eui.Image();
		this.img2 = t;
		t.horizontalCenter = 0;
		t.percentHeight = 80;
		t.percentWidth = 80;
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group6_i = function () {
		var t = new eui.Group();
		this._Group6 = t;
		t.percentHeight = 100;
		t.percentWidth = 33;
		t.elementsContent = [this.img3_i()];
		return t;
	};
	_proto.img3_i = function () {
		var t = new eui.Image();
		this.img3 = t;
		t.horizontalCenter = 0;
		t.percentHeight = 80;
		t.percentWidth = 80;
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group8_i = function () {
		var t = new eui.Group();
		t.height = 10;
		t.percentWidth = 100;
		return t;
	};
	_proto.btnCancel_i = function () {
		var t = new eui.Button();
		this.btnCancel = t;
		t.height = 40;
		t.left = 10;
		t.top = 10;
		t.touchChildren = true;
		t.width = 40;
		t.skinName = playerselectpanel$Skin1;
		return t;
	};
	return playerselectpanel;
})(eui.Skin);generateEUI.paths['resource/eui_skins/playerstartselect.exml'] = window.skins.playerstartselect = (function (_super) {
	__extends(playerstartselect, _super);
	function playerstartselect() {
		_super.call(this);
		this.skinParts = ["img","pcontainer"];
		
		this.height = 250;
		this.width = 200;
		this.elementsContent = [this._Rect1_i(),this.img_i()];
		this.pcontainer_i();
		
		this._Rect2_i();
		
		this._Label1_i();
		
		this.states = [
			new eui.State ("usable",
				[
					new eui.AddItems("pcontainer","",1,"")
				])
			,
			new eui.State ("disable",
				[
					new eui.AddItems("_Rect2","",1,""),
					new eui.AddItems("_Label1","",1,"")
				])
		];
	}
	var _proto = playerstartselect.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xCECECE;
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto.img_i = function () {
		var t = new eui.Image();
		this.img = t;
		t.height = 200;
		t.width = 200;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.pcontainer_i = function () {
		var t = new eui.Group();
		this.pcontainer = t;
		t.height = 50;
		t.width = 200;
		t.x = 0;
		t.y = 200;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.horizontalAlign = "center";
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Rect2_i = function () {
		var t = new eui.Rect();
		this._Rect2 = t;
		t.fillAlpha = 0.5;
		t.fillColor = 0xCECECE;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		this._Label1 = t;
		t.bold = true;
		t.horizontalCenter = 0;
		t.text = "待更新";
		t.textColor = 0x383636;
		t.verticalCenter = 0;
		return t;
	};
	return playerstartselect;
})(eui.Skin);generateEUI.paths['resource/eui_skins/positiveskill.exml'] = window.skins.positiveskill = (function (_super) {
	__extends(positiveskill, _super);
	function positiveskill() {
		_super.call(this);
		this.skinParts = ["txtskillname"];
		
		this.height = 60;
		this.width = 320;
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("positive",
				[
				])
			,
			new eui.State ("negative",
				[
					new eui.SetProperty("_Rect1","fillColor",0x9E2E2E),
					new eui.SetProperty("_Image1","source","icons_json#nskill")
				])
			,
			new eui.State ("hidden",
				[
					new eui.SetProperty("_Rect1","fillColor",0xEABB12),
					new eui.SetProperty("_Image1","source","icons_json#hskill"),
					new eui.SetProperty("txtskillname","textColor",0xDF880D)
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.name"],[0],this.txtskillname,"text");
	}
	var _proto = positiveskill.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Rect1_i(),this._Image1_i(),this.txtskillname_i()];
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		this._Rect1 = t;
		t.blendMode = "normal";
		t.fillColor = 0x4F79AD;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.height = 80;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "icons_json#pskill";
		t.width = 80;
		t.x = -16.193;
		t.y = -11.335;
		return t;
	};
	_proto.txtskillname_i = function () {
		var t = new eui.Label();
		this.txtskillname = t;
		t.height = 45;
		t.left = 80;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 36;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		return t;
	};
	return positiveskill;
})(eui.Skin);generateEUI.paths['resource/eui_skins/RadioButtonSkin.exml'] = window.skins.RadioButtonSkin = (function (_super) {
	__extends(RadioButtonSkin, _super);
	function RadioButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_disabled_png")
				])
		];
	}
	var _proto = RadioButtonSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "radiobutton_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return RadioButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/rollbtn.exml'] = window.skins.rollbtn = (function (_super) {
	__extends(rollbtn, _super);
	function rollbtn() {
		_super.call(this);
		this.skinParts = ["txtRollNum","btn","result"];
		
		this.height = 80;
		this.width = 80;
		this.elementsContent = [this._Group1_i(),this.result_i()];
	}
	var _proto = rollbtn.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._BasicLayout1_i();
		t.elementsContent = [this.txtRollNum_i(),this.btn_i()];
		return t;
	};
	_proto._BasicLayout1_i = function () {
		var t = new eui.BasicLayout();
		return t;
	};
	_proto.txtRollNum_i = function () {
		var t = new eui.Label();
		this.txtRollNum = t;
		t.bold = true;
		t.border = false;
		t.bottom = -100;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 80;
		t.stroke = 3;
		t.text = "0";
		t.textColor = 0xE46E07;
		t.touchEnabled = false;
		t.x = 0;
		return t;
	};
	_proto.btn_i = function () {
		var t = new eui.Image();
		this.btn = t;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.source = "icons_json#roll1";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.result_i = function () {
		var t = new RollResultLabel();
		this.result = t;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.x = 139;
		t.y = -72;
		return t;
	};
	return rollbtn;
})(eui.Skin);generateEUI.paths['resource/eui_skins/rollresult.exml'] = window.skins.rollresutl = (function (_super) {
	__extends(rollresutl, _super);
	function rollresutl() {
		_super.call(this);
		this.skinParts = [];
		
		this.elementsContent = [this._Label1_i()];
		this.states = [
			new eui.State ("NORMAL",
				[
				])
			,
			new eui.State ("BIG_SUCCESS",
				[
					new eui.SetProperty("_Label1","text","大成功!!"),
					new eui.SetProperty("_Label1","size",50),
					new eui.SetProperty("_Label1","verticalCenter",0),
					new eui.SetProperty("_Label1","textColor",0xF2C601),
					new eui.SetProperty("_Label1","verticalAlign","middle"),
					new eui.SetProperty("_Label1","border",false),
					new eui.SetProperty("_Label1","stroke",5)
				])
			,
			new eui.State ("SUCCESS",
				[
					new eui.SetProperty("_Label1","text","成功!"),
					new eui.SetProperty("_Label1","size",50),
					new eui.SetProperty("_Label1","verticalCenter",0),
					new eui.SetProperty("_Label1","verticalAlign","middle"),
					new eui.SetProperty("_Label1","border",false),
					new eui.SetProperty("_Label1","stroke",5),
					new eui.SetProperty("_Label1","textColor",0xFFE46B)
				])
			,
			new eui.State ("FAIL",
				[
					new eui.SetProperty("_Label1","text","失败…"),
					new eui.SetProperty("_Label1","verticalAlign","middle"),
					new eui.SetProperty("_Label1","size",50),
					new eui.SetProperty("_Label1","textColor",0xA2A2A2),
					new eui.SetProperty("_Label1","stroke",5)
				])
			,
			new eui.State ("BIG_FAIL",
				[
					new eui.SetProperty("_Label1","text","大失败……"),
					new eui.SetProperty("_Label1","verticalAlign","middle"),
					new eui.SetProperty("_Label1","size",50),
					new eui.SetProperty("_Label1","stroke",5),
					new eui.SetProperty("_Label1","textColor",0x6E6D6D)
				])
		];
	}
	var _proto = rollresutl.prototype;

	_proto._Label1_i = function () {
		var t = new eui.Label();
		this._Label1 = t;
		t.background = false;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.text = "";
		t.touchEnabled = false;
		return t;
	};
	return rollresutl;
})(eui.Skin);generateEUI.paths['resource/eui_skins/scorePanel.exml'] = window.skins.scorePanel = (function (_super) {
	__extends(scorePanel, _super);
	function scorePanel() {
		_super.call(this);
		this.skinParts = ["img0","txtStream0","txtSub0","img1","txtStream1","txtSub1","img2","txtStream2","txtSub2","img3","txtStream3","txtSub3","btnTitle"];
		
		this.height = 720;
		this.width = 1280;
		this.elementsContent = [this._Rect1_i(),this._Group19_i()];
	}
	var _proto = scorePanel.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xECECEC;
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto._Group19_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._VerticalLayout5_i();
		t.elementsContent = [this._Group4_i(),this._Group17_i(),this._Group18_i()];
		return t;
	};
	_proto._VerticalLayout5_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.percentHeight = 40;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.img0_i(),this._Group1_i(),this._Group3_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.horizontalAlign = "center";
		t.verticalAlign = "middle";
		return t;
	};
	_proto.img0_i = function () {
		var t = new eui.Image();
		this.img0 = t;
		t.height = 240;
		t.width = 120;
		t.x = 691;
		t.y = 128;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.width = 20;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.layout = this._VerticalLayout1_i();
		t.elementsContent = [this._Label1_i(),this.txtStream0_i(),this._Group2_i(),this._Label2_i(),this.txtSub0_i()];
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.horizontalAlign = "center";
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.size = 42;
		t.text = "进行直播";
		t.textColor = 0x2E2A2A;
		t.x = 125;
		t.y = 42;
		return t;
	};
	_proto.txtStream0_i = function () {
		var t = new eui.Label();
		this.txtStream0 = t;
		t.size = 58;
		t.text = "0次";
		t.textColor = 0x2E2A2A;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.height = 20;
		t.percentWidth = 100;
		t.x = 108;
		t.y = 236;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.size = 42;
		t.text = "获得订阅";
		t.textColor = 0x2E2A2A;
		return t;
	};
	_proto.txtSub0_i = function () {
		var t = new eui.Label();
		this.txtSub0 = t;
		t.size = 58;
		t.text = "0人";
		t.textColor = 0x2E2A2A;
		return t;
	};
	_proto._Group17_i = function () {
		var t = new eui.Group();
		t.percentHeight = 40;
		t.percentWidth = 100;
		t.x = 596;
		t.y = 412;
		t.layout = this._HorizontalLayout2_i();
		t.elementsContent = [this._Group8_i(),this._Group12_i(),this._Group16_i()];
		return t;
	};
	_proto._HorizontalLayout2_i = function () {
		var t = new eui.HorizontalLayout();
		return t;
	};
	_proto._Group8_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 33;
		t.elementsContent = [this._Group5_i(),this._Group7_i()];
		return t;
	};
	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.left = 0;
		t.percentHeight = 100;
		t.percentWidth = 50;
		t.elementsContent = [this.img1_i()];
		return t;
	};
	_proto.img1_i = function () {
		var t = new eui.Image();
		this.img1 = t;
		t.height = 200;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 120;
		return t;
	};
	_proto._Group7_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 50;
		t.right = 0;
		t.layout = this._VerticalLayout2_i();
		t.elementsContent = [this._Label3_i(),this.txtStream1_i(),this._Group6_i(),this._Label4_i(),this.txtSub1_i()];
		return t;
	};
	_proto._VerticalLayout2_i = function () {
		var t = new eui.VerticalLayout();
		t.horizontalAlign = "center";
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		t.text = "进行直播";
		t.textColor = 0x2E2A2A;
		t.x = 125;
		t.y = 42;
		return t;
	};
	_proto.txtStream1_i = function () {
		var t = new eui.Label();
		this.txtStream1 = t;
		t.size = 48;
		t.text = "0次";
		t.textColor = 0x2E2A2A;
		return t;
	};
	_proto._Group6_i = function () {
		var t = new eui.Group();
		t.height = 20;
		t.percentWidth = 100;
		t.x = 108;
		t.y = 236;
		return t;
	};
	_proto._Label4_i = function () {
		var t = new eui.Label();
		t.text = "获得订阅";
		t.textColor = 0x2E2A2A;
		return t;
	};
	_proto.txtSub1_i = function () {
		var t = new eui.Label();
		this.txtSub1 = t;
		t.size = 48;
		t.text = "0人";
		t.textColor = 0x2E2A2A;
		return t;
	};
	_proto._Group12_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 33;
		t.elementsContent = [this._Group9_i(),this._Group11_i()];
		return t;
	};
	_proto._Group9_i = function () {
		var t = new eui.Group();
		t.left = 0;
		t.percentHeight = 100;
		t.percentWidth = 50;
		t.elementsContent = [this.img2_i()];
		return t;
	};
	_proto.img2_i = function () {
		var t = new eui.Image();
		this.img2 = t;
		t.height = 200;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 120;
		return t;
	};
	_proto._Group11_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 50;
		t.right = 0;
		t.layout = this._VerticalLayout3_i();
		t.elementsContent = [this._Label5_i(),this.txtStream2_i(),this._Group10_i(),this._Label6_i(),this.txtSub2_i()];
		return t;
	};
	_proto._VerticalLayout3_i = function () {
		var t = new eui.VerticalLayout();
		t.horizontalAlign = "center";
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Label5_i = function () {
		var t = new eui.Label();
		t.text = "进行直播";
		t.textColor = 0x2E2A2A;
		t.x = 125;
		t.y = 42;
		return t;
	};
	_proto.txtStream2_i = function () {
		var t = new eui.Label();
		this.txtStream2 = t;
		t.size = 48;
		t.text = "0次";
		t.textColor = 0x2E2A2A;
		return t;
	};
	_proto._Group10_i = function () {
		var t = new eui.Group();
		t.height = 20;
		t.percentWidth = 100;
		t.x = 108;
		t.y = 236;
		return t;
	};
	_proto._Label6_i = function () {
		var t = new eui.Label();
		t.text = "获得订阅";
		t.textColor = 0x2E2A2A;
		return t;
	};
	_proto.txtSub2_i = function () {
		var t = new eui.Label();
		this.txtSub2 = t;
		t.size = 48;
		t.text = "0人";
		t.textColor = 0x2E2A2A;
		return t;
	};
	_proto._Group16_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 33;
		t.elementsContent = [this._Group13_i(),this._Group15_i()];
		return t;
	};
	_proto._Group13_i = function () {
		var t = new eui.Group();
		t.left = 0;
		t.percentHeight = 100;
		t.percentWidth = 50;
		t.elementsContent = [this.img3_i()];
		return t;
	};
	_proto.img3_i = function () {
		var t = new eui.Image();
		this.img3 = t;
		t.height = 200;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 120;
		return t;
	};
	_proto._Group15_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 50;
		t.right = 0;
		t.layout = this._VerticalLayout4_i();
		t.elementsContent = [this._Label7_i(),this.txtStream3_i(),this._Group14_i(),this._Label8_i(),this.txtSub3_i()];
		return t;
	};
	_proto._VerticalLayout4_i = function () {
		var t = new eui.VerticalLayout();
		t.horizontalAlign = "center";
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Label7_i = function () {
		var t = new eui.Label();
		t.text = "进行直播";
		t.textColor = 0x2E2A2A;
		t.x = 125;
		t.y = 42;
		return t;
	};
	_proto.txtStream3_i = function () {
		var t = new eui.Label();
		this.txtStream3 = t;
		t.size = 48;
		t.text = "0次";
		t.textColor = 0x2E2A2A;
		return t;
	};
	_proto._Group14_i = function () {
		var t = new eui.Group();
		t.height = 20;
		t.percentWidth = 100;
		t.x = 108;
		t.y = 236;
		return t;
	};
	_proto._Label8_i = function () {
		var t = new eui.Label();
		t.text = "获得订阅";
		t.textColor = 0x2E2A2A;
		return t;
	};
	_proto.txtSub3_i = function () {
		var t = new eui.Label();
		this.txtSub3 = t;
		t.size = 48;
		t.text = "0人";
		t.textColor = 0x2E2A2A;
		return t;
	};
	_proto._Group18_i = function () {
		var t = new eui.Group();
		t.percentHeight = 20;
		t.percentWidth = 100;
		t.x = 578;
		t.y = 587;
		t.elementsContent = [this.btnTitle_i()];
		return t;
	};
	_proto.btnTitle_i = function () {
		var t = new eui.Button();
		this.btnTitle = t;
		t.horizontalCenter = 0;
		t.label = "回到标题";
		t.verticalCenter = 0;
		return t;
	};
	return scorePanel;
})(eui.Skin);generateEUI.paths['resource/eui_skins/streamlistobj.exml'] = window.skins.streamlistobj = (function (_super) {
	__extends(streamlistobj, _super);
	function streamlistobj() {
		_super.call(this);
		this.skinParts = ["icon","txtStat"];
		
		this.height = 140;
		this.width = 140;
		this.elementsContent = [this.icon_i(),this.txtStat_i()];
		this.states = [
			new eui.State ("normal",
				[
				])
			,
			new eui.State ("accident",
				[
					new eui.SetProperty("txtStat","textColor",0x585454),
					new eui.SetProperty("txtStat","text","事故"),
					new eui.SetProperty("txtStat","bold",true)
				])
			,
			new eui.State ("fire",
				[
					new eui.SetProperty("txtStat","text","炎上"),
					new eui.SetProperty("txtStat","textColor",0xCE3B0D)
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.iconUrl"],[0],this.icon,"source");
	}
	var _proto = streamlistobj.prototype;

	_proto.icon_i = function () {
		var t = new eui.Image();
		this.icon = t;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.txtStat_i = function () {
		var t = new eui.Label();
		this.txtStat = t;
		t.bold = true;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.size = 60;
		t.textAlign = "center";
		t.verticalAlign = "middle";
		return t;
	};
	return streamlistobj;
})(eui.Skin);generateEUI.paths['resource/eui_skins/subscribe.exml'] = window.skins.subscribe = (function (_super) {
	__extends(subscribe, _super);
	function subscribe() {
		_super.call(this);
		this.skinParts = ["txtSubscribe"];
		
		this.height = 100;
		this.width = 160;
		this.elementsContent = [this._Group3_i()];
	}
	var _proto = subscribe.prototype;

	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.elementsContent = [this._Rect1_i(),this._Group2_i()];
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.ellipseWidth = 100;
		t.fillAlpha = 0.65;
		t.fillColor = 0xECECEC;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		t.layout = this._VerticalLayout1_i();
		t.elementsContent = [this._Label1_i(),this._Group1_i(),this.txtSubscribe_i()];
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.horizontalAlign = "center";
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.text = "subscribe";
		t.textColor = 0x312D2D;
		t.x = 81;
		t.y = 14;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 10;
		t.percentWidth = 100;
		return t;
	};
	_proto.txtSubscribe_i = function () {
		var t = new eui.Label();
		this.txtSubscribe = t;
		t.text = "0";
		t.textColor = 0x312D2D;
		t.x = 57;
		t.y = 77;
		return t;
	};
	return subscribe;
})(eui.Skin);generateEUI.paths['resource/eui_skins/titlePage.exml'] = window.skins.titlePage = (function (_super) {
	__extends(titlePage, _super);
	function titlePage() {
		_super.call(this);
		this.skinParts = ["img1","img2","btnStart","btnDes","btnStart2"];
		
		this.height = 720;
		this.width = 1280;
		this.elementsContent = [this._Rect1_i(),this.img1_i(),this.img2_i(),this._Group1_i(),this.btnStart_i(),this.btnDes_i(),this.btnStart2_i()];
	}
	var _proto = titlePage.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xECECEC;
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto.img1_i = function () {
		var t = new eui.Image();
		this.img1 = t;
		t.anchorOffsetX = 400;
		t.anchorOffsetY = 180;
		t.height = 360;
		t.horizontalCenter = -300;
		t.source = "title_nazono_png";
		t.top = 20;
		t.width = 400;
		return t;
	};
	_proto.img2_i = function () {
		var t = new eui.Image();
		this.img2 = t;
		t.height = 360;
		t.horizontalCenter = 300;
		t.rotation = 30;
		t.source = "icons_json#2434logo";
		t.top = -58;
		t.width = 400;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 200;
		t.percentWidth = 100;
		t.top = 120;
		t.x = 0;
		t.elementsContent = [this._Rect2_i(),this._Label1_i()];
		return t;
	};
	_proto._Rect2_i = function () {
		var t = new eui.Rect();
		t.fillAlpha = 0.5;
		t.fillColor = 0xECECEC;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.scaleX = 1;
		t.scaleY = 1;
		t.y = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.percentWidth = 100;
		t.size = 80;
		t.text = "NIJISANJI大富翁";
		t.textAlign = "center";
		t.textColor = 0x423939;
		t.x = 0;
		t.y = 59;
		return t;
	};
	_proto.btnStart_i = function () {
		var t = new eui.Button();
		this.btnStart = t;
		t.height = 85.09;
		t.horizontalCenter = 0;
		t.label = "本地多人模式";
		t.width = 271.89;
		t.y = 389.66;
		return t;
	};
	_proto.btnDes_i = function () {
		var t = new eui.Button();
		this.btnDes = t;
		t.height = 85.09;
		t.horizontalCenter = 0;
		t.label = "玩法简介";
		t.width = 271.89;
		t.y = 609.612;
		return t;
	};
	_proto.btnStart2_i = function () {
		var t = new eui.Button();
		this.btnStart2 = t;
		t.height = 85.09;
		t.horizontalCenter = 0;
		t.label = "单人冒险模式";
		t.width = 271.89;
		t.y = 496.618;
		return t;
	};
	return titlePage;
})(eui.Skin);generateEUI.paths['resource/eui_skins/vrbtn.exml'] = window.skins.vrbtn = (function (_super) {
	__extends(vrbtn, _super);
	function vrbtn() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 80;
		this.width = 80;
		this.elementsContent = [this._Image1_i()];
	}
	var _proto = vrbtn.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.source = "icons_json#vrbtn1";
		t.x = 0;
		t.y = 0;
		return t;
	};
	return vrbtn;
})(eui.Skin);