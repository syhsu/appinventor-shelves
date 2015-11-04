'use strict';

goog.provide('Blockly.Layer');

goog.require('Blockly.Msg');

Blockly.LayerBoxInit = function() {//initialize layerbox
  if(document.getElementById('layerbox')==null){
    var layerbox = document.createElement('div');
    layerbox.setAttribute('id', 'layerbox');
    layerbox.setAttribute('style', 'position:absolute; zIndex:2; left:85%; top:1%; visibility:visible; font-family:sans-serif;');
    document.body.appendChild(layerbox);
    

    var layerboxtitle = document.createElement('div');
    layerboxtitle.setAttribute('id', 'layerboxtitle');
    layerboxtitle.innerHTML = Blockly.Msg.LayerBox;
    layerboxtitle.setAttribute('style', 'background:#8fc202;')
    layerbox.appendChild(layerboxtitle);

    var layerboxhide = document.createElement('input');
    layerboxhide.src = 'media/min.gif';
    layerboxhide.type = 'image';
    layerboxhide.height = '12';
    layerboxhide.setAttribute('onclick', ('Blockly.ShowLayerBoxContent();'));
    layerboxhide.setAttribute('style', 'position:absolute; left:50%; top:1%;');
	layerboxhide.setAttribute('title', Blockly.Msg.LayerBoxMinimise);
    layerboxtitle.appendChild(layerboxhide);

    var layerexport = document.createElement('input');
    layerexport.src = 'media/export.png';
    layerexport.type = 'image';
    layerexport.height = '12';
    //layerboxhide.setAttribute('onclick', ('Blockly.ShowLayerBoxContent();'));
    layerexport.setAttribute('style', 'position:absolute; left:60%; top:1%;');
	layerexport.setAttribute('title', Blockly.Msg.LayerExport);
    layerboxtitle.appendChild(layerexport);

    var layerimport = document.createElement('input');
    layerimport.src = 'media/import.png';
    layerimport.type = 'image';
    layerimport.height = '12';
    //layerboxhide.setAttribute('onclick', ('Blockly.ShowLayerBoxContent();'));
    layerimport.setAttribute('style', 'position:absolute; left:70%; top:1%;');
	layerimport.setAttribute('title', Blockly.Msg.LayerImport);
    layerboxtitle.appendChild(layerimport);
    
    var layerboxcontent = document.createElement('div')
    layerboxcontent.id = 'layerboxcontent';
    layerboxcontent.setAttribute('style', 'background-color:rgb(202,220,169); visibility:visible; overflow:auto');
    layerbox.appendChild(layerboxcontent);

    Blockly.LayerBoxUpdate();
  }
  else{
    Blockly.LayerBoxUpdate();
  }
  Blockly.haslayerbox = true;
  Blockly.LayerBoxListerners();
}

Blockly.LayerBoxUpdate = function() {//update layerbox if there's any change for layerlist
  document.getElementById('layerboxcontent').innerHTML = '';//empty first

  var llist = Blockly.GetLayerList();
  var tbl = document.createElement('table');
  tbl.setAttribute('style','width:100%;');
  tbl.setAttribute('border','1;');
  var tbdy = document.createElement('tbody');
  for (var i = 0; i < llist.length; i++) {
    var tr = document.createElement('tr');
    if(llist[i]!=null){//won't create table if layerlabel is null
      var td = document.createElement('td');
      var layercheckdiv = document.createElement('div');
      var layercheck = document.createElement('input');
      layercheck.setAttribute("type", "checkbox");
      layercheckdiv.appendChild(layercheck);
      td.appendChild(layercheckdiv);
      tr.appendChild(td);

      var td = document.createElement('td');
      var layerlist = document.createElement('div');
      layerlist.id = llist[i];
      layerlist.innerHTML = llist[i];
      layerlist.setAttribute('onclick', ('Blockly.EditLayerName(this.id);'));
      td.appendChild(layerlist);
      tr.appendChild(td);

      for(var j = 0; j<6; j++){
        var td = document.createElement('td');
        var x = document.createElement('div');
        if(j == 0){//show by layer
          x.setAttribute('id', llist[i] + "show");
          x.setAttribute('name', llist[i]);
          name = llist[i];
          var image = document.createElement("img");
          //use fuction to set src
          if(Blockly.LayerView.length==0){
            image.src = 'media/eye.gif';
          }
          else{
            image.src = Blockly.CheckView(name);
          }
		  image.setAttribute('title', Blockly.Msg.LayerShowOrHide);
          x.appendChild(image);
          x.setAttribute('selected', Blockly.CheckSelect(name));
          x.setAttribute('onclick', ('Blockly.LayerViewer(this.id);'));
        }
        else if(j == 1){//duplicate by layer
          x.setAttribute('id', llist[i]);
          var image = document.createElement("img");
          image.src = 'media/copy.gif';
		  image.setAttribute('title', Blockly.Msg.LayerDuplicate);
          x.appendChild(image);
          x.setAttribute('onclick', ('Blockly.DuplicateByLayer(this.id);'));
        }
        else if(j == 2){//disable by layer
          x.setAttribute('id', llist[i] + "disabled");
          x.setAttribute('name', llist[i]);
          var image = document.createElement("img");
          image.src = 'media/red.gif';
		  image.setAttribute('title', Blockly.Msg.LayerEnableOrNot);
          x.appendChild(image);
          x.setAttribute('selected', false);
          x.setAttribute('onclick', ('Blockly.DisableByLayer(this.id);'));
        }
        else if(j == 3){//collapse by layer
          x.setAttribute('id', llist[i] + "collapsed");
          x.setAttribute('name', llist[i]);
          var image = document.createElement("img");
          image.src = 'media/min.gif';
		  image.setAttribute('title', Blockly.Msg.LayerCollapeOrNot);
          x.appendChild(image);
          x.setAttribute('selected', false);
          x.setAttribute('onclick', ('Blockly.CollapseByLayer(this.id);'));
        }
		else if(j==4){//close comment by layer
		  x.setAttribute('id', llist[i] + "comment");
          x.setAttribute('name', llist[i]);
          var image = document.createElement("img");
          image.src = 'media/Comment.gif';
		  image.setAttribute('title', Blockly.Msg.LayerCommentButton);
          x.appendChild(image);
          x.setAttribute('selected', false);
          x.setAttribute('onclick', ('Blockly.CommentByLayer("'+llist[i]+'");'));	
		}
    else if(j==5){//Delete a layer
          x.setAttribute('id', llist[i] + "delete");
          x.setAttribute('name', llist[i]);
          var image = document.createElement("img");
          image.src = 'media/DeleteRack.png';
          image.setAttribute('title', Blockly.Msg.LayerDeleteButton);
          x.appendChild(image);
          x.setAttribute('selected', false);
          x.setAttribute('onclick', ('Blockly.DeleteARack("'+llist[i]+'");')); 
    }
        td.appendChild(x);
        tr.appendChild(td);
      }

    }
    tbdy.appendChild(tr);
  }
  tbl.appendChild(tbdy);
  layerboxcontent = document.getElementById('layerboxcontent');
  layerboxcontent.appendChild(tbl);

  var layerother = document.createElement('BUTTON');
  var t = document.createTextNode(Blockly.Msg.LayerBoxOther);
  layerboxcontent.appendChild(layerother);
  layerother.appendChild(t);
  layerother.setAttribute('onclick', ('Blockly.doshowLayerBlockwithother();'));
  layerother.setAttribute('title', Blockly.Msg.LayerBlockShow);
  
  var sortbylayer = document.createElement('BUTTON');
  var t = document.createTextNode(Blockly.Msg.LayerBoxSBL);
  layerboxcontent.appendChild(sortbylayer);
  sortbylayer.appendChild(t);
  sortbylayer.setAttribute('onclick', ('Blockly.dosortByLayerLabel();'));
  sortbylayer.setAttribute('title', Blockly.Msg.LayerSortByLabel);
  
  var sortbyc = document.createElement('BUTTON');
  var t = document.createTextNode(Blockly.Msg.LayerBoxSBC);
  layerboxcontent.appendChild(sortbyc);
  sortbyc.appendChild(t);
  sortbyc.setAttribute('onclick', ('Blockly.dosortByC();'));  
  sortbyc.setAttribute('title', Blockly.Msg.SORT_C);  
}

Blockly.CheckView = function (name){
  if(Blockly.LayerView.indexOf(name)!=-1){//avoid repeat
    return 'media/eye.gif';
  }
  else{
    return 'media/closedeye.gif';
  }
}

Blockly.CheckSelect = function (name){
  if(Blockly.LayerView.indexOf(name)!=-1){//avoid repeat
    return true;
  }
  else{
    return false;
  }
}

Blockly.LayerBoxListerners = function (){//makes LB dragable
  document.getElementById('layerboxtitle').addEventListener('mousedown', mouseDown, false);
  window.addEventListener('mouseup', mouseUp, false);
}
function mouseUp()
{
  window.removeEventListener('mousemove', LBMove, true);
}
function mouseDown(e){
  window.addEventListener('mousemove', LBMove, true);
}
function LBMove(e){
  var LB = document.getElementById('layerbox');
  LB.style.position = 'absolute';
  LB.style.top = e.clientY + 'px';
  LB.style.left = e.clientX + 'px';
}

Blockly.ShowLayerBoxContent = function() {//user can hide LBContent if they want
  layerboxcontent=document.getElementById('layerboxcontent');
  if(layerboxcontent.style.visibility=='hidden'){
    layerboxcontent.style.visibility='visible';
  }
  else{
    layerboxcontent.style.visibility='hidden';
  }
}

Blockly.EditLayerName = function(oldname) {//user can edit the name of layer by clicking it
  var newlayername = prompt(Blockly.Msg.ChangeLayerLabelPrompt, oldname);
  if (newlayername) {
    var topblocks = Blockly.mainWorkspace.getTopBlocks(false);
    for (var i = 0; i < topblocks.length; i++) {
      if(topblocks[i].layerLabel === oldname){
        topblocks[i].setLayerLabel(newlayername);
    }
  }
    for(var i = 0; i<Blockly.LayerView.length; i++){
      if(Blockly.LayerView[i] == oldname)
        Blockly.LayerView.splice(i,1);
    }
  }
  else{
    Blockly.DeleteARack(oldname)
  }
}

Blockly.DeleteARack = function(oldname){
  if(confirm(Blockly.Msg.DeleteLayerPrompt + oldname + "?")){
    var topblocks = Blockly.mainWorkspace.getTopBlocks(false);
    for (var i = 0; i < topblocks.length; i++) {
      if(topblocks[i].layerLabel === oldname){
        topblocks[i].setLayerLabel('');
      }
    }
    for(var i = 0; i<Blockly.LayerView.length; i++){
      if(Blockly.LayerView[i] == oldname)
        Blockly.LayerView.splice(i,1);
    }
    //Blockly.LayerBoxUpdate();
  }
}

Blockly.LayerView = [];

Blockly.LayerViewer = function(id){//dicide how to show by layerlabel
  var x =document.getElementById(id);
  selected = x.getAttribute("selected");
  name = x.getAttribute("name");

  if(selected == "false"){
    x.setAttribute("selected",true);
    x.innerHTML = "";
    var image = document.createElement("img");
    image.src = 'media/eye.gif';
	image.setAttribute('title', Blockly.Msg.LayerShowOrHide);
    x.appendChild(image);
    
    if(Blockly.LayerView.indexOf(name) == -1){//avoid repeat
      Blockly.LayerView.push(name);
    }
  }
  else if(selected == "true"){
    x.setAttribute("selected",false);
    x.innerHTML = "";
    var image = document.createElement("img");
    image.src = 'media/closedeye.gif';
	image.setAttribute('title', Blockly.Msg.LayerShowOrHide);
    x.appendChild(image);

    for(var i = 0; i<Blockly.LayerView.length; i++){
      if(Blockly.LayerView[i] == name)
        Blockly.LayerView.splice(i,1);
    }
  }
  Blockly.doshowLayerBlock();
  if(Blockly.LayerView.length == 0)
    Blockly.dosortByLayerLabel();
  Blockly.LayerBoxUpdate();
}

Blockly.DuplicateByLayer = function(layer) {//duplicate by layer
  var topblocks = Blockly.mainWorkspace.getTopBlocks(false);
  targetlayer = layer.split(', ');
  for (var i = 0; i < targetlayer.length; i++) {
    for (var j = 0; j < topblocks.length; j++) {
      if(targetlayer[i] === topblocks[j].layerLabel){
        topblocks[j].duplicate_();
      }
    }
  }
}

Blockly.DisableByLayer = function(id) {//disable by layer
  var x = document.getElementById(id);
  disabled = x.getAttribute("selected");
  name = x.getAttribute("name");
  var topblocks = Blockly.mainWorkspace.getTopBlocks(false);
  targetlayer = name.split(', ');
  for (var i = 0; i < targetlayer.length; i++) {
    for (var j = 0; j < topblocks.length; j++) {
      if(targetlayer[i] === topblocks[j].layerLabel && disabled == "false"){
        x.setAttribute("selected",true);
        x.innerHTML = "";
        var image = document.createElement("img");
        image.src = 'media/green.gif';
		image.setAttribute('title', Blockly.Msg.LayerDuplicate);
        x.appendChild(image);
        topblocks[j].setDisabled(true);
      }
      else if(targetlayer[i] === topblocks[j].layerLabel && disabled == "true"){
        x.setAttribute("selected",false);
        x.innerHTML = "";
        var image = document.createElement("img");
        image.src = 'media/red.gif';
		image.setAttribute('title', Blockly.Msg.LayerDuplicate);
        x.appendChild(image);
        topblocks[j].setDisabled(false);
      }
    }
  }
}

Blockly.CollapseByLayer = function(id) {//collapse by layer
  var x = document.getElementById(id);
  collapsed = x.getAttribute("selected");
  name = x.getAttribute("name");
  var topblocks = Blockly.mainWorkspace.getTopBlocks(false);
  targetlayer = name.split(', ');
	for (var i = 0; i < targetlayer.length; i++) {
    for (var j = 0; j < topblocks.length; j++) {
      if(targetlayer[i] === topblocks[j].layerLabel && collapsed == "false"){
        x.setAttribute("selected",true);
        x.innerHTML = "";
        var image = document.createElement("img");
        image.src = 'media/max.gif';
		image.setAttribute('title', Blockly.Msg.LayerCollapeOrNot);
        x.appendChild(image);
        topblocks[j].setCollapsed(true);
      }
      else if(targetlayer[i] === topblocks[j].layerLabel && collapsed == "true"){
        x.setAttribute("selected",false);
        x.innerHTML = "";
        var image = document.createElement("img");
        image.src = 'media/min.gif';
		image.setAttribute('title', Blockly.Msg.LayerCollapeOrNot);
        x.appendChild(image);
      	topblocks[j].setCollapsed(false);
      }
    }
  }
}

Blockly.GetLayerList = function() {//return the layerlist
  var topBlocks = Blockly.mainWorkspace.getTopBlocks(false);
  var llist = []
  for (var i = 0; i < topBlocks.length; i++) {
    if(topBlocks[i].layerLabel != null){
      if(llist.indexOf(topBlocks[i].layerLabel) == -1){
        llist.push(topBlocks[i].layerLabel);
      }
    }
  }
  llist.sort();
  return llist;
}

Blockly.CommentByLayer = function(name) {//Comment by layer
	var topblocks = Blockly.mainWorkspace.getTopBlocks(false);
	targetlayer = name;
	for (var j = 0; j < topblocks.length; j++) {
		if(targetlayer === topblocks[j].layerLabel){
			//create layercommentbox
			if(document.getElementById('layercommentbox')==null){
				var layercommentbox = document.createElement('div');
				layercommentbox.setAttribute('id', 'layercommentbox');
				layercommentbox.setAttribute('style', 'position:absolute; zIndex:2; left:70%; top:1%; width:200px; height:300px; visibility:visible; font-family:sans-serif;');
				document.body.appendChild(layercommentbox);
				var layercommentboxtitle = document.createElement('div');
				layercommentboxtitle.setAttribute('id', 'layercommentboxtitle');
				layercommentboxtitle.innerHTML = 'LayerComment';
				layercommentboxtitle.setAttribute('style', 'background:#8fc202;')
				layercommentbox.appendChild(layercommentboxtitle);
				
				var layercommentboxcontent = document.createElement('div')
				layercommentboxcontent.id = 'layercommentboxcontent';
				layercommentboxcontent.setAttribute('style', 'background-color:rgb(202,220,169); visibility:visible; width:200px; height:200px; resize: none;');
				layercommentbox.appendChild(layercommentboxcontent);
				
				var layercommentboxfoot = document.createElement('div');
				layercommentboxfoot.setAttribute('id', 'layercommentboxfoot');
				layercommentboxfoot.setAttribute('style', 'background:#8fc202;')
				
				var closebutton = document.createElement('button');
				closebutton.setAttribute('id', 'layercommentclosebutton');
				closebutton.innerHTML = Blockly.Msg.LayerCommentClose;
				closebutton.setAttribute('onclick', ('Blockly.CloseLayerComment();'));
				closebutton.setAttribute('style','width:100px;');
				layercommentboxfoot.appendChild(closebutton);
				
				var updatebutton = document.createElement('button');
				updatebutton.setAttribute('id', 'layercommentupdatebutton');
				updatebutton.innerHTML = Blockly.Msg.LayerCommentUpdate;
				updatebutton.setAttribute('onclick', ('Blockly.UpdateLayerComment();'));
				updatebutton.setAttribute('style','width:100px;');
				layercommentboxfoot.appendChild(updatebutton);
				layercommentbox.appendChild(layercommentboxfoot);
			}
			Blockly.LayerCommentBoxUpdate(name);
			Blockly.LayerCommentBoxListerners();
		}
	}
}

Blockly.LayerCommentBoxListerners = function (){//makes LayerCommentBox dragable
  document.getElementById('layercommentboxtitle').addEventListener('mousedown', LCBmouseDown, false);
  window.addEventListener('mouseup', LCBmouseUp, false);
}
function LCBmouseUp()
{
  window.removeEventListener('mousemove', LCBMove, true);
}
function LCBmouseDown(e){
  window.addEventListener('mousemove', LCBMove, true);
}
function LCBMove(e){
  var LCB = document.getElementById('layercommentbox');
  LCB.style.position = 'absolute';
  LCB.style.top = e.clientY + 'px';
  LCB.style.left = e.clientX + 'px';
}

Blockly.LayerCommentBoxUpdate = function(name){
	//update the LayerCommentBox to the selected Layer
	var topblocks = Blockly.mainWorkspace.getTopBlocks(false);
	var targetlayer = name;
	for (var j = 0; j < topblocks.length; j++) {
		if(targetlayer === topblocks[j].layerLabel){
			var layerLabel=topblocks[j].layerLabel;
			var layerComment=topblocks[j].layerComment;
			document.querySelector('#layercommentboxtitle').innerHTML = Blockly.Msg.LayerCommentTitle + ": "+layerLabel;
			document.querySelector('#layercommentboxcontent').innerHTML = layerComment;
			document.querySelector('#layercommentupdatebutton').setAttribute('onclick', ('Blockly.UpdateLayerComment("'+name+'");'));	
		}
	}
	
	
}

Blockly.UpdateLayerComment = function(name){
	//update the selected Layer's layerComment
	var comment = prompt(Blockly.Msg.LayerCommentPrompt,"");
	if(comment!=""){
		var topblocks = Blockly.mainWorkspace.getTopBlocks(false);
		var targetlayer = name;
		for (var j = 0; j < topblocks.length; j++) {
			if(targetlayer === topblocks[j].layerLabel){
				topblocks[j].setLayerComment(comment);			
				Blockly.CommentByLayer(name);
			}
		}
	}
}

Blockly.CloseLayerComment=function(){
	//close the LayerCommentBox
	var layercommentbox = document.querySelector("#layercommentbox");
	layercommentbox.parentNode.removeChild(layercommentbox);
}
