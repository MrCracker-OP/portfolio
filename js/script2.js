
var something = [
  [`<svg height="20px" width="20px" class="dots"`, `><circle cx="10" cy="10" r="10" class="fi`,  `"/></svg>`]
]
var mainContainer  = ".container5"
var secondMainContainer  = ".container4"
var loaderData = {
  pyProgress: 89,
  jsProgress: 83,
  jvProgress: 80,
  cppProgress: 60

}

function getYCords(){
  var array = {}
  var childrens = $(mainContainer).children()
  var childrens = childrens.slice(1)
  for (var i = 0  ; i<childrens.length;i++){
       var chil2 = childrens.slice(0,i)
       var y = 0
       for (var i2 =0 ; i2 < chil2.length; i2++){
                 var y = y + $(chil2[i2]).height()
                }
        array[childrens[i].className] = y 
  }
  return array
}

var ycords  = getYCords()



function scroll(child){
  if (!(screenwidth < requiredWidth)){
    var y = ycords[child]
  }
  else {
    var y = $("." + child).offset().top
  }
  $(mainContainer).animate({
    scrollTop: y
    }, 500);
}


function isWrapped(className){
  var topOfChildren = []
  var wrappedChildren = []
  var unWrappedChildren = []
  var childrens = $("." + className).children()
  for (var i = 0; i < childrens.length ; i++){
      topOfChildren.push([childrens[i].className.split(" ")[0],  $(childrens[i]).offset().top])
  }
  for(var i2 = 0; i2 < (topOfChildren.length+1); i2++){
      if (i2+1   == topOfChildren.length){
          break
      }
      if (i2 == 0){
          wrappedChildren.push(topOfChildren[i2][0])
          
      }

      if (topOfChildren[i2+1][1] > topOfChildren[i2][1]){
              wrappedChildren.push(topOfChildren[i2+1][0])
      }
      else {
              unWrappedChildren.push(topOfChildren[i2+1][0])
  
      }
  }
  return [wrappedChildren,unWrappedChildren]
}

async function starAnimate(vb,va, x){
  var xMoved = x
  while(true){
      if ($(".container").css("display") == "none"){
          break
      }
      await sleep(2000)
      var xMoved = $(vb).offset().left
      if (xMoved >= screenwidth){
          $(va).attr("id", "vb")
          $(vb).attr("id", "va")
          if (vb == ".starIn"){
              var vb = ".starOut"
              var va = ".starIn"
          }
          else if (vb == ".starOut") {
              var vb = ".starIn"
              var va = ".starOut"
          }
          return starAnimate(vb, va,0)
      }
      $( vb).attr("style", `clip-path: inset(0  ${xMoved}px 0  0);`)
      if ($(va).css("opacity") == "0"){
          $(va).css("opacity", "1")
       }
      $(va).attr("style", `clip-path: inset(0  0 0  ${(screenwidth - xMoved) /2}px);`)
  }
}

class cardAnimation{
  constructor(className){
    this.className = className
    this.parent =  $("." + $("." + className).parent()[0].className)
  }


  
  onlyBack(child,arrayOfCloseAnimations,backButtoninIndex){
    var backButton = $(child[backButtoninIndex]).children()
    var close = $($(backButton[0]).children()[0]).children()
    $(backButton[0]).css(arrayOfCloseAnimations[0])
    for (var i3 in arrayOfCloseAnimations[1] ){
          $(close[i3]).css("animation", arrayOfCloseAnimations[1][i3])
    }

  }
  addAnimationClasses(arrayOfClasses,arrayOfCaptionClasses,  display, captionIndex,arrayOfCloseAnimations,backButtoninIndex){
    var child = $("." + this.className).children()
    var captionChildren = $(child[captionIndex]).children()
    for (var i in arrayOfClasses){
      var child2 = child.slice(1)
      if(!child2[i].className.includes(arrayOfClasses[i+1])){
        $(child2[i]).attr("class", child2[i].className + arrayOfClasses[i])
      }
    }
    for (var i2 in arrayOfCaptionClasses){
      if(!captionChildren[i2].className.includes(arrayOfCaptionClasses[i2])){
        var class_ = captionChildren[i2].className
        $(captionChildren[i2]).attr("class", class_ +  arrayOfCaptionClasses[i2])
        
      }
    }

    this.onlyBack(child,arrayOfCloseAnimations,backButtoninIndex)
    $(child[captionIndex]).css("display", display)



  }

  rmCardOutClass(){
    var x1=0
    var prnt= this.parent
    var childrens = prnt.children()
    for (var i in childrens){
      var child = childrens[x1]
      if (x1==childrens.length){
        break
      }
      if($(child).hasClass("card-out")){

        var childClassName =  $(child).attr("class").split(" ")
        $(child).attr("class", childClassName.slice(0, childClassName.length-1).join(" "))
      
      }
      x1++
    
  }
   this.rmCardIn('card-in')
  }
  rmCardIn(class_){
    var pc =  $("." + this.className).attr("class").split(" ")
    if(pc.includes(class_)){
      $("." + this.className).attr(
        "class", pc.slice(0, pc.length-1).join(" ")
      )
    }
  }
  removeOther(){
    var x1=0
    var prnt= this.parent
    var childrens = prnt.children()
    var already = false
    for (var i in childrens) {
          var child = childrens[x1]
          if ((x1) == childrens.length){
            break
          }
          var childClass=child.className
          var childDoc = $("." + childClass.split(" ")[0])
          if (!(childClass.split(" ")[0] == this.className)){
            if (childDoc.attr("class").includes("card-out")){
              return
            }
            childDoc.attr("class", childDoc.attr("class") + " card-out")
          }
          else {
            if (!already){
              if (childDoc.attr("class").includes("card-in")){
                return
              }
              childDoc.attr("class", childDoc.attr("class") + " card-in")
              var already = true
            }
          }
          x1++
    }
  }


}


class loaders {
  constructor(
    className,id, pctg = 100,animationName = "fill", animationtime=2, direction="ease-in",fillMode="forwards",Animationdelay='0ms',unit="ms"
  ){
    this.className = className
    this.id = id
    this.pctg = pctg
    this.unit = unit
    this.time = animationtime + this.unit
    this.animationName = animationName
    this.animationtime = animationtime
    this.Animationdelay = Animationdelay
    this.direction =  direction
    this.fillMode = fillMode
    this.delay = this.Animationdelay 
  }

  get width(){
   var data = this.divData
   return (data.fillTo*data.width)/100

  }

  get divData(){
    var div = $("." + this.className)
    return {
      "className": this.className,
      'id': this.id,
      "height": div.height(),
      "width": div.width(),
      "fillTo": this.pctg 

    }
  } 
  
  addNum(name, w){

    var div = $("." + name)
    div.css("width", w )
    div.text(this.divData.fillTo + "%")
 
  }

  adjustWidth(){
    var cls = $("." + this.divData.className)
     var childs = cls.children()
     var w = this.width
     for (var i in childs){
       if((i==1)){
        var grandSons = $("#" + childs[i].id).children()
        for (var i2 in grandSons){

            
            var grandChild = grandSons[i2]
            var gc = $("#" + grandChild.id)
            $("#" + childs[i].id).css({
              "width": w
            })
            gc.css({
            "animation": `${this.animationName} ${this.time} ${this.delay} ${this.direction} ${this.fillMode}`, 
            })
            var k =childs[0]
            var k2 =$("#" +k.id).children()
            var w2 = $("." + k2[0].className).width()
            this.addNum(
              k2[1].className,w - w2
            )
            break

        }
        break
       }
     }
  }

  async contentLoader(selector, timeDelay=20,unit = "ms",re){
        if($("." + this.className).css("opacity") == "0"){
          for (var d in loaderData){
            this.className = d
            this.id = 1
            this.pctg = loaderData[d]
            this.unit = "s"
            this.time = 2 + this.unit
            this.animationName = "fill"
            this.animationtime = 2
            this.Animationdelay = "100ms"
            this.direction =  "ease-in"
            this.fillMode = "forwards"
            this.delay = this.Animationdelay  
            this.adjustWidth()
          }
          return
        }
        var nRect = 8
        for (var i = 0; i<nRect; i++){
          var d =  $(selector + (i + 1))
          if (i){
    
              var animation = "unset"
          }
          await sleep(this.animationtime)
          $(selector + (i)).css(
            "animation", animation
          )
          d.css(
           "animation", `${this.animationName} ${this.time}  ${this.direction} ${this.fillMode}`
          )
          if ((i+1) == nRect){
            await sleep(this.animationtime)
            d.css("animation","unset")
          }
          else {
            await sleep(timeDelay)
          }
          
        }       
        

        await sleep(re)
       
        return this.contentLoader(selector,timeDelay=timeDelay,unit=unit,re)
  }
}


class HeaderManager {
  constructor(parentName, ignoreClass){
    this.parentName = parentName
    this.ignoreClass = ignoreClass

  }

  go(adder){
    var childrens = $("#" + this.parentName).children()
    for (var i in childrens){
      
      var cls  = childrens[i].className.split(" ")[0]
      if (!(cls == this.ignoreClass)){
         $("." + cls).attr("class", cls + adder)
      }
      if (i == childrens.length -1){
        break
      }
    }

  }
}



class textTranslation{
  constructor(parentName, text){
    this.parentName = parentName
    this.text = text
  }
  
  get textData(){
    var text = this.text
    var n = text.length
    if (!(n % 2)){
      var middleTerm = [((n)/2)-1, ((n)/2)]

    }
    else {
      var middleTerm = [(n+1)/2 - 1, (n+1)/2 - 1]
    }
    var data = {
      left: text.slice(0, middleTerm[0]),
      right: text.slice(middleTerm[1]+1),

     }
    if (middleTerm[0] == middleTerm[1]){
        data['middleTerm']=  [text.at(middleTerm[0]), text.at(middleTerm[0])]
      
    }
    else{ 
        data["middleTerm"] = [text.at(middleTerm[0]), text.at(middleTerm[1])]
    }
       return data
  }

  append(id,text){
    var parent = $("." + this.parentName)
    parent.append(
      "<span id="+ id + ">"+ text +  "</span>"
    )
    return parent
  }
  createAnimation(){
    var d =this.textData
    this.append("leftIN", d.left)
    if (d.middleTerm[0] != d.middleTerm[1]){

      const zip =  (a, b) => a.map((k, i) => [k, b[i]]);
      var zipped = zip(["leftIN", "rightIN"], d.middleTerm)
      
      for (var i in zipped){
        this.append(zipped[i][0], zipped[i][1])

      }
    }
    else{
      this.append("leftIN", d.middleTerm[0])
    }
    this.append("rightIN", d.right)
   

  }
}


class TagManager {

  tagChildOut(tagChild){
    $("." + tagChild).css("display","none")

    if(!(screenwidth<requiredWidth)){

      $(".hText").empty()
      $(".hText").css("display", "none")
      $("[id='boxes']").css("display", "flex")
      $("[id='boxcontent']").css("opacity", "1")
    }


  }  

}





new loaders("loader",0,0,"screenLoader",50,"linear","alternate",unit="ms").contentLoader(".rect",timeDelay=10,re=0)
