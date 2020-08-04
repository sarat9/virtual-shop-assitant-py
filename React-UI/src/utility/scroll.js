


export function scrollDown() {
    // window.scrollBy(0, 250);

    [...Array(20)].forEach((elem, index)=>{
        setTimeout(()=>{window.scrollBy(0, 15)}, 50*index);
    })

}

export function scrollUp() {
    // window.scrollBy(0, 250);

    [...Array(20)].forEach((elem, index)=>{
        setTimeout(()=>{window.scrollBy(0, -15)}, 50*index);
    })

}

function scrollWin() {
    window.scrollTo(500, 0);
}