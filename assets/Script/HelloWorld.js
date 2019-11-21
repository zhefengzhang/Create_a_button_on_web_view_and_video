cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!',
        videoPlay: cc.VideoPlayer,
        webView: cc.WebView,
        imageWidth: 195,
        imageHeight: 57
    },

    // use this for initialization
    onLoad: function () {
        this.label.string = this.text;
    },

    start () {
        //  仅仅适用于 web 项目
        if (cc.sys.isBrowser) {
            var buttonDiv = document.createElement("div");
            var button = document.createElement("button");
            button.style.position = "absolute";
            button.style.left = `${cc.visibleRect.width / 2 - this.imageWidth / 2}px`;
            button.style.top = `${cc.visibleRect.height / 2 - this.imageHeight / 2}px`;
            button.style.zIndex = cc.macro.MAX_ZINDEX;
            var imageUrl = null;
            
            //未构建之前的项目，通过直接预览是可以访问到图片资源的，因为这时候图片资源有被上传到浏览器资源服务器，而构建之后的项目是访问不到的。
            //因为项目发包之后，只有首场景用到的资源会被上传到浏览器资源服务器，而那些没用过的就会被保留在项目包内。
            
            //直接使用网络图片能够减小包体,
            // button.style.width = `${this.imageWidth}px`;
            // button.style.height = `${this.imageHeight}px`;
            // imageUrl = "http://192.168.55.20:8000/btn_play.png";
            // button.style.backgroundImage = `url(${imageUrl})`;
            // button.style.backgroundColor = "transparent";
            // button.style.borderColor = "transparent";
            // buttonDiv.appendChild(button);
            // var body = document.body;
            // body.insertBefore(buttonDiv, body.lastChild);
  
            //另外也可以加载本地包体内的资源
            var localResUrl = cc.url.raw("resources/btn_play.png");
            cc.loader.load(localResUrl,(error, res)=>{
              if (!error) {
                imageUrl = res.nativeUrl;
                button.style.backgroundImage = `url(${imageUrl})`;
                button.style.width = res.width+"px";
                button.style.height = res.height+"px";
                button.style.backgroundColor = "transparent";
                button.style.borderColor = "transparent";
                button.onclick = (()=>{
                      if (this.videoPlay.enabled) {
                          this.videoPlay.enabled = false;
                          this.webView.enabled = true;
                      }
                      else {
                          this.videoPlay.enabled = true;
                          this.webView.enabled = false;
                          this.videoPlay.play();
                      }
                });
                buttonDiv.appendChild(button);
                var body = document.body;
                body.insertBefore(buttonDiv, body.lastChild);
              }
            });
          }
    },
    // called every frame
    update: function (dt) {

    },
});
