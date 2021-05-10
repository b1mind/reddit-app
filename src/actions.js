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
  const el = document.createElement('textarea')
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

export function kFormatter(num) {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k'
    : Math.sign(num) * Math.abs(num)
}

export function actionLocalStorage(action, item, object, allowDupe) {
  const data = localStorage.getItem(item)
  let dataObj = data ? JSON.parse(data) : []

  switch (action) {
    case 'replace':
      localStorage.setItem(item, JSON.stringify(object))
      break

    case 'read':
      break

    case 'save':
      if (dataObj.length > 0) {
        if (!allowDupe && (data.includes(object.id) || data.includes(object))) return
      }
      dataObj = [object, ...dataObj]
      localStorage.setItem(item, JSON.stringify(dataObj))
      break

    case 'remove':
      if (dataObj.length > 0) {
        if (data.includes(object.id)) {
          dataObj = dataObj.filter((key) => key.id !== object.id)
          localStorage.setItem(item, JSON.stringify(dataObj))
        }
      }
      break
  }
}
