"function" != typeof Object.create && (Object.create = function (o) {
        function i() {}
        return i.prototype = o, new i
    }),
    function (o) {
        var i = {
            init: function (i, t) {
                var e = this;
                e.elem = t, e.$elem = o(t), e.imageSrc = e.$elem.data("zoom-image") ? e.$elem.data("zoom-image") : e.$elem.attr("src"), e.options = o.extend({}, o.fn.elevateZoom.options, i), e.options.tint && (e.options.lensColour = "none", e.options.lensOpacity = "1"), "inner" == e.options.zoomType && (e.options.showLens = !1), e.$elem.parent().removeAttr("title").removeAttr("alt"), e.zoomImage = e.imageSrc, e.refresh(1), o("#" + e.options.gallery + " a").click(function (i) {
                    return e.options.galleryActiveClass && (o("#" + e.options.gallery + " a").removeClass(e.options.galleryActiveClass), o(this).addClass(e.options.galleryActiveClass)), i.preventDefault(), o(this).data("zoom-image") ? e.zoomImagePre = o(this).data("zoom-image") : e.zoomImagePre = o(this).data("image"), e.swaptheimage(o(this).data("image"), e.zoomImagePre), !1
                })
            },
            refresh: function (o) {
                var i = this;
                setTimeout(function () {
                    i.fetch(i.imageSrc)
                }, o || i.options.refresh)
            },
            fetch: function (o) {
                var i = this,
                    t = new Image;
                t.onload = function () {
                    i.largeWidth = t.width, i.largeHeight = t.height, i.startZoom(), i.currentImage = i.imageSrc, i.options.onZoomedImageLoaded(i.$elem)
                }, t.src = o
            },
            startZoom: function () {
                var i = this;
                if (i.nzWidth = i.$elem.width(), i.nzHeight = i.$elem.height(), i.isWindowActive = !1, i.isLensActive = !1, i.isTintActive = !1, i.overWindow = !1, i.options.imageCrossfade && (i.zoomWrap = i.$elem.wrap('<div style="height:' + i.nzHeight + "px;width:" + i.nzWidth + 'px;" class="zoomWrapper" />'), i.$elem.css("position", "absolute")), i.zoomLock = 1, i.scrollingLock = !1, i.changeBgSize = !1, i.currentZoomLevel = i.options.zoomLevel, i.nzOffset = i.$elem.offset(), i.widthRatio = i.largeWidth / i.currentZoomLevel / i.nzWidth, i.heightRatio = i.largeHeight / i.currentZoomLevel / i.nzHeight, "window" == i.options.zoomType && (i.zoomWindowStyle = "overflow: hidden;background-position: 0px 0px;text-align:center;background-color: " + String(i.options.zoomWindowBgColour) + ";width: " + String(i.options.zoomWindowWidth) + "px;height: " + String(i.options.zoomWindowHeight) + "px;float: left;background-size: " + i.largeWidth / i.currentZoomLevel + "px " + i.largeHeight / i.currentZoomLevel + "px;display: none;z-index:100;border: " + String(i.options.borderSize) + "px solid " + i.options.borderColour + ";background-repeat: no-repeat;position: absolute;"), "inner" == i.options.zoomType) {
                    var t = i.$elem.css("border-left-width");
                    i.zoomWindowStyle = "overflow: hidden;margin-left: " + String(t) + ";margin-top: " + String(t) + ";background-position: 0px 0px;width: " + String(i.nzWidth) + "px;height: " + String(i.nzHeight) + "px;float: left;display: none;cursor:" + i.options.cursor + ";px solid " + i.options.borderColour + ";background-repeat: no-repeat;position: absolute;"
                }
                "window" == i.options.zoomType && (lensHeight = i.nzHeight < i.options.zoomWindowWidth / i.widthRatio ? i.nzHeight : String(i.options.zoomWindowHeight / i.heightRatio), lensWidth = i.largeWidth < i.options.zoomWindowWidth ? i.nzWidth : i.options.zoomWindowWidth / i.widthRatio, i.lensStyle = "background-position: 0px 0px;width: " + String(i.options.zoomWindowWidth / i.widthRatio) + "px;height: " + String(i.options.zoomWindowHeight / i.heightRatio) + "px;float: right;display: none;overflow: hidden;z-index: 999;-webkit-transform: translateZ(0);opacity:" + i.options.lensOpacity + ";filter: alpha(opacity = " + 100 * i.options.lensOpacity + "); zoom:1;width:" + lensWidth + "px;height:" + lensHeight + "px;background-color:" + i.options.lensColour + ";cursor:" + i.options.cursor + ";border: " + i.options.lensBorderSize + "px solid " + i.options.lensBorderColour + ";background-repeat: no-repeat;position: absolute;"), i.tintStyle = "display: block;position: absolute;background-color: " + i.options.tintColour + ";filter:alpha(opacity=0);opacity: 0;width: " + i.nzWidth + "px;height: " + i.nzHeight + "px;", i.lensRound = "", "lens" == i.options.zoomType && (i.lensStyle = "background-position: 0px 0px;float: left;display: none;border: " + String(i.options.borderSize) + "px solid " + i.options.borderColour + ";width:" + String(i.options.lensSize) + "px;height:" + String(i.options.lensSize) + "px;background-repeat: no-repeat;position: absolute;"), "round" == i.options.lensShape && (i.lensRound = "border-top-left-radius: " + String(i.options.lensSize / 2 + i.options.borderSize) + "px;border-top-right-radius: " + String(i.options.lensSize / 2 + i.options.borderSize) + "px;border-bottom-left-radius: " + String(i.options.lensSize / 2 + i.options.borderSize) + "px;border-bottom-right-radius: " + String(i.options.lensSize / 2 + i.options.borderSize) + "px;"), i.zoomContainer = o('<div class="zoomContainer" style="-webkit-transform: translateZ(0);position:absolute;left:' + i.nzOffset.left + "px;top:" + i.nzOffset.top + "px;height:" + i.nzHeight + "px;width:" + i.nzWidth + 'px;"></div>'), o("body").append(i.zoomContainer), i.options.containLensZoom && "lens" == i.options.zoomType && i.zoomContainer.css("overflow", "hidden"), "inner" != i.options.zoomType && (i.zoomLens = o("<div class='zoomLens' style='" + i.lensStyle + i.lensRound + "'>&nbsp;</div>").appendTo(i.zoomContainer).click(function () {
                    i.$elem.trigger("click")
                }), i.options.tint && (i.tintContainer = o("<div/>").addClass("tintContainer"), i.zoomTint = o("<div class='zoomTint' style='" + i.tintStyle + "'></div>"), i.zoomLens.wrap(i.tintContainer), i.zoomTintcss = i.zoomLens.after(i.zoomTint), i.zoomTintImage = o('<img style="position: absolute; left: 0px; top: 0px; max-width: none; width: ' + i.nzWidth + "px; height: " + i.nzHeight + 'px;" src="' + i.imageSrc + '">').appendTo(i.zoomLens).click(function () {
                    i.$elem.trigger("click")
                }))), isNaN(i.options.zoomWindowPosition) ? i.zoomWindow = o("<div style='z-index:999;left:" + i.windowOffsetLeft + "px;top:" + i.windowOffsetTop + "px;" + i.zoomWindowStyle + "' class='zoomWindow'>&nbsp;</div>").appendTo("body").click(function () {
                    i.$elem.trigger("click")
                }) : i.zoomWindow = o("<div style='z-index:999;left:" + i.windowOffsetLeft + "px;top:" + i.windowOffsetTop + "px;" + i.zoomWindowStyle + "' class='zoomWindow'>&nbsp;</div>").appendTo(i.zoomContainer).click(function () {
                    i.$elem.trigger("click")
                }), i.zoomWindowContainer = o("<div/>").addClass("zoomWindowContainer").css("width", i.options.zoomWindowWidth), i.zoomWindow.wrap(i.zoomWindowContainer), "lens" == i.options.zoomType && i.zoomLens.css({
                    backgroundImage: "url('" + i.imageSrc + "')"
                }), "window" == i.options.zoomType && i.zoomWindow.css({
                    backgroundImage: "url('" + i.imageSrc + "')"
                }), "inner" == i.options.zoomType && i.zoomWindow.css({
                    backgroundImage: "url('" + i.imageSrc + "')"
                }), i.$elem.bind("touchmove", function (o) {
                    o.preventDefault(), i.setPosition(o.originalEvent.touches[0] || o.originalEvent.changedTouches[0])
                }), i.zoomContainer.bind("touchmove", function (o) {
                    "inner" == i.options.zoomType && i.showHideWindow("show"), o.preventDefault(), i.setPosition(o.originalEvent.touches[0] || o.originalEvent.changedTouches[0])
                }), i.zoomContainer.bind("touchend", function () {
                    i.showHideWindow("hide"), i.options.showLens && i.showHideLens("hide"), i.options.tint && "inner" != i.options.zoomType && i.showHideTint("hide")
                }), i.$elem.bind("touchend", function () {
                    i.showHideWindow("hide"), i.options.showLens && i.showHideLens("hide"), i.options.tint && "inner" != i.options.zoomType && i.showHideTint("hide")
                }), i.options.showLens && (i.zoomLens.bind("touchmove", function (o) {
                    o.preventDefault(), i.setPosition(o.originalEvent.touches[0] || o.originalEvent.changedTouches[0])
                }), i.zoomLens.bind("touchend", function () {
                    i.showHideWindow("hide"), i.options.showLens && i.showHideLens("hide"), i.options.tint && "inner" != i.options.zoomType && i.showHideTint("hide")
                })), i.$elem.bind("mousemove", function (o) {
                    0 == i.overWindow && i.setElements("show"), i.lastX === o.clientX && i.lastY === o.clientY || (i.setPosition(o), i.currentLoc = o), i.lastX = o.clientX, i.lastY = o.clientY
                }), i.zoomContainer.bind("mousemove", function (o) {
                    0 == i.overWindow && i.setElements("show"), i.lastX === o.clientX && i.lastY === o.clientY || (i.setPosition(o), i.currentLoc = o), i.lastX = o.clientX, i.lastY = o.clientY
                }), "inner" != i.options.zoomType && i.zoomLens.bind("mousemove", function (o) {
                    i.lastX === o.clientX && i.lastY === o.clientY || (i.setPosition(o), i.currentLoc = o), i.lastX = o.clientX, i.lastY = o.clientY
                }), i.options.tint && "inner" != i.options.zoomType && i.zoomTint.bind("mousemove", function (o) {
                    i.lastX === o.clientX && i.lastY === o.clientY || (i.setPosition(o), i.currentLoc = o), i.lastX = o.clientX, i.lastY = o.clientY
                }), "inner" == i.options.zoomType && i.zoomWindow.bind("mousemove", function (o) {
                    i.lastX === o.clientX && i.lastY === o.clientY || (i.setPosition(o), i.currentLoc = o), i.lastX = o.clientX, i.lastY = o.clientY
                }), i.zoomContainer.add(i.$elem).mouseenter(function () {
                    0 == i.overWindow && i.setElements("show")
                }).mouseleave(function () {
                    i.scrollLock || i.setElements("hide")
                }), "inner" != i.options.zoomType && i.zoomWindow.mouseenter(function () {
                    i.overWindow = !0, i.setElements("hide")
                }).mouseleave(function () {
                    i.overWindow = !1
                }), i.minZoomLevel = i.options.minZoomLevel ? i.options.minZoomLevel : 2 * i.options.scrollZoomIncrement, i.options.scrollZoom && i.zoomContainer.add(i.$elem).bind("mousewheel DOMMouseScroll MozMousePixelScroll", function (t) {
                    i.scrollLock = !0, clearTimeout(o.data(this, "timer")), o.data(this, "timer", setTimeout(function () {
                        i.scrollLock = !1
                    }, 250));
                    var e = t.originalEvent.wheelDelta || -1 * t.originalEvent.detail;
                    return t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault(), e / 120 > 0 ? i.currentZoomLevel >= i.minZoomLevel && i.changeZoomLevel(i.currentZoomLevel - i.options.scrollZoomIncrement) : i.options.maxZoomLevel ? i.currentZoomLevel <= i.options.maxZoomLevel && i.changeZoomLevel(parseFloat(i.currentZoomLevel) + i.options.scrollZoomIncrement) : i.changeZoomLevel(parseFloat(i.currentZoomLevel) + i.options.scrollZoomIncrement), !1
                })
            },
            setElements: function (o) {
                return this.options.zoomEnabled ? ("show" == o && this.isWindowSet && ("inner" == this.options.zoomType && this.showHideWindow("show"), "window" == this.options.zoomType && this.showHideWindow("show"), this.options.showLens && this.showHideLens("show"), this.options.tint && "inner" != this.options.zoomType && this.showHideTint("show")), void("hide" == o && ("window" == this.options.zoomType && this.showHideWindow("hide"), this.options.tint || this.showHideWindow("hide"), this.options.showLens && this.showHideLens("hide"), this.options.tint && this.showHideTint("hide")))) : !1
            },
            setPosition: function (o) {
                return this.options.zoomEnabled ? (this.nzHeight = this.$elem.height(), this.nzWidth = this.$elem.width(), this.nzOffset = this.$elem.offset(), this.options.tint && "inner" != this.options.zoomType && (this.zoomTint.css({
                    top: 0
                }), this.zoomTint.css({
                    left: 0
                })), this.options.responsive && !this.options.scrollZoom && this.options.showLens && (lensHeight = this.nzHeight < this.options.zoomWindowWidth / this.widthRatio ? this.nzHeight : String(this.options.zoomWindowHeight / this.heightRatio), lensWidth = this.largeWidth < this.options.zoomWindowWidth ? this.nzWidth : this.options.zoomWindowWidth / this.widthRatio, this.widthRatio = this.largeWidth / this.nzWidth, this.heightRatio = this.largeHeight / this.nzHeight, "lens" != this.options.zoomType && (lensHeight = this.nzHeight < this.options.zoomWindowWidth / this.widthRatio ? this.nzHeight : String(this.options.zoomWindowHeight / this.heightRatio), lensWidth = this.options.zoomWindowWidth < this.options.zoomWindowWidth ? this.nzWidth : this.options.zoomWindowWidth / this.widthRatio, this.zoomLens.css("width", lensWidth), this.zoomLens.css("height", lensHeight), this.options.tint && (this.zoomTintImage.css("width", this.nzWidth), this.zoomTintImage.css("height", this.nzHeight))), "lens" == this.options.zoomType && this.zoomLens.css({
                    width: String(this.options.lensSize) + "px",
                    height: String(this.options.lensSize) + "px"
                })), this.zoomContainer.css({
                    top: this.nzOffset.top
                }), this.zoomContainer.css({
                    left: this.nzOffset.left
                }), this.mouseLeft = parseInt(o.pageX - this.nzOffset.left), this.mouseTop = parseInt(o.pageY - this.nzOffset.top), "window" == this.options.zoomType && (this.Etoppos = this.mouseTop < this.zoomLens.height() / 2, this.Eboppos = this.mouseTop > this.nzHeight - this.zoomLens.height() / 2 - 2 * this.options.lensBorderSize, this.Eloppos = this.mouseLeft < 0 + this.zoomLens.width() / 2, this.Eroppos = this.mouseLeft > this.nzWidth - this.zoomLens.width() / 2 - 2 * this.options.lensBorderSize), "inner" == this.options.zoomType && (this.Etoppos = this.mouseTop < this.nzHeight / 2 / this.heightRatio, this.Eboppos = this.mouseTop > this.nzHeight - this.nzHeight / 2 / this.heightRatio, this.Eloppos = this.mouseLeft < 0 + this.nzWidth / 2 / this.widthRatio, this.Eroppos = this.mouseLeft > this.nzWidth - this.nzWidth / 2 / this.widthRatio - 2 * this.options.lensBorderSize), void(0 >= this.mouseLeft || 0 > this.mouseTop || this.mouseLeft > this.nzWidth || this.mouseTop > this.nzHeight ? this.setElements("hide") : (this.options.showLens && (this.lensLeftPos = String(this.mouseLeft - this.zoomLens.width() / 2), this.lensTopPos = String(this.mouseTop - this.zoomLens.height() / 2)), this.Etoppos && (this.lensTopPos = 0), this.Eloppos && (this.tintpos = this.lensLeftPos = this.windowLeftPos = 0), "window" == this.options.zoomType && (this.Eboppos && (this.lensTopPos = Math.max(this.nzHeight - this.zoomLens.height() - 2 * this.options.lensBorderSize, 0)), this.Eroppos && (this.lensLeftPos = this.nzWidth - this.zoomLens.width() - 2 * this.options.lensBorderSize)), "inner" == this.options.zoomType && (this.Eboppos && (this.lensTopPos = Math.max(this.nzHeight - 2 * this.options.lensBorderSize, 0)), this.Eroppos && (this.lensLeftPos = this.nzWidth - this.nzWidth - 2 * this.options.lensBorderSize)), "lens" == this.options.zoomType && (this.windowLeftPos = String(-1 * ((o.pageX - this.nzOffset.left) * this.widthRatio - this.zoomLens.width() / 2)), this.windowTopPos = String(-1 * ((o.pageY - this.nzOffset.top) * this.heightRatio - this.zoomLens.height() / 2)), this.zoomLens.css({
                    backgroundPosition: this.windowLeftPos + "px " + this.windowTopPos + "px"
                }), this.changeBgSize && (this.nzHeight > this.nzWidth ? ("lens" == this.options.zoomType && this.zoomLens.css({
                    "background-size": this.largeWidth / this.newvalueheight + "px " + this.largeHeight / this.newvalueheight + "px"
                }), this.zoomWindow.css({
                    "background-size": this.largeWidth / this.newvalueheight + "px " + this.largeHeight / this.newvalueheight + "px"
                })) : ("lens" == this.options.zoomType && this.zoomLens.css({
                    "background-size": this.largeWidth / this.newvaluewidth + "px " + this.largeHeight / this.newvaluewidth + "px"
                }), this.zoomWindow.css({
                    "background-size": this.largeWidth / this.newvaluewidth + "px " + this.largeHeight / this.newvaluewidth + "px"
                })), this.changeBgSize = !1), this.setWindowPostition(o)), this.options.tint && "inner" != this.options.zoomType && this.setTintPosition(o), "window" == this.options.zoomType && this.setWindowPostition(o), "inner" == this.options.zoomType && this.setWindowPostition(o), this.options.showLens && (this.fullwidth && "lens" != this.options.zoomType && (this.lensLeftPos = 0), this.zoomLens.css({
                    left: this.lensLeftPos + "px",
                    top: this.lensTopPos + "px"
                }))))) : !1
            },
            showHideWindow: function (o) {
                "show" != o || this.isWindowActive || (this.options.zoomWindowFadeIn ? this.zoomWindow.stop(!0, !0, !1).fadeIn(this.options.zoomWindowFadeIn) : this.zoomWindow.show(), this.isWindowActive = !0), "hide" == o && this.isWindowActive && (this.options.zoomWindowFadeOut ? this.zoomWindow.stop(!0, !0).fadeOut(this.options.zoomWindowFadeOut) : this.zoomWindow.hide(), this.isWindowActive = !1)
            },
            showHideLens: function (o) {
                "show" != o || this.isLensActive || (this.options.lensFadeIn ? this.zoomLens.stop(!0, !0, !1).fadeIn(this.options.lensFadeIn) : this.zoomLens.show(), this.isLensActive = !0), "hide" == o && this.isLensActive && (this.options.lensFadeOut ? this.zoomLens.stop(!0, !0).fadeOut(this.options.lensFadeOut) : this.zoomLens.hide(), this.isLensActive = !1)
            },
            showHideTint: function (o) {
                "show" != o || this.isTintActive || (this.options.zoomTintFadeIn ? this.zoomTint.css({
                    opacity: this.options.tintOpacity
                }).animate().stop(!0, !0).fadeIn("slow") : (this.zoomTint.css({
                    opacity: this.options.tintOpacity
                }).animate(), this.zoomTint.show()), this.isTintActive = !0), "hide" == o && this.isTintActive && (this.options.zoomTintFadeOut ? this.zoomTint.stop(!0, !0).fadeOut(this.options.zoomTintFadeOut) : this.zoomTint.hide(), this.isTintActive = !1)
            },
            setLensPostition: function () {},
            setWindowPostition: function (i) {
                var t = this;
                if (isNaN(t.options.zoomWindowPosition)) t.externalContainer = o("#" + t.options.zoomWindowPosition), t.externalContainerWidth = t.externalContainer.width(), t.externalContainerHeight = t.externalContainer.height(), t.externalContainerOffset = t.externalContainer.offset(), t.windowOffsetTop = t.externalContainerOffset.top, t.windowOffsetLeft = t.externalContainerOffset.left;
                else switch (t.options.zoomWindowPosition) {
                case 1:
                    t.windowOffsetTop = t.options.zoomWindowOffety, t.windowOffsetLeft = +t.nzWidth;
                    break;
                case 2:
                    t.options.zoomWindowHeight > t.nzHeight && (t.windowOffsetTop = -1 * (t.options.zoomWindowHeight / 2 - t.nzHeight / 2), t.windowOffsetLeft = t.nzWidth);
                    break;
                case 3:
                    t.windowOffsetTop = t.nzHeight - t.zoomWindow.height() - 2 * t.options.borderSize, t.windowOffsetLeft = t.nzWidth;
                    break;
                case 4:
                    t.windowOffsetTop = t.nzHeight, t.windowOffsetLeft = t.nzWidth;
                    break;
                case 5:
                    t.windowOffsetTop = t.nzHeight, t.windowOffsetLeft = t.nzWidth - t.zoomWindow.width() - 2 * t.options.borderSize;
                    break;
                case 6:
                    t.options.zoomWindowHeight > t.nzHeight && (t.windowOffsetTop = t.nzHeight, t.windowOffsetLeft = -1 * (t.options.zoomWindowWidth / 2 - t.nzWidth / 2 + 2 * t.options.borderSize));
                    break;
                case 7:
                    t.windowOffsetTop = t.nzHeight, t.windowOffsetLeft = 0;
                    break;
                case 8:
                    t.windowOffsetTop = t.nzHeight, t.windowOffsetLeft = -1 * (t.zoomWindow.width() + 2 * t.options.borderSize);
                    break;
                case 9:
                    t.windowOffsetTop = t.nzHeight - t.zoomWindow.height() - 2 * t.options.borderSize, t.windowOffsetLeft = -1 * (t.zoomWindow.width() + 2 * t.options.borderSize);
                    break;
                case 10:
                    t.options.zoomWindowHeight > t.nzHeight && (t.windowOffsetTop = -1 * (t.options.zoomWindowHeight / 2 - t.nzHeight / 2), t.windowOffsetLeft = -1 * (t.zoomWindow.width() + 2 * t.options.borderSize));
                    break;
                case 11:
                    t.windowOffsetTop = t.options.zoomWindowOffety, t.windowOffsetLeft = -1 * (t.zoomWindow.width() + 2 * t.options.borderSize);
                    break;
                case 12:
                    t.windowOffsetTop = -1 * (t.zoomWindow.height() + 2 * t.options.borderSize), t.windowOffsetLeft = -1 * (t.zoomWindow.width() + 2 * t.options.borderSize);
                    break;
                case 13:
                    t.windowOffsetTop = -1 * (t.zoomWindow.height() + 2 * t.options.borderSize), t.windowOffsetLeft = 0;
                    break;
                case 14:
                    t.options.zoomWindowHeight > t.nzHeight && (t.windowOffsetTop = -1 * (t.zoomWindow.height() + 2 * t.options.borderSize), t.windowOffsetLeft = -1 * (t.options.zoomWindowWidth / 2 - t.nzWidth / 2 + 2 * t.options.borderSize));
                    break;
                case 15:
                    t.windowOffsetTop = -1 * (t.zoomWindow.height() + 2 * t.options.borderSize), t.windowOffsetLeft = t.nzWidth - t.zoomWindow.width() - 2 * t.options.borderSize;
                    break;
                case 16:
                    t.windowOffsetTop = -1 * (t.zoomWindow.height() + 2 * t.options.borderSize), t.windowOffsetLeft = t.nzWidth;
                    break;
                default:
                    t.windowOffsetTop = t.options.zoomWindowOffety, t.windowOffsetLeft = t.nzWidth
                }
                t.isWindowSet = !0, t.windowOffsetTop += t.options.zoomWindowOffety, t.windowOffsetLeft += t.options.zoomWindowOffetx, t.zoomWindow.css({
                    top: t.windowOffsetTop
                }), t.zoomWindow.css({
                    left: t.windowOffsetLeft
                }), "inner" == t.options.zoomType && (t.zoomWindow.css({
                    top: 0
                }), t.zoomWindow.css({
                    left: 0
                })), t.windowLeftPos = String(-1 * ((i.pageX - t.nzOffset.left) * t.widthRatio - t.zoomWindow.width() / 2)), t.windowTopPos = String(-1 * ((i.pageY - t.nzOffset.top) * t.heightRatio - t.zoomWindow.height() / 2)), t.Etoppos && (t.windowTopPos = 0), t.Eloppos && (t.windowLeftPos = 0), t.Eboppos && (t.windowTopPos = -1 * (t.largeHeight / t.currentZoomLevel - t.zoomWindow.height())), t.Eroppos && (t.windowLeftPos = -1 * (t.largeWidth / t.currentZoomLevel - t.zoomWindow.width())), t.fullheight && (t.windowTopPos = 0), t.fullwidth && (t.windowLeftPos = 0), "window" != t.options.zoomType && "inner" != t.options.zoomType || (1 == t.zoomLock && (1 >= t.widthRatio && (t.windowLeftPos = 0), 1 >= t.heightRatio && (t.windowTopPos = 0)), t.largeHeight < t.options.zoomWindowHeight && (t.windowTopPos = 0), t.largeWidth < t.options.zoomWindowWidth && (t.windowLeftPos = 0), t.options.easing ? (t.xp || (t.xp = 0), t.yp || (t.yp = 0), t.loop || (t.loop = setInterval(function () {
                    t.xp += (t.windowLeftPos - t.xp) / t.options.easingAmount, t.yp += (t.windowTopPos - t.yp) / t.options.easingAmount, t.scrollingLock ? (clearInterval(t.loop), t.xp = t.windowLeftPos, t.yp = t.windowTopPos, t.xp = -1 * ((i.pageX - t.nzOffset.left) * t.widthRatio - t.zoomWindow.width() / 2), t.yp = -1 * ((i.pageY - t.nzOffset.top) * t.heightRatio - t.zoomWindow.height() / 2), t.changeBgSize && (t.nzHeight > t.nzWidth ? ("lens" == t.options.zoomType && t.zoomLens.css({
                        "background-size": t.largeWidth / t.newvalueheight + "px " + t.largeHeight / t.newvalueheight + "px"
                    }), t.zoomWindow.css({
                        "background-size": t.largeWidth / t.newvalueheight + "px " + t.largeHeight / t.newvalueheight + "px"
                    })) : ("lens" != t.options.zoomType && t.zoomLens.css({
                        "background-size": t.largeWidth / t.newvaluewidth + "px " + t.largeHeight / t.newvalueheight + "px"
                    }), t.zoomWindow.css({
                        "background-size": t.largeWidth / t.newvaluewidth + "px " + t.largeHeight / t.newvaluewidth + "px"
                    })), t.changeBgSize = !1), t.zoomWindow.css({
                        backgroundPosition: t.windowLeftPos + "px " + t.windowTopPos + "px"
                    }), t.scrollingLock = !1, t.loop = !1) : (t.changeBgSize && (t.nzHeight > t.nzWidth ? ("lens" == t.options.zoomType && t.zoomLens.css({
                        "background-size": t.largeWidth / t.newvalueheight + "px " + t.largeHeight / t.newvalueheight + "px"
                    }), t.zoomWindow.css({
                        "background-size": t.largeWidth / t.newvalueheight + "px " + t.largeHeight / t.newvalueheight + "px"
                    })) : ("lens" != t.options.zoomType && t.zoomLens.css({
                        "background-size": t.largeWidth / t.newvaluewidth + "px " + t.largeHeight / t.newvaluewidth + "px"
                    }), t.zoomWindow.css({
                        "background-size": t.largeWidth / t.newvaluewidth + "px " + t.largeHeight / t.newvaluewidth + "px"
                    })), t.changeBgSize = !1), t.zoomWindow.css({
                        backgroundPosition: t.xp + "px " + t.yp + "px"
                    }))
                }, 16))) : (t.changeBgSize && (t.nzHeight > t.nzWidth ? ("lens" == t.options.zoomType && t.zoomLens.css({
                    "background-size": t.largeWidth / t.newvalueheight + "px " + t.largeHeight / t.newvalueheight + "px"
                }), t.zoomWindow.css({
                    "background-size": t.largeWidth / t.newvalueheight + "px " + t.largeHeight / t.newvalueheight + "px"
                })) : ("lens" == t.options.zoomType && t.zoomLens.css({
                    "background-size": t.largeWidth / t.newvaluewidth + "px " + t.largeHeight / t.newvaluewidth + "px"
                }), t.largeHeight / t.newvaluewidth < t.options.zoomWindowHeight ? t.zoomWindow.css({
                    "background-size": t.largeWidth / t.newvaluewidth + "px " + t.largeHeight / t.newvaluewidth + "px"
                }) : t.zoomWindow.css({
                    "background-size": t.largeWidth / t.newvalueheight + "px " + t.largeHeight / t.newvalueheight + "px"
                })), t.changeBgSize = !1), t.zoomWindow.css({
                    backgroundPosition: t.windowLeftPos + "px " + t.windowTopPos + "px"
                })))
            },
            setTintPosition: function (o) {
                this.nzOffset = this.$elem.offset(), this.tintpos = String(-1 * (o.pageX - this.nzOffset.left - this.zoomLens.width() / 2)), this.tintposy = String(-1 * (o.pageY - this.nzOffset.top - this.zoomLens.height() / 2)), this.Etoppos && (this.tintposy = 0), this.Eloppos && (this.tintpos = 0), this.Eboppos && (this.tintposy = -1 * (this.nzHeight - this.zoomLens.height() - 2 * this.options.lensBorderSize)), this.Eroppos && (this.tintpos = -1 * (this.nzWidth - this.zoomLens.width() - 2 * this.options.lensBorderSize)), this.options.tint && (this.fullheight && (this.tintposy = 0), this.fullwidth && (this.tintpos = 0), this.zoomTintImage.css({
                    left: this.tintpos + "px"
                }), this.zoomTintImage.css({
                    top: this.tintposy + "px"
                }))
            },
            swaptheimage: function (i, t) {
                var e = this,
                    n = new Image;
                e.options.loadingIcon && (e.spinner = o("<div style=\"background: url('" + e.options.loadingIcon + "') no-repeat center;height:" + e.nzHeight + "px;width:" + e.nzWidth + 'px;z-index: 2000;position: absolute; background-position: center center;"></div>'), e.$elem.after(e.spinner)), e.options.onImageSwap(e.$elem), n.onload = function () {
                    e.largeWidth = n.width, e.largeHeight = n.height, e.zoomImage = t, e.zoomWindow.css({
                        "background-size": e.largeWidth + "px " + e.largeHeight + "px"
                    }), e.zoomWindow.css({
                        "background-size": e.largeWidth + "px " + e.largeHeight + "px"
                    }), e.swapAction(i, t)
                }, n.src = t
            },
            swapAction: function (i, t) {
                var e = this,
                    n = new Image;
                if (n.onload = function () {
                        e.nzHeight = n.height, e.nzWidth = n.width, e.options.onImageSwapComplete(e.$elem), e.doneCallback()
                    }, n.src = i, e.currentZoomLevel = e.options.zoomLevel, e.options.maxZoomLevel = !1, "lens" == e.options.zoomType && e.zoomLens.css({
                        backgroundImage: "url('" + t + "')"
                    }), "window" == e.options.zoomType && e.zoomWindow.css({
                        backgroundImage: "url('" + t + "')"
                    }), "inner" == e.options.zoomType && e.zoomWindow.css({
                        backgroundImage: "url('" + t + "')"
                    }), e.currentImage = t, e.options.imageCrossfade) {
                    var s = e.$elem,
                        h = s.clone();
                    e.$elem.attr("src", i), e.$elem.after(h), h.stop(!0).fadeOut(e.options.imageCrossfade, function () {
                        o(this).remove()
                    }), e.$elem.width("auto").removeAttr("width"), e.$elem.height("auto").removeAttr("height"), s.fadeIn(e.options.imageCrossfade), e.options.tint && "inner" != e.options.zoomType && (s = e.zoomTintImage, h = s.clone(), e.zoomTintImage.attr("src", t), e.zoomTintImage.after(h), h.stop(!0).fadeOut(e.options.imageCrossfade, function () {
                        o(this).remove()
                    }), s.fadeIn(e.options.imageCrossfade), e.zoomTint.css({
                        height: e.$elem.height()
                    }), e.zoomTint.css({
                        width: e.$elem.width()
                    })), e.zoomContainer.css("height", e.$elem.height()), e.zoomContainer.css("width", e.$elem.width()), "inner" != e.options.zoomType || e.options.constrainType || (e.zoomWrap.parent().css("height", e.$elem.height()), e.zoomWrap.parent().css("width", e.$elem.width()), e.zoomWindow.css("height", e.$elem.height()), e.zoomWindow.css("width", e.$elem.width()))
                } else e.$elem.attr("src", i), e.options.tint && (e.zoomTintImage.attr("src", t), e.zoomTintImage.attr("height", e.$elem.height()), e.zoomTintImage.css({
                    height: e.$elem.height()
                }), e.zoomTint.css({
                    height: e.$elem.height()
                })), e.zoomContainer.css("height", e.$elem.height()), e.zoomContainer.css("width", e.$elem.width());
                e.options.imageCrossfade && (e.zoomWrap.css("height", e.$elem.height()), e.zoomWrap.css("width", e.$elem.width())), e.options.constrainType && ("height" == e.options.constrainType && (e.zoomContainer.css("height", e.options.constrainSize), e.zoomContainer.css("width", "auto"), e.options.imageCrossfade ? (e.zoomWrap.css("height", e.options.constrainSize), e.zoomWrap.css("width", "auto"), e.constwidth = e.zoomWrap.width()) : (e.$elem.css("height", e.options.constrainSize), e.$elem.css("width", "auto"), e.constwidth = e.$elem.width()), "inner" == e.options.zoomType && (e.zoomWrap.parent().css("height", e.options.constrainSize), e.zoomWrap.parent().css("width", e.constwidth), e.zoomWindow.css("height", e.options.constrainSize), e.zoomWindow.css("width", e.constwidth)), e.options.tint && (e.tintContainer.css("height", e.options.constrainSize), e.tintContainer.css("width", e.constwidth), e.zoomTint.css("height", e.options.constrainSize), e.zoomTint.css("width", e.constwidth), e.zoomTintImage.css("height", e.options.constrainSize), e.zoomTintImage.css("width", e.constwidth))), "width" == e.options.constrainType && (e.zoomContainer.css("height", "auto"), e.zoomContainer.css("width", e.options.constrainSize), e.options.imageCrossfade ? (e.zoomWrap.css("height", "auto"), e.zoomWrap.css("width", e.options.constrainSize), e.constheight = e.zoomWrap.height()) : (e.$elem.css("height", "auto"), e.$elem.css("width", e.options.constrainSize), e.constheight = e.$elem.height()), "inner" == e.options.zoomType && (e.zoomWrap.parent().css("height", e.constheight), e.zoomWrap.parent().css("width", e.options.constrainSize), e.zoomWindow.css("height", e.constheight), e.zoomWindow.css("width", e.options.constrainSize)), e.options.tint && (e.tintContainer.css("height", e.constheight), e.tintContainer.css("width", e.options.constrainSize), e.zoomTint.css("height", e.constheight), e.zoomTint.css("width", e.options.constrainSize), e.zoomTintImage.css("height", e.constheight), e.zoomTintImage.css("width", e.options.constrainSize))))
            },
            doneCallback: function () {
                this.options.loadingIcon && this.spinner.hide(), this.nzOffset = this.$elem.offset(), this.nzWidth = this.$elem.width(), this.nzHeight = this.$elem.height(), this.currentZoomLevel = this.options.zoomLevel, this.widthRatio = this.largeWidth / this.nzWidth, this.heightRatio = this.largeHeight / this.nzHeight, "window" == this.options.zoomType && (lensHeight = this.nzHeight < this.options.zoomWindowWidth / this.widthRatio ? this.nzHeight : String(this.options.zoomWindowHeight / this.heightRatio), lensWidth = this.options.zoomWindowWidth < this.options.zoomWindowWidth ? this.nzWidth : this.options.zoomWindowWidth / this.widthRatio, this.zoomLens && (this.zoomLens.css("width", lensWidth), this.zoomLens.css("height", lensHeight)))
            },
            getCurrentImage: function () {
                return this.zoomImage
            },
            getGalleryList: function () {
                var i = this;
                return i.gallerylist = [], i.options.gallery ? o("#" + i.options.gallery + " a").each(function () {
                    var t = "";
                    o(this).data("zoom-image") ? t = o(this).data("zoom-image") : o(this).data("image") && (t = o(this).data("image")), t == i.zoomImage ? i.gallerylist.unshift({
                        href: "" + t,
                        title: o(this).find("img").attr("title")
                    }) : i.gallerylist.push({
                        href: "" + t,
                        title: o(this).find("img").attr("title")
                    })
                }) : i.gallerylist.push({
                    href: "" + i.zoomImage,
                    title: o(this).find("img").attr("title")
                }), i.gallerylist
            },
            changeZoomLevel: function (o) {
                this.scrollingLock = !0, this.newvalue = parseFloat(o).toFixed(2), newvalue = parseFloat(o).toFixed(2), maxheightnewvalue = this.largeHeight / (this.options.zoomWindowHeight / this.nzHeight * this.nzHeight), maxwidthtnewvalue = this.largeWidth / (this.options.zoomWindowWidth / this.nzWidth * this.nzWidth), "inner" != this.options.zoomType && (maxheightnewvalue <= newvalue ? (this.heightRatio = this.largeHeight / maxheightnewvalue / this.nzHeight, this.newvalueheight = maxheightnewvalue, this.fullheight = !0) : (this.heightRatio = this.largeHeight / newvalue / this.nzHeight, this.newvalueheight = newvalue, this.fullheight = !1), maxwidthtnewvalue <= newvalue ? (this.widthRatio = this.largeWidth / maxwidthtnewvalue / this.nzWidth, this.newvaluewidth = maxwidthtnewvalue, this.fullwidth = !0) : (this.widthRatio = this.largeWidth / newvalue / this.nzWidth, this.newvaluewidth = newvalue, this.fullwidth = !1), "lens" == this.options.zoomType && (maxheightnewvalue <= newvalue ? (this.fullwidth = !0, this.newvaluewidth = maxheightnewvalue) : (this.widthRatio = this.largeWidth / newvalue / this.nzWidth, this.newvaluewidth = newvalue, this.fullwidth = !1))), "inner" == this.options.zoomType && (maxheightnewvalue = parseFloat(this.largeHeight / this.nzHeight).toFixed(2), maxwidthtnewvalue = parseFloat(this.largeWidth / this.nzWidth).toFixed(2), newvalue > maxheightnewvalue && (newvalue = maxheightnewvalue), newvalue > maxwidthtnewvalue && (newvalue = maxwidthtnewvalue), maxheightnewvalue <= newvalue ? (this.heightRatio = this.largeHeight / newvalue / this.nzHeight, this.newvalueheight = newvalue > maxheightnewvalue ? maxheightnewvalue : newvalue, this.fullheight = !0) : (this.heightRatio = this.largeHeight / newvalue / this.nzHeight, this.newvalueheight = newvalue > maxheightnewvalue ? maxheightnewvalue : newvalue, this.fullheight = !1), maxwidthtnewvalue <= newvalue ? (this.widthRatio = this.largeWidth / newvalue / this.nzWidth, this.newvaluewidth = newvalue > maxwidthtnewvalue ? maxwidthtnewvalue : newvalue, this.fullwidth = !0) : (this.widthRatio = this.largeWidth / newvalue / this.nzWidth, this.newvaluewidth = newvalue, this.fullwidth = !1)), scrcontinue = !1, "inner" == this.options.zoomType && (this.nzWidth > this.nzHeight && (this.newvaluewidth <= maxwidthtnewvalue ? scrcontinue = !0 : (scrcontinue = !1, this.fullwidth = this.fullheight = !0)), this.nzHeight > this.nzWidth && (this.newvaluewidth <= maxwidthtnewvalue ? scrcontinue = !0 : (scrcontinue = !1, this.fullwidth = this.fullheight = !0))), "inner" != this.options.zoomType && (scrcontinue = !0), scrcontinue && (this.zoomLock = 0, this.changeZoom = !0, this.options.zoomWindowHeight / this.heightRatio <= this.nzHeight && (this.currentZoomLevel = this.newvalueheight, "lens" != this.options.zoomType && "inner" != this.options.zoomType && (this.changeBgSize = !0, this.zoomLens.css({
                    height: String(this.options.zoomWindowHeight / this.heightRatio) + "px"
                })), "lens" == this.options.zoomType || "inner" == this.options.zoomType) && (this.changeBgSize = !0), this.options.zoomWindowWidth / this.widthRatio <= this.nzWidth && ("inner" != this.options.zoomType && this.newvaluewidth > this.newvalueheight && (this.currentZoomLevel = this.newvaluewidth), "lens" != this.options.zoomType && "inner" != this.options.zoomType && (this.changeBgSize = !0, this.zoomLens.css({
                    width: String(this.options.zoomWindowWidth / this.widthRatio) + "px"
                })), "lens" == this.options.zoomType || "inner" == this.options.zoomType) && (this.changeBgSize = !0), "inner" == this.options.zoomType && (this.changeBgSize = !0, this.nzWidth > this.nzHeight && (this.currentZoomLevel = this.newvaluewidth), this.nzHeight > this.nzWidth && (this.currentZoomLevel = this.newvaluewidth))), this.setPosition(this.currentLoc)
            },
            closeAll: function () {
                self.zoomWindow && self.zoomWindow.hide(), self.zoomLens && self.zoomLens.hide(), self.zoomTint && self.zoomTint.hide()
            },
            changeState: function (o) {
                "enable" == o && (this.options.zoomEnabled = !0), "disable" == o && (this.options.zoomEnabled = !1)
            }
        };
        o.fn.elevateZoom = function (t) {
            return this.each(function () {
                var e = Object.create(i);
                e.init(t, this), o.data(this, "elevateZoom", e)
            })
        }, o.fn.elevateZoom.options = {
            zoomActivation: "hover",
            zoomEnabled: !0,
            preloading: 1,
            zoomLevel: 1,
            scrollZoom: !1,
            scrollZoomIncrement: .1,
            minZoomLevel: !1,
            maxZoomLevel: !1,
            easing: !1,
            easingAmount: 12,
            lensSize: 200,
            zoomWindowWidth: 400,
            zoomWindowHeight: 400,
            zoomWindowOffetx: 0,
            zoomWindowOffety: 0,
            zoomWindowPosition: 1,
            zoomWindowBgColour: "#fff",
            lensFadeIn: !1,
            lensFadeOut: !1,
            debug: !1,
            zoomWindowFadeIn: !1,
            zoomWindowFadeOut: !1,
            zoomWindowAlwaysShow: !1,
            zoomTintFadeIn: !1,
            zoomTintFadeOut: !1,
            borderSize: 4,
            showLens: !0,
            borderColour: "#888",
            lensBorderSize: 1,
            lensBorderColour: "#000",
            lensShape: "square",
            zoomType: "window",
            containLensZoom: !1,
            lensColour: "white",
            lensOpacity: .4,
            lenszoom: !1,
            tint: !1,
            tintColour: "#333",
            tintOpacity: .4,
            gallery: !1,
            galleryActiveClass: "zoomGalleryActive",
            imageCrossfade: !1,
            constrainType: !1,
            constrainSize: !1,
            loadingIcon: !1,
            cursor: "default",
            responsive: !0,
            onComplete: o.noop,
            onZoomedImageLoaded: function () {},
            onImageSwap: o.noop,
            onImageSwapComplete: o.noop
        }
    }(jQuery, window, document);
