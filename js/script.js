var tagChild = "child0"

var navi =  navigator.userAgent
var screenwidth = window.screen.width
var screenheight = window.screen.height

var noloader = true
var requiredWidth = 950
var minWidth  = 2000
var minHeight = 1200
var divH = $(".child1").height()
var divW = $(".child1").width()
let onTag  = false







$("[id='tags']").hover(function(){
  if (!(screenwidth < requiredWidth)){
    $("[id='boxes']").css("display", "none")
    $("[id='boxcontent']").css("opacity", "0")
    $(".hText").css("display", "flex")
    $(".hText").empty()
    new textTranslation("hText", this.className).createAnimation()
  }
  })


  
$(".dumc1").hover(
    (e) => {
     try{
       $("." + tagChild).attr("style", "display:  flex; animation:  reveal 2s forwards")
     }
     catch(err){
      alert(err)
     }

    }, () => {
    }
    )
    
    
$(".tags-in").hover(
        (event) => {}, () => {
        if(screenwidth< requiredWidth){
          return
        }

          new TagManager().tagChildOut(tagChild)
         
        }
      )

  

$(window).click(
  (e) => {
    if (screenwidth < requiredWidth){
      if (e.target.className == "child0"){
        return
      }
      if (e.target.className == "dumc1"){
        return
      } 
      console.log("here",e.target.className)
      var child0 = $(".child0").css("display")
      if ((child0 == "flex")){
          if (e.target.id == "tags"){
          return  
          }
          else {
            new TagManager().tagChildOut(tagChild)
          }

        }

    }
  }
)


$("[id='tags']").click (
  (e) => {
      if ($($(e.target).parent()[0]).hasClass("tags-in")){
        if (e.target.className == "home"){
            var child = "child2"
        }
        else if (e.target.className == "skills"){
          var child = "child4"
        }
        else if (e.target.className == "services"){
          var child = "child3"
        }
        else{
          $(secondMainContainer).attr("class", $(secondMainContainer).attr("class") +  ` ${secondMainContainer.slice(1)}-animate`)
        }

        scroll(child)
        new TagManager().tagChildOut(tagChild)
      }
  }
)


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}




$(window).resize(function () {
  var height = $(".child1").height();
  var width = $(".child1").width();
  
  if ((height != divH) || (width != divW)){
    window.location.reload()
  }
  
});




$(document).ready( async (event) => {
  if (noloader){
    $(".loader").attr("style", "z-index: 0;opacity:0")  
    return
  }
  var w = parseInt($(".child1").width())
  var h = parseInt($(mainContainer).height())
  var error = undefined;
  await sleep(3000)
  if ((navi.match(/iPhone/i)) || (navi.match(/iPad/i))){
      var appVer = navi.slice(navi.indexOf("OS")).split(" ")[1].split("_")[0]
      if (parseInt(appVer)< 15){
          var error =  "The Webite is currently not supported for iOS < 15." + `(iOs${appVer})`
        }
    } 
  else if (navi.match(/Macintosh/i)){
    if (navi.match(/safari/i)){
      var error =  "Browser not supported."
    }
  }
  if ((h >  minHeight)){
    var error = `Oops, The website is not compatible with Width > ${minWidth} and Height > ${minHeight} [current width ${w}; height ${h}]`
  }    
  $(".loader").attr("style", "z-index: 0;opacity:0")  
  if (error){
    $("#error-msg").text(error)
    $("#error").attr("style", "display: flex; z-index; 12")
  }
  });




