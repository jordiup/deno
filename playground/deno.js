const food = Deno.args[0]

const parent = Deno.args[1]

if (food === 'love') {
    console.log('🦕... Deno is born!');
}
if (food === 'hate') {
    console.log('🥚... this egg needs some love')
}

parent && console.log(`Deno's Parent: ` + parent)

setTimeout(() => {
    console.log('check')
}, 1000
)
console.table(Deno.metrics());