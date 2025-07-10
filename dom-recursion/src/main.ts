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

class TreeLogger {
    character: string = "\t";
    constructor(character: string) {
        this.character = character;
    }
    log(elementName: string, depth: number) {
        const ind = this.character.repeat(depth);
        console.log(ind + elementName);
    }
}

function process(node: ElementContainer, depth: number, logger: TreeLogger) {
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
