"use strict";
class ElementTree {
    constructor(element) {
        this.element = element;
        this.displayString = element.nodeName;
        this.childNodes = element.childNodes;
        this.childElements = Array.from(element.childNodes)
            .filter((n) => n instanceof HTMLElement)
            .map((e) => new ElementTree(e));
    }
    hasChildren() {
        return this.element.children && this.element.children.length > 0;
    }
}
class TreeDisplayer {
    constructor(root, character) {
        this.character = "\t";
        this.character = character;
        this.root = root;
    }
    print(elementName, depth) {
        const ind = this.character.repeat(depth);
        console.log(ind + elementName);
    }
    display(e, depth) {
        depth = depth === undefined ? 0 : depth + 1;
        e = e ? e : this.root;
        this.print(e.displayString, depth);
        e.childElements.forEach((e, i) => {
            this.display(e, depth);
        });
    }
}
new TreeDisplayer(new ElementTree(document.documentElement), "\t").display();
//# sourceMappingURL=main.js.map