import { gsap } from 'gsap'

export function animate(node, { type, ...args }) {
  let method = gsap[type]
  let newAnimate = method(node, args)

  return {
    newAnimate,
    destroy() {
      console.log('do I need destroyed')
    },
  }
}

export function killTimeline(timeline) {
  const targets = timeline.getChildren()

  timeline.kill()

  for (let i = 0; i < targets.length; i++) {
    if (targets[i].targets().length) {
      gsap.set(targets[i].targets(), { clearProps: 'all' })
    }
  }
}

export function copyUrl(str) {
  var el = document.createElement('textarea')
  el.value = str
  el.setAttribute('readonly', '')
  el.style = { position: 'absolute', left: '-9999px' }
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}

export function copyImage(url) {
  const img = document.createElement('img')
  img.src = url
  document.body.appendChild(img)
  const r = document.createRange()

  r.setStartBefore(img)
  r.setEndAfter(img)
  r.selectNode(img)

  const sel = window.getSelection()
  sel.addRange(r)
  document.execCommand('Copy')
}

export function storeInLocalStorage(item, keyAndValue, overWrite) {
  let data = localStorage.getItem(item)
  data = data ? JSON.parse(data) : []

  if (overWrite && data.includes(keyAndValue)) return
  data.push(keyAndValue)
  localStorage.setItem(item, JSON.stringify(data))
}
