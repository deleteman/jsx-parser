import * as fs from 'fs'
import { parse } from 'node-html-parser';


const JSX_STRING = /\(\s*(<.*)>\s*\)/gs
const JSX_INTERPOLATION = /\{([a-zA-Z0-9]+)\}/gs

function parseValue(v) {
    return v
}

function getAttrs(attrsStr) {
    let objAttrs = {}
    let parts = attrsStr.split(" ")
    parts.forEach( p => {
        const [name, value] = p.split("=")
        objAttrs[name] = parseValue(value)
    })
    return objAttrs
}

function translate(root) {
    if(Array.isArray(root) && root.length == 0) return
    console.log("Current root: ")
    console.log(root)
    let children = []
    if(root.childNodes.length > 0) {
        children = root.childNodes.map( child => translate(child) ).filter( c => c != null)
    }
    if(root.nodeType == 3) { //Textnodes
        if(root._rawText.trim() === "") return null
        let interpolations = JSX_INTERPOLATION.exec(root._rawText)
        if(!interpolations) {
            return `"${root._rawText}"`
        } else {
            interpolations.shift()
            interpolations.forEach( v => {
                root._rawText = root._rawText.replace(`{${v}}`, `" + ${v} + "`)
            })
            return `"${root._rawText}"`
        }
    }
    let tagName = root.rawTagName

    let opts = getAttrs(root.rawAttrs)

    return `MyLib.createElement("${tagName}", ${JSON.stringify(opts)}, ${children})`
    
}

async function parseJSXFile(fname) {
    let content = await fs.promises.readFile(fname)
    let str = content.toString()

    let matches = JSX_STRING.exec(str)
    if(matches) {
        let HTML = matches[1] + ">"
console.log("parsed html")
console.log(HTML)
        const root = parse(HTML)
        //console.log(root.firstChild)
        let translated = (translate(root.firstChild))
        str = str.replace(matches[1] + ">", translated)
        await fs.promises.writeFile("output.js", str)
    }

}

(async () => {
    await parseJSXFile("./file.jsx")
})()

