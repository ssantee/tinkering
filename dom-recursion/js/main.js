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
    constructor(character) {
        this.character = "\t";
        this.character = character;
    }
    log(elementName, depth) {
        const ind = this.character.repeat(depth);
        console.log(ind + elementName);
    }
}
function process(node, depth, logger) {
    // base case is inferred from length of children
    // when 0, we won't resurse
    logger.log(node.element.nodeName, depth);
    depth = depth + 1;
    node.childElements.forEach((e, i) => {
        process(e, depth, logger);
    });
}
const tl = new TreeLogger("\t");
process(new ElementContainer(document.documentElement), 0, tl);
//# sourceMappingURL=main.js.map