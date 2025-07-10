"use strict";
class ElementTree {
    constructor(element) {
        this.element = element;
        this.displayString = element.nodeName;
        this.childElements = Array.from(element.childNodes)
            .filter((n) => n instanceof HTMLElement)
            .map((e) => new ElementTree(e));
    }
}
class TreeDisplayer {
    constructor(root, character, outputMethod, printTarget) {
        this.character = "\t";
        this.character = character;
        this.root = root;
        this.outputMethod = outputMethod ? outputMethod : "console";
        this.printTarget = printTarget;
    }
    output(elementName, depth) {
        const ind = this.character.repeat(depth);
        const outS = ind + elementName;
        switch (this.outputMethod) {
            case "console":
                this.console(outS);
                break;
            case "text":
                if (this.printTarget &&
                    this.printTarget) {
                    this.printTarget.value =
                        this.printTarget.value +
                            outS +
                            "\n";
                }
                else {
                    throw new Error(`${this.outputMethod} output method requires a target`);
                }
                break;
            case "render":
                if (this.printTarget &&
                    this.printTarget) {
                    let outEl = document.createElement("div");
                    outEl.textContent = outS;
                    outEl.style.paddingLeft = (depth * 12).toString() + "px";
                    this.printTarget.appendChild(outEl);
                }
                else {
                    throw new Error(`${this.outputMethod} output method requires a target`);
                }
                break;
        }
    }
    console(s) {
        console.log(s);
    }
    display(e, depth) {
        depth = depth === undefined ? 0 : depth + 1;
        e = e ? e : this.root;
        this.output(e.displayString, depth);
        e.childElements &&
            e.childElements.forEach((e) => {
                this.display(e, depth);
            });
    }
}
new TreeDisplayer(new ElementTree(document.documentElement), "\t").display();
new TreeDisplayer({
    displayString: "Untyped Printable!",
    childElements: [
        {
            displayString: "a child",
            childElements: [{ displayString: "2nd tier child" }],
        },
    ],
}, "____").display();
let txtTarget = document.getElementById("inputTarget");
if (txtTarget != null) {
    new TreeDisplayer(new ElementTree(document.documentElement), "\t", "text", txtTarget).display();
}
let elTarget = document.getElementById("elementTarget");
if (elTarget != null) {
    new TreeDisplayer(new ElementTree(document.documentElement), "\t", "render", elTarget).display();
}
//# sourceMappingURL=main.js.map