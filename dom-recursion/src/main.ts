function hasChildren(element: HTMLElement): boolean {
    return element.children && element.children.length > 0;
}

function repeatString(count: number): string {
    let o = "";
    for (let c = 0; c < count; c++) {
        o += "-";
    }
    return o;
}

function process(node: HTMLElement, depth: number) {
    // base case is inferred from length of children
    // when 0, we won't resurse
    let children = Array.from(node.childNodes).filter(
        (n) => n instanceof HTMLElement
    );

    const ind = repeatString(depth);
    console.log(ind + node.nodeName);
    depth = depth + 1;

    children.forEach((e, i) => {
        process(e, depth);
    });
}

process(document.documentElement, 0);
