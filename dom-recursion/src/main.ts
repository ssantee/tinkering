class ElementTree {
    element: HTMLElement;
    childElements: Array<ElementTree>;
    displayString: string;

    constructor(element: HTMLElement) {
        this.element = element;
        this.displayString = element.nodeName;
        this.childElements = Array.from(element.childNodes)
            .filter((n) => n instanceof HTMLElement)
            .map((e) => new ElementTree(e));
    }
}

class TreeDisplayer {
    private character: string = "\t";
    private root: Printable;
    constructor(root: Printable, character: string) {
        this.character = character;
        this.root = root;
    }
    private print(elementName: string, depth: number) {
        const ind = this.character.repeat(depth);
        console.log(ind + elementName);
    }
    public display(e?: Printable, depth?: number) {
        depth = depth === undefined ? 0 : depth + 1;
        e = e ? e : this.root;

        this.print(e.displayString, depth);

        e.childElements &&
            e.childElements.forEach((e) => {
                this.display(e, depth);
            });
    }
}

interface Printable {
    displayString: string;
    childElements?: Array<Printable>;
}

new TreeDisplayer(new ElementTree(document.documentElement), "\t").display();

new TreeDisplayer(
    {
        displayString: "Untyped Printable!",
        childElements: [
            {
                displayString: "a child",
                childElements: [{ displayString: "2nd tier child" }],
            },
        ],
    },
    "\t"
).display();
