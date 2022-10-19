
/*
crateElement(
    'div',
    {},
    createElement(
        'h1',
        {},
        "Hello World"
    )
)
*/
import * as MyLib from './MyLib.js'

export function Component() {
    let myRef = null
    let name = "Fernando"
    return (
        MyLib.createElement("div", {"className":"'pepe'","ref":"{myRef}"}, MyLib.createElement("h1", {}, "Hello " + name + "!"))
    )
}

console.log(Component())