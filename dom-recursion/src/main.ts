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

type TreeOutputMethod = "console" | "text" | "render";

class TreeDisplayer {
    private character: string = "\t";
    private root: Printable;
    private outputMethod: TreeOutputMethod;
    private printTarget?: ElementPrintTarget | InputPrintTarget;
    constructor(
        root: Printable,
        character: string,
        outputMethod?: TreeOutputMethod,
        printTarget?: ElementPrintTarget | InputPrintTarget
    ) {
        this.character = character;
        this.root = root;
        this.outputMethod = outputMethod ? outputMethod : "console";
        this.printTarget = printTarget;
    }
    private output(elementName: string, depth: number) {
        const ind = this.character.repeat(depth);
        const outS = ind + elementName;

        switch (this.outputMethod) {
            case "console":
                this.console(outS);
                break;
            case "text":
                if (
                    this.printTarget &&
                    (this.printTarget as InputPrintTarget)
                ) {
                    (this.printTarget as InputPrintTarget).value =
                        (this.printTarget as InputPrintTarget).value +
                        outS +
                        "\n";
                } else {
                    throw new Error(
                        `${this.outputMethod} output method requires a target`
                    );
                }
                break;
            case "render":
                if (
                    this.printTarget &&
                    (this.printTarget as ElementPrintTarget)
                ) {
                    let outEl = document.createElement("div");
                    outEl.textContent = outS;
                    outEl.style.paddingLeft = (depth * 12).toString() + "px";
                    (this.printTarget as ElementPrintTarget).appendChild(outEl);
                } else {
                    throw new Error(
                        `${this.outputMethod} output method requires a target`
                    );
                }
                break;
        }
    }
    private console(s: string) {
        console.log(s);
    }
    public display(e?: Printable, depth?: number) {
        depth = depth === undefined ? 0 : depth + 1;
        e = e ? e : this.root;

        this.output(e.displayString, depth);

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

interface ElementPrintTarget {
    appendChild: Node["appendChild"];
}

interface InputPrintTarget {
    value: string;
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
    "____"
).display();

let txtTarget = document.getElementById("inputTarget");

if (txtTarget != null) {
    new TreeDisplayer(
        new ElementTree(document.documentElement),
        "\t",
        "text",
        txtTarget
    ).display();
}

let elTarget = document.getElementById("elementTarget");

if (elTarget != null) {
    new TreeDisplayer(
        new ElementTree(document.documentElement),
        "\t",
        "render",
        elTarget
    ).display();
}
