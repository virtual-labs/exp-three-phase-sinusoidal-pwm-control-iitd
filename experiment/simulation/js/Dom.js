// global for document object
const get = (query) => {
  return document.querySelector(query);
};

const getAll = (query) => {
  return document.querySelectorAll(query);
};

class Dom {
  constructor(selector) {
    this.item = null;
    if (selector[0] == "." || selector[0] == "#") {
      this.item = get(selector);
    } else if (selector instanceof HTMLElement) {
      this.item = selector;
    } else {
      this.item = src.get(selector);
    }
    this.selector = selector;
    // push
  }
  getValue() {
    return this.item.attributes["value"].value;
  }
  setValue(val) {
    this.item.attributes["value"].value = val;
  }
  hidden(isHidden) {
    if (isHidden == false) this.item.style.visibility = "visible";
    else this.item.style.visibility = "hidden";
  }
  setContent(text) {
    this.item.innerHTML = text;
    return this;
  }
  zIndex(idx) {
    this.item.style.zIndex = idx;
    return this;
  }
  opacity(val = 1) {
    this.item.style.opacity = val;
    return this;
  }
  rotate(deg) {
    this.item.style.transform = `rotate(${deg}deg)`;
    return this;
  }
  addClass(className) {
    this.item.classList.add(className);
    return this;
  }
  removeClass(className) {
    this.item.classList.remove(className);
    return this;
  }
  borderRadius(amount) {
    amount += "px";
    this.styles({
      borderRadius: amount,
    });
  }
  scale(val = 1) {
    this.item.style.scale = val;
    return this;
  }
  get() {
    return this.item;
  }
  left(leftPixel) {
    this.item.left = leftPixel + "px";
    return this;
  }
  set(
    left = null,
    top = null,
    height = null,
    width = null,
    bottom = null,
    right = null,
    disp = "block"
  ) {
    // coordinates
    this.left = left;
    this.top = top;
    this.bottom = bottom;
    this.right = right;
    this.height = height;
    this.width = width;
    this.item.style.opacity = 1;
    this.item.style.transform = "translateX(0) translateY(0)";

    if (this.left !== null) this.item.style.left = String(this.left) + "px";
    if (this.top !== null) this.item.style.top = String(this.top) + "px";
    if (this.bottom !== null)
      this.item.style.bottom = String(this.bottom) + "px";
    if (this.right !== null) this.item.style.right = String(this.right) + "px";
    if (this.height !== null)
      this.item.style.height = String(this.height) + "px";
    if (this.width !== null) this.item.style.width = String(this.width) + "px";
    this.show(disp);
    return this;
  }
  show(disp = "block") {
    //! push for every element
    this.push();

    this.item.style.display = disp;
    // this.opacity();
    return this;
  }
  hide() {
    this.item.style.display = "none";
    return this;
  }
  play(speed = 1) {
    this.item.play();
    this.item.playbackRate = speed;
    return this;
  }
  // for setting styles
  styles(props) {
    for (let property in props) {
      this.item.style[property] = props[property];
    }
    return this;
  }
  // * static elements/objects of anime
  static arrayOfAnimes = [];
  static arrayOfItems = [];
  static animePush(animeObj) {
    Dom.arrayOfAnimes.push(animeObj);
  }
  static resetAnimeItems() {
    Dom.arrayOfAnimes = [];
  }
  static hideAll() {
    //to empty the setCC
    setCC("");
    // to delete all content of content adder menu
    Scenes.items.contentAdderBox.setContent("");
    for (let i of Dom.arrayOfItems) {
      i.hide();
      i.opacity();
    }
    // * reset animes
    for (let i of Dom.arrayOfAnimes) {
      // to reset each anime after back btn pressed
      i.reset();
    }
    Dom.resetItems();
  }
  static resetItems() {
    Dom.arrayOfItems = [];
  }
  onClick(callback=null){
    if(callback==null){
      this.item.onclick = ()=>{}
    }else{
      this.item.onclick = callback
    }
    return this
  }
  static maskClick(
    mask,
    onClick,
    leftAndDevMode = false,
    top = 0,
    height = 100,
    width = 100,
    rotate = 0
  ) {
    let maskImg = mask;
    // default px
    let leftPx = typeof leftAndDevMode === "boolean" ? 0 : leftAndDevMode;
    maskImg.set(leftPx, top, height, width).rotate(rotate).zIndex(1000);
    maskImg.styles({ cursor: "pointer" }).onClick(() => {
      maskImg.styles({ cursor: "unset" });
      maskImg.zIndex(0);
      Dom.setBlinkArrowRed(-1)
      maskImg.onClick(); // it will null
      if (onClick) {
        onClick();
      }
    });

    if (leftAndDevMode === true) {
      maskImg.styles({background: "red"})
    }
    return maskImg;
  }
  static setBlinkArrowOnElement(
    connectingElement,
    direction,
    arrowLeft = null,
    arrowTop = null
  ) {
    let blinkArrow = new Dom(".blinkArrowRed");
    let arrowHeight = 30;
    let arrowWidth = 38.25;
    let arrowRotate = 0;
    let gap = 6

    // get left top height and width of the connectingElement
    const connectingElementProps = {
      left: connectingElement.item.offsetLeft,
      top: connectingElement.item.offsetTop,
      right: Number(
        connectingElement.item.offsetLeft + connectingElement.item.offsetWidth
      ),
      bottom: Number(
        connectingElement.item.offsetTop + connectingElement.item.offsetHeight
      ),
      centerX: Number(
        connectingElement.item.offsetLeft +
          connectingElement.item.offsetWidth / 2
      ).toFixed(2),
      centerY: Number(
        connectingElement.item.offsetTop +
          connectingElement.item.offsetHeight / 2
      ).toFixed(2),
    };

    // for(let key in  connectingElementProps) {
    //   console.log(connectingElement.item)
    //   console.log(`${key}: ${connectingElementProps[key]}`)
    // }

    switch (direction) {
      case "left":
        arrowRotate = 90;
        arrowLeft = connectingElementProps.left -  arrowWidth - gap;
        arrowTop = connectingElementProps.centerY - arrowHeight / 2;
        break;

      case "right":
        arrowRotate = -90;
        arrowLeft = connectingElementProps.right + gap;
        arrowTop = connectingElementProps.centerY - arrowHeight / 2;
        break;

      case "top":
        arrowRotate = -180;
        arrowLeft = connectingElementProps.centerX - arrowWidth / 2;
        arrowTop = connectingElementProps.top - arrowHeight - gap
        break;

      case "bottom":
        arrowRotate = 0;
        arrowLeft = connectingElementProps.centerX - arrowWidth / 2;
        arrowTop = connectingElementProps.bottom + gap;
        break;
    }

    blinkArrow.set(arrowLeft, arrowTop, arrowHeight, arrowWidth).rotate(arrowRotate + 90).zIndex(10000);
    let y = 20;

    var blink = anime({
      targets: blinkArrow.item,
      easing: "easeInOutQuad",
      opacity: 1,
      translateX: y,
      direction: "alternate",
      loop: true,
      autoplay: false,
      duration: 300,
    });
    return {
      reset() {
        blinkArrow.hide();
        blink.reset();
      },
      play() {
        blink.play();
      },
    };
  }
  static setBlinkArrowRed(
    isX = true,
    left = null,
    top = null,
    height = 30,
    width = null,
    rotate = 0
  ) {
    let blinkArrow = new Dom(".blinkArrowRed")
      .set(left, top, height, width)
      .rotate(rotate)
      .zIndex(10000);
    if (isX === -1) {
      blinkArrow.hide();
      return;
    }
    let x = 0,
      y = 0;
    if (isX) {
      x = 20;
    } else {
      y = 20;
    }
    var blink = anime({
      targets: blinkArrow.item,
      easing: "easeInOutQuad",
      opacity: 1,
      translateX: x,
      translateY: y,
      direction: "alternate",
      loop: true,
      autoplay: false,
      duration: 300,
    });

    return blink;
  }
  static setBlinkArrow(
    isX = true,
    left = null,
    top = null,
    height = 60,
    width = 60,
    rotate = 0
  ) {
    // because we added the blinkArrow image out of the anime-main
    top += 130;
    let blinkArrow = new Dom(".blinkArrow")
      .set(left, top, height, width)
      .rotate(rotate)
      .zIndex(10000);
    if (isX === -1) {
      blinkArrow.hide();
      return;
    }
    let x = 0,
      y = 0;
    if (isX) {
      x = 20;
    } else {
      y = 20;
    }
    var blink = anime({
      targets: blinkArrow.item,
      easing: "easeInOutQuad",
      opacity: 1,
      translateX: x,
      translateY: y,
      direction: "alternate",
      loop: true,
      autoplay: false,
      duration: 300,
    });

    return blink;
  }
  push() {
    if (this.selector != ".anime-header") Dom.arrayOfItems.push(this);
    return this;
  }
  forMathematicalExpressionBtn = 0;
}
