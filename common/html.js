const getStringInHtml = (html) => {
    const span = document.createElement('span')
    span.innerHTML = html
    return span.textContent || span.innerText
}

export {
    getStringInHtml
}