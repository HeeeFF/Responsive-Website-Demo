
window.onload = function() {


	var oText = $('searchText');	
	var textChange = new TextChange(oText,oText.value);

	var searchText = new SearchTab('search','nav','text');

	var highLight = new HighLight('bbs');

	var picTab = new PicTab('picTab');

	var shopTab = new Tab('shop','nav','shop');
	var mapTab = new Tab('map','nav','map');
	var konwTab = new Tab('konw','gradient','con');
	var listTab = new Tab('listTab','gradient','sideCon');

}
// ----------------------------------------------------tools-----------------------------------------------------------------

function $(id) {
	return typeof id === 'string'?document.getElementById(id):id;
}

function getByClass(id,sClass) {
    this.oParent = $(id);
    this.aEle = oParent.getElementsByTagName('*');
    this.arr = [];
    for (var i=0; i<this.aEle.length; i++) {
        if( this.aEle[i].className == sClass ) {
            arr.push(this.aEle[i]);
        }
    }
    return arr;
}
// -----------------------------------------------------ui----------------------------------------------------------------
// 文字消失显示
function TextChange(obj,str) {
    var value = str
    var _this =this;
    obj.onfocus = function() {
        _this.on(this,this.value);
    }
    obj.onblur = function() {
        _this.up(this,value);
    }
}
TextChange.prototype.on = function(obj,str) {
    if( obj.value == str ) {
        obj.value = '';
    }
}
TextChange.prototype.up = function(obj,str) {
    if( obj.value == '' ) {
        obj.value = str;
    }
}

//nav点击效果
function SearchTab(id,navClass,textClass) {
    this.aBtn = getByClass(id,navClass)[0].getElementsByTagName('li');
    var _this = this;
    for(var i=0; i<this.aBtn.length; i++) {
        this.aBtn[i].onclick = function() {
            _this.tab(this)
        }
    }
}

SearchTab.prototype.tab = function(oBtn) {
    for(var i=0;i<this.aBtn.length;i++) {
        this.aBtn[i].className = '';
    }
    oBtn.className = 'active';
}

//tab效果
function Tab(id,className,divid) {
    this.aBtn = getByClass(id,className)[0].getElementsByTagName('li');
    this.aDiv = $(divid).getElementsByTagName('div');
    var _this = this;
    for (var i=0; i<this.aBtn.length; i++) {
    	this.aBtn[i].index = i;
    	this.aBtn[i].onclick = function() {
            _this.tab(this);
        }
    }
}

Tab.prototype.tab =  function(oBtn) {
    for(var i=0;i<this.aBtn.length;i++) {
        this.aBtn[i].className = 'gradient';
        this.aDiv[i].style.display ='none';
    }
    oBtn.className = 'active';
    this.aDiv[oBtn.index].style.display = 'block';
}
//焦点图
function PicTab(id) {
    this.index = 0;
    this.timer = null;
    this.aLi = $(id).getElementsByTagName('ul')[0].getElementsByTagName('li');
    this.aTab = $(id).getElementsByTagName('ol')[0].getElementsByTagName('li');
    this.oText = $(id).getElementsByTagName('p')[0];
    this.arr = ['爸爸去哪了','是的范德萨发的','所谓人为法国']; 
    var _this = this;
    for(var i=0;i<this.aLi.length;i++) {
        this.aTab[i].id = i;
        this.aTab[i].onmouseover = function() {
        	_this.on(this);
        }
        this.aTab[i].onmouseout = function() {
        	_this.up();
        }
    }   
}

PicTab.prototype.on = function(obj) {
    clearInterval(this.timer);
    this.changeTab(obj.id);
}

PicTab.prototype.up = function() {
	var _this = this;
    this.timer = setInterval(function() {
    	_this.auto();
    },2000);
}

PicTab.prototype.auto = function() {
    this.index++;
    if(this.index>=this.aLi.length) {
        this.index = 0;
    }
    this.changeTab(this.index);
}

PicTab.prototype.changeTab= function(curIndex) {
    for(var i=0; i<this.aLi.length; i++) {
        this.aTab[i].className = '';
        this.aLi[i].style.display = 'none';
    } 
    this.oText.innerHTML = this.arr[curIndex];
    this.aTab[curIndex].className = 'active';
    this.aLi[curIndex].style.display = 'block';
    this.index = curIndex;
}
//高亮显示效果
function  HighLight(id) {
    this.aLi = $(id).getElementsByTagName('li');
    this.timer = null;
    var _this = this;
    for (var i=0; i<this.aLi.length; i++) {
        this.aLi[i].onmouseover = function() {
            _this.on(this);
        }
    }
    for (var i=0; i<this.aLi.length; i++) {   
        this.aLi[i].onmouseout = function() {
            _this.up();
        }
    }
}

HighLight.prototype.on = function(oBtn) {
    clearInterval(this.timer)
    for (var i=0; i<this.aLi.length; i++){
        this.aLi[i].className = '';
    }
    oBtn.className = 'active';
}

HighLight.prototype.up = function() {
    var _this = this
    this.timer = setInterval (function() {
        _this.interval();
    },300);
}

HighLight.prototype.interval = function() {
    for (var i=0; i<this.aLi.length; i++){
        this.aLi[i].className = '';
        }
    this.aLi[0].className = 'active';
}






