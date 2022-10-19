
function mapAttrName(name) {
    if(name == "className") return "class"
    return name
}

export function createElement(tag, opts, ...children) {
    return `<${tag} ${Object.keys(opts).map(oname => `${mapAttrName(oname)}="${opts[oname]}"`).join(" ")}>
     ${children.map( c => c)}
     </${tag}>
    `
}