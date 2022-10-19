
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
    let myClass = "open"
    return (
        <div className={myClass} ref={myRef}>
            <h1>Hello {name}!</h1>
        </div>
    )
}

console.log(Component())