<script>
  import { gsap } from 'gsap'
  import { animate, killTimeline, storeInLocalStorage } from '../actions.js'

  //< props
  export let thumb
  export let title
  export let date
  export let author
  export let ups
  export let id

  const tl = gsap.timeline({})
  const loadingAnimateOptions = { type: 'from', duration: 1, autoAlpha: 0, y: 100 }

  $: dataUpsEmoji = ups > 5000 ? '🔥' : ups > 500 ? '🤣' : ups > 100 ? '😂' : '🌱'
  let isToggled
  let lastSeen = JSON.parse(localStorage.getItem('hasSeen'))
  let haveSeen = lastSeen ? lastSeen.includes(id) : false

  function cardAnimate(e) {
    if (tl.isActive()) return

    const height = e.target.height
    const clientHeight = document.body.clientHeight
    const thumbnail = e.target.closest('.thumbnail')
    const card = e.target.closest('.card')
    const caption = thumbnail.nextElementSibling
    const id = card.dataset.id

    storeInLocalStorage('hasSeen', id, true)

    if (isToggled) {
      caption.dataset.ups = dataUpsEmoji
      killTimeline(tl)
      isToggled = false
      return
    }

    tl.add('start')
      .set(card.previousElementSibling, { height: `${clientHeight}px`, display: 'block' })
      .set(card, { zIndex: 420 })
      .set(caption, { zIndex: 421 })
      .to(caption.children, { duration: 0.5, x: -360, stagger: 0.1 })
      .to(caption, { duration: 0.25, scale: 0.5, transformOrigin: '100% 0' })
      .to(
        thumbnail,
        {
          duration: 0.25,
          position: 'absolute',
          duration: 1,
          height: height,
          opacity: 1,
          cursor: 'zoom-out',
          zIndex: 420,
        },
        'start',
      )

    haveSeen = true
    isToggled = true
    caption.dataset.ups = '🔗'
  }
</script>

<div class="overlay" />
<figure class="card" use:animate={loadingAnimateOptions} data-id={id}>
  <div class="thumbnail" on:click={cardAnimate}>
    <img src={thumb} alt={title} loading="lazy" />
  </div>

  <figcaption data-ups={dataUpsEmoji}>
    <h2 class:seen={haveSeen}>{title}</h2>
    <i>{author} // {date}</i>
  </figcaption>
</figure>

<style type="text/scss">
  //< style like its 1989

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    display: none;
    background-color: var(--clr-bg);
    opacity: 0.95;
    z-index: 10;
  }

  figure {
    position: relative;
    min-height: 175px;
    margin: 0;
    display: grid;
    border-radius: 0 0 1rem 1rem;
  }

  .thumbnail {
    height: 175px;
    border-radius: 0 0 1rem 1rem;
    background: #000;
    overflow: hidden;
    opacity: 0.2;
    cursor: zoom-in;
    img {
      width: 360px;
      object-fit: cover;
    }
  }

  figcaption {
    position: absolute;
    width: 100%;
    color: var(--clr-two);
    background: transparent;
    overflow: hidden;
    pointer-events: inherit;

    &::after {
      content: attr(data-ups) '';
      position: absolute;
      right: 0;
      top: 0;
      width: 3.5rem;
      height: 3.5rem;
      display: grid;
      place-items: center;
      color: var(--clr-white);
      font-size: 1.5rem;
      background-color: var(--clr-two-dark);
      border-radius: 2rem 0 2rem 0;
      // cursor: alias;
    }

    i {
      width: max-content;
      padding: 0.25rem 0.75rem;
      display: block;
      font-size: 0.75rem;
      color: var(--clr-grey);
      background-color: var(--clr-two-dark);
      border-radius: 0 0 2rem 0;
    }

    h2 {
      min-height: 3.5rem;
      margin: 0;
      padding: 0.5rem 6.5ch 0.5rem 0.5rem;
      font-size: 1rem;
      color: var(--clr-white);
      background-color: var(--clr-dark);
      border-radius: 0 0 2rem 0;
    }
  }

  .seen {
    color: var(--clr-two);
    background-color: var(--clr);
  }

  //< the end is near
</style>
