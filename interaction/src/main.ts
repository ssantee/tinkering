type IndicatorPosition = {
    x: number;
    y: number;
    rotation: number;
}

class Follower {
    private element: Element
    private position: IndicatorPosition
    private prop: string
    private proptemplate: string
    private templateKey: string = '{templateKey}';
    constructor({ el, prop, proptemplate, templateKey }: { el: Element, prop: string, proptemplate: string, templateKey?: string }) {
        this.element = el;
        this.position = this.initPosition();
        this.prop = prop;
        this.proptemplate = proptemplate;
        if (templateKey) {
            this.templateKey = templateKey;
        }
        console.log(this.position)
    }

    private initPosition(): IndicatorPosition {
        let l1 = this.element as HTMLElement;
        // center of the indicator element
        // this is where the follower will rotate around
        return { x: l1.offsetLeft + (l1.offsetWidth / 2), y: l1.offsetTop + (l1.offsetHeight / 2), rotation: 0 }
    }

    public Follow(item: FollowTarget) {
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
        (this.element as HTMLElement).style[this.prop as any] = this.proptemplate.replace(this.templateKey, a.toString());
    }
}

type Coordinate = { x: number, y: number }

interface FollowTarget {
    GetCurrentPosition(): Coordinate
}

class PointerTracker {
    private pointerPosition: Coordinate;

    constructor() {
        this.pointerPosition = { x: 0, y: 0 };
        this.initHandler();
    }
    private initHandler() {
        document.addEventListener('mousemove', (event) => {
            this.pointerPosition = { x: event.pageX, y: event.pageY };
        });
    }
    public GetCurrentPosition(): Coordinate {
        return this.pointerPosition;
    }
}
