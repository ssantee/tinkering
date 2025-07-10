class ElementContainer {
    element: HTMLElement;
    childNodes: NodeListOf<ChildNode>;
    childElements: Array<ElementContainer>;

    constructor(element: HTMLElement) {
        this.element = element;
        this.childNodes = element.childNodes;
        this.childElements = Array.from(element.childNodes)
            .filter((n) => n instanceof HTMLElement)
            .map((e) => new ElementContainer(e));
    }

    hasChildren(): boolean {
        return this.element.children && this.element.children.length > 0;
    }
}

class TreeDisplayer {
    private character: string = "\t";
    private root: HTMLElement;
    constructor(root: HTMLElement, character: string) {
        this.character = character;
        this.root = root;
    }
    private print(elementName: string, depth: number) {
        const ind = this.character.repeat(depth);
        console.log(ind + elementName);
    }
    public display(e?: ElementContainer, depth?: number) {
        depth = depth === undefined ? 0 : depth + 1;
        e = e ? e : new ElementContainer(this.root);

        this.print(e.element.nodeName, depth);

        e.childElements.forEach((e, i) => {
            this.display(e, depth);
        });
    }
}

interface Printable {
    nodeName: string;
    childElements: Array<Printable>;
}

new TreeDisplayer(document.documentElement, "\t").display();
