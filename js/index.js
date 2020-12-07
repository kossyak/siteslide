import map from './map.js'

class Page {
    constructor() {
        this.map = map
        this.arrows = {
            top: null,
            right: null,
            bottom: null,
            left: null
        }
        this.wrapper = document.querySelector('.wrapper')
        this.screen = document.querySelector('.screen')
        const page = map[this.wrapper.id] // decodeURI(window.location.pathname).toString().replace(/^.*[\\\/]/, '')
        this.render().then(() => this.setArrows(page))
    }
    setArrows(page) {
        for (const position in page.navigate) {
            const path = page.navigate[position]
            if (path) {
                this.arrows[position].classList.remove('hide')
                this.arrows[position].querySelector('.arrow-name span').innerText = this.map[path].title
                this.arrows[position].onclick = () => {
                    this.transition(path, position)
                }
            } else {
                this.arrows[position].classList.add('hide')
            }
        }
    }
    async transition(path, position) {
        const page = this.map[path]
        this.setArrows(page)
        const html = await this.loadPage(page)
        this.screen.firstElementChild.innerHTML = this.screen.lastElementChild.innerHTML
        this.screen.firstElementChild.style.display = 'block'
        this.wrapper.style.overflowY = 'hidden';
        this.screen.lastElementChild.replaceWith(html)
        const content = this.screen.lastElementChild
        this.screen.style.transform = null
        const height = this.screen.firstElementChild.clientHeight
        const width = this.screen.clientWidth
        const targets = this.screen
        const easing = 'easeOutExpo'
        const complete = () => {
            this.screen.firstElementChild.style.display = 'none'
            this.wrapper.style.overflowY = 'auto';
            this.screen.style.transform =  null
            content.style.top = 0
            content.style.left = 0
        }
        switch (position) {
            case 'top':
                content.style.top = `${-height}px`
                anime({targets, easing, translateY: `${height}px`, duration: height, complete})
                break;
            case 'right':
                content.style.left = `100vw`
                anime({targets, easing, translateX: `-100vw`, duration: width, complete})
                break;
            case 'bottom':
                content.style.top = `${height}px`
                anime({targets, easing, translateY: `${-height}px`, duration: height, complete})
                break
            case 'left':
                content.style.left = `-100vw`
                anime({targets, easing, translateX: `100vw`, duration: width, complete})
                break;
            default:
                console.log('position not found')
        }
    }
    async loadPage(page) {
        try {
            const ajax = new XMLHttpRequest();
            ajax.open("GET", `${page.path}.html`, false)
            ajax.send()
            const toNodes = doc => new DOMParser().parseFromString(doc, 'text/html').body.querySelector('.content')
            const html = toNodes(ajax.responseText.trim())
            return html
        } catch(err) {
            console.log(err)
        }
    }
    async render() {
        for (const position in this.arrows) {
            const arrow = `
                <div class="arrow arrow-${position} hide">
                    <div class="arrow-name">
                        <span></span>
                        <i class="arrow-img"></i>
                    </div>
                </div>`
            this.wrapper.insertAdjacentHTML('beforeend', arrow)
            this.arrows[position] = document.querySelector(`.arrow-${position}`)
        }
        this.screen.insertAdjacentHTML('afterbegin', '<div></div>')
    }
}
// eslint-disable-next-line no-unused-vars
const page = new Page()

