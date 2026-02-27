export class DOMHelpers {
    static getElementById(id) {
        const el = document.getElementById(id);
        if(!el) throw new Error(`Element ${id} not found`);
        return el;
    }
    static createOption(text, value) { return new Option(text, value); }
    static createListItem(text, className = '') {
        const li = document.createElement("li");
        li.textContent = text;
        if(className) li.className = className;
        return li;
    }
    static clearElement(el) { while(el.firstChild) el.removeChild(el.firstChild); }
    static appendFragment(parent, items, createFn) {
        const frag = document.createDocumentFragment();
        items.forEach(item => frag.appendChild(createFn(item)));
        parent.appendChild(frag);
    }
}