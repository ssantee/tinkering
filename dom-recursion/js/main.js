"use strict";
class ElementContainer {
    constructor(element) {
        this.element = element;
        this.childNodes = element.childNodes;
        this.childElements = Array.from(element.childNodes)
            .filter((n) => n instanceof HTMLElement)
            .map((e) => new ElementContainer(e));
    }
    hasChildren() {
        return this.element.children && this.element.children.length > 0;
    }
}
class TreeLogger {
    static log(elementName, depth) {
        const ind = this.character.repeat(depth);
        console.log(ind + elementName);
    }
    static repeatString(count) {
        let o = "";
        for (let c = 0; c < count; c++) {
            o += this.character;
        }
        return o;
    }
}
TreeLogger.character = "\t";
function process(node, depth) {
    // base case is inferred from length of children
    // when 0, we won't resurse
    TreeLogger.log(node.element.nodeName, depth);
    depth = depth + 1;
    node.childElements.forEach((e, i) => {
        process(e, depth);
    });
}
process(new ElementContainer(document.documentElement), 0);
//# sourceMappingURL=main.js.map