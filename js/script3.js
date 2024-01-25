
var iswrp = isWrapped("card")
var wrapped = iswrp[0]

var unwrapped = iswrp[1]

if (!unwrapped){
    var unwrapped = ["hi"]
}

$(".child3").on("mouseleave", () => {

    window['cLeft'] = true
} );


$("[id='cardDmbg']").on("mouseenter click",

    (event) => {

    var cls = $($(event.target).parent()[0]).attr("class").split(" ")
    if($($(event.target).parent()[0]).hasClass("card-out")){
       return
   }
    if (event.type == "mouseenter"){
        if ((window.cLeft == false) && (unwrapped.includes(cls[0]))){
           return
       }
    }
    else if (event.type == "click"){
        if ($(event.target).attr("class") == "close"){
            return
        }
        if ($($(event.target).parent()[0]).hasClass("card-in")){
            return
        }
    }
    if ($(event.target).hasClass("serviceCard")){
        
         try {
            var c = new cardAnimation(cls[0])
            $("[id='cardTitle']").css("display","none")
            c.removeOther()
            c.addAnimationClasses(
             [
             " icon-animate-in" ,
             ], [
                 " p-captionAnimateIn", " cardKeywords-animateIn"
             ],"flex", 2, [
               {
                   "display": "flex",
                   "opacity": "0",
                   "animation": "reveal 400ms linear 500ms forwards"
               }, [
                   "unset", "unset"
               ]
             ],0
            )
         }
         catch(err){
            alert(err)
         }
         

      }
      
     }
      
)

$("[id='close']").hover(
    (e)=> {
        var cls = $($(e.target).parent()[0])[0]
        var cls = $(cls).parent()[0]
        var cls = ($(cls).parent()[0]).className.split(" ")
        var c = new cardAnimation(cls[0])
        c.onlyBack($("." + c.className).children(), [{}, ["rotate0 400ms linear  forwards","rotate0 400ms linear  forwards"]],0)
    }, (e)=> {
        cls = $($(e.target).parent()[0])[0]
        var cls = $(cls).parent()[0]
        var cls = ($(cls).parent()[0]).className.split(" ")
        var c = new cardAnimation(cls[0])
        c.onlyBack($("." + c.className).children(), [{}, ["unset","unset"]],0)
    }
)

$("[id='close']").click(
   async (e) => {
    
        var cls = $($(e.target).parent()[0])[0]
        var cls = $(cls).parent()[0]
       
        var cls = ($(cls).parent()[0]).className.split(" ")
        console.log("1 ",cls[0])

        if ((cls[0] == "cc-column2") || (cls[0] == "cc-0") ){
            var attrMainsecondCls  = $(secondMainContainer).attr("class")
            $(secondMainContainer).attr("class", attrMainsecondCls.split(" ")[0])
            return
        }
        else {
            if (!wrapped){
                window['cLeft'] = false
            }
            else {
                if (!wrapped.includes(cls[0])){
                    window['cLeft'] = false
        
                }
            }
            var c = new cardAnimation(cls[0])
             
            c.rmCardOutClass()
            c.addAnimationClasses(
                [
                    " icon-animate-out"
                ],[
                    "", ""
                ],  "none", 2, [
                    {
                        "display": 'none'
                    }, ["unset", "unset"]
                ],0
            )
            $("[id='cardTitle']").css("display","flex")
            await sleep(100)
            var kido = $("." + c.className).children()[1]
            $(kido).attr("class", $(kido).attr("class").split(" ")[0])
        }

    }
)










starAnimate(".starOut", ".starIn")