cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
    },

    start () {
        //  适用于 Web/Faceback Instant Games 项目
        if (cc.sys.isBrowser) {
            var buttonDiv = document.createElement("div");
            var button = document.createElement("button");
            
            const frameSize = cc.view.getFrameSize();
            const imageWidth = 195, imageHeight = 57;

            button.style.position = "absolute";
            button.style.left = `${frameSize.width / 2 - imageWidth / 2}px`;
            button.style.top = `${frameSize.height / 2 - imageHeight / 2}px`;

            //加载包体内的图片资源
            cc.resources.load("btn_play", cc.Texture2D, (error, res)=>{
              if (!error) {
                button.style.backgroundImage = `url(${res.nativeUrl})`;
                // button.style.backgroundImage = `url("http://192.168.55.20:8000/btn_play.png")`; // 也可以加载网络上的图片资源
                button.style.backgroundRepeat = "no-repeat";
                button.style.backgroundPosition = "center";
                button.style.width = res.width + "px";
                button.style.height = res.height + "px";
                button.style.backgroundColor = "transparent";
                button.style.borderColor = "transparent";
                button.onclick = (()=>{
                      this.label.string = "Hello, Cocos!";
                });
                buttonDiv.appendChild(button);
                var body = document.body;
                body.insertBefore(buttonDiv, body.lastChild);
              }
            });
          }
    },
});
