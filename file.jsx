
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
        <div className='pepe' ref={myRef}>
            <h1>Hello {name}!</h1>
        </div>
    )
}

console.log(Component())