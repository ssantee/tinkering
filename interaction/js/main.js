"use strict";
class Follower {
    constructor({ el, prop, proptemplate, templateKey }) {
        this.templateKey = '{templateKey}';
        this.element = el;
        this.position = this.initPosition();
        this.prop = prop;
        this.proptemplate = proptemplate;
        if (templateKey) {
            this.templateKey = templateKey;
        }
        console.log(this.position);
    }
    initPosition() {
        let l1 = this.element;
        // center of the indicator element
        // this is where the follower will rotate around
        return { x: l1.offsetLeft + (l1.offsetWidth / 2), y: l1.offsetTop + (l1.offsetHeight / 2), rotation: 0 };
    }
    Follow(item) {
        // get the current position of the item to follow
        const mp = item.GetCurrentPosition();
        if (mp.x === 0 && mp.y === 0) {
            // if the mouse position is not set, do not rotate
            return;
        }
        // calculate the angle between the follower and the item
        // atan2 gives us the angle in radians, we convert it to degrees
        let a = Math.atan2((mp.y - this.position.y), (mp.x - this.position.x)) * 180 / Math.PI;
        // and adjust it by 90 degrees to align with the CSS rotation
        a += 90;
        this.element.style[this.prop] = this.proptemplate.replace(this.templateKey, a.toString());
    }
}
class PointerTracker {
    constructor() {
        this.pointerPosition = { x: 0, y: 0 };
        this.initHandler();
    }
    initHandler() {
        document.addEventListener('mousemove', (event) => {
            this.pointerPosition = { x: event.pageX, y: event.pageY };
        });
    }
    GetCurrentPosition() {
        return this.pointerPosition;
    }
}
//# sourceMappingURL=main.js.map