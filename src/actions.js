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

export function copyImage(url) {
  var img = document.createElement('img')
  img.src = url
  document.body.appendChild(img)
  var r = document.createRange()
  r.setStartBefore(img)
  r.setEndAfter(img)
  r.selectNode(img)
  var sel = window.getSelection()
  sel.addRange(r)
  document.execCommand('Copy')
}
