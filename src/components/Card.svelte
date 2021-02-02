<script>
  import { gsap } from 'gsap'
  import { killTimeline, actionLocalStorage, copyUrl, kFormatter } from '../actions.js'

  //< props
  export let imgUrl
  export let title
  export let date
  export let author
  export let ups
  export let id
  export let hide = false

  let isToggled
  let dataUpsIcon = ups > 2000 ? '🔥' : ups > 750 ? '🤣' : ups > 100 ? '😂' : '🌱'
  let btnIcon = dataUpsIcon

  $: favoriteIcon = !fav ? '🤍' : '💖'

  //todo: refactor localStorage and seen logic out of component
  let hasSeenJson = localStorage.getItem('hasSeen')
  let lastSeen = JSON.parse(hasSeenJson)
  let favoritesJson = localStorage.getItem('favorites')
  let isFavorite = JSON.parse(favoritesJson)

  let haveSeen = lastSeen ? lastSeen.includes(id) : false
  let fav = isFavorite ? favoritesJson.includes(id) : false

  //todo: make a exit animation or just kill it?
  function cardClose() {
    if (tlAnimate.isActive() || tlCopy.isActive()) return

    if (isToggled) {
      btnIcon = dataUpsIcon
      killTimeline(tlCopy)

      killTimeline(tlAnimate)
      isToggled = false
      return
    }
  }

  const tlAnimate = gsap.timeline({
    defaults: {
      duration: 0.5,
    },
  })

  function cardAnimate(e) {
    if (tlAnimate.isActive() || isToggled) return

    const { height, width = '360' } = e.target
    const clientHeight = document.body.clientHeight
    const thumbnail = e.target.closest('.thumbnail')
    const card = e.target.closest('.card')
    const caption = card.querySelector('figcaption')
    const captionChildren = caption.children
    const id = captionChildren[0].dataset.id
    const btn = captionChildren[2]

    actionLocalStorage('save', 'hasSeen', id, false)

    //> start timeline
    tlAnimate
      .add('start')
      .set(card.previousElementSibling, { height: `${clientHeight}px`, display: 'block' })
      .set(card, { zIndex: 420 })

      .to(
        [captionChildren[0], captionChildren[1]],
        { x: `-${width}px`, stagger: 0.1, ease: 'power2.in' },
        'start',
      )

      // .to(caption, { backgroundColor: 'black', height: `${height}px` }, '>')
      .to(
        btn,
        {
          scale: 0.5,
          borderRadius: '0 0 0 2rem',
          transformOrigin: '100% 0',
          cursor: 'pointer',
          ease: 'back.inOut(1.7)',
        },
        '<',
      )

      .to(
        thumbnail,
        {
          duration: (height / 30000) * 2,
          position: 'absolute',
          duration: 1,
          height: height,
          opacity: 0.9,
          cursor: 'inherit',
          ease: 'power3.out',
        },
        'start',
      )

    haveSeen = true
    isToggled = true
    btnIcon = '🔗'
  }

  const tlCopy = gsap.timeline({
    defaults: {
      duration: 0.5,
    },
  })

  function copyImgUrl(e) {
    if (!isToggled) return
    copyUrl(imgUrl)

    tlCopy
      .to(e.target.nextElementSibling, { x: -71 })
      .to(e.target, { x: -71 }, '<')
      .to(e.target, { x: 0 }, '+=0.25')
      .to(e.target.nextElementSibling, { x: 0 }, '<')
  }

  function storeFav() {
    if (fav) {
      //todo: remove fav if already favorite
      actionLocalStorage('remove', 'favorites', { id: id })
    } else {
      const orgDate = Date.parse(date) / 1000

      actionLocalStorage(
        'save',
        'favorites',
        { id, imgUrl, title, author: 'saved', created: orgDate, ups },
        false,
      )
    }

    fav = !fav
  }

  //end the fun
</script>

<div class="overlay" on:click={cardClose} />
<figure class:hide class="card">
  <div class="thumbnail" on:click={cardAnimate}>
    <img src={imgUrl} alt={title} loading="lazy" />
    <button disabled={!isToggled} class="favorite" on:click={storeFav}>
      {favoriteIcon}
    </button>
  </div>

  <figcaption data-ups={dataUpsIcon}>
    <h2 class:seen={haveSeen} data-id={id}>{title}</h2>
    <i>{author} <b> | </b> {date} <b> | </b> 👍 {kFormatter(ups)}</i>
    <button class="data-ups" on:click={copyImgUrl}>{btnIcon}</button>
    <div class="copy-text"><span>Copied</span></div>
  </figcaption>
</figure>

<style type="text/scss">
  //< style like its 1999

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    display: none;
    background-color: var(--clr-bg);
    opacity: 0.95;
    z-index: 10;
    cursor: pointer;
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

  .favorite {
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 0;
    padding: 0.5rem;
    font-size: 1.15rem;
    background-color: transparent;
    border: transparent;
    cursor: pointer;
  }

  figcaption {
    position: absolute;
    width: 100%;
    color: var(--clr-two);
    background: transparent;
    overflow: hidden;
    pointer-events: inherit;

    i {
      width: max-content;
      padding: 0.25rem 0.75rem;
      display: block;
      font-size: 0.75rem;
      color: var(--clr-grey);
      background-color: var(--clr-two-dark);
      border-radius: 0 0 2rem 0;
    }

    b {
      margin: 0 0.25ch;
      color: var(--clr-two);
      text-shadow: 0.5px 0.2px 1px grey;
    }

    h2 {
      min-height: 3.5rem;
      height: 100%;
      margin: 0;
      padding: 0.5rem 6.5ch 0.5rem 0.5rem;
      color: var(--clr-white);
      font-size: 1rem;
      line-height: 1rem;
      background-color: var(--clr-dark);
      border-radius: 0 0 2rem 0;
    }
  }

  .data-ups {
    // content: attr(data-ups) '';
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
    border-color: transparent;
    border-radius: 2rem 0 2rem 0;
    box-shadow: 1px 1px 1px 0.25px black;
    z-index: 5;
    // cursor: alias;
  }

  .copy-text {
    position: absolute;
    top: 0;
    right: -71px;
    height: max-content;
    padding-left: 30px;
    background-color: var(--clr-dark);
    border-radius: 2rem 0 0 2rem;
    span {
      width: max-content;
      padding: 0 10px;
      color: var(--clr-white);
      background-color: var(--clr-bg);
    }
  }

  .seen {
    color: var(--clr-two);
    background-color: var(--clr);
  }

  .hide {
    display: none;
  }

  //< the end is near
</style>
