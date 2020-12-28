<script>
  import { gsap } from 'gsap'
  import { animate, killTimeline } from '../anime.js'

  export let thumb
  export let title
  export let date
  export let author
  export let ups
  let isToggled
  const tl = gsap.timeline({})

  function cardAnimate(e) {
    const height = e.target.height
    const thumbnail = e.target.closest('.thumbnail')
    const caption = thumbnail.nextElementSibling

    if (tl.isActive()) return

    if (isToggled) {
      killTimeline(tl)
      isToggled = false
      return
    }

    isToggled = true

    tl.add('start')
      .set('.overlay', { display: 'block' })
      .set(thumbnail.parentElement, { zIndex: 999 })
      .to(caption.children, { duration: 0.75, x: -360, autoAlpha: 0 }, 'start')
      .to(
        thumbnail,
        {
          duration: 0.5,
          position: 'absolute',
          duration: 1,
          height: height,
          zIndex: 420,
        },
        'start',
      )
  }
</script>

<div class="overlay" />

<figure class="card" use:animate={{ type: 'from', duration: 1, autoAlpha: 0, y: 100 }}>
  <div class="thumbnail" on:click={cardAnimate}>
    <img src={thumb} alt={title} loading="lazy" />
  </div>

  <figcaption data-ups={ups}>
    <i>{author} {date}</i>
    <h2>{title}</h2>
  </figcaption>
</figure>

<style type="text/scss">
  //< style like its 1989

  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    display: none;
    background: rgba(0, 0, 0, 0.2);
    opacity: 0.25;
    z-index: 600;
  }

  figure {
    position: relative;
    min-height: 250px;
    margin: 0;
    display: grid;
    background-color: var(--clr-white);
    border-radius: 0.25rem;
    z-index: 0;
  }

  .thumbnail {
    height: 200px;
    display: grid;
    background-color: #fff;
    border-radius: 0.25rem;
    overflow: hidden;
    cursor: pointer;

    img {
      width: 100%;
      min-width: 360px;
      object-fit: cover;
      border-radius: 0.25rem;
    }
  }

  figcaption {
    position: absolute;
    bottom: 0;
    width: 100%;
    color: var(--clr);
    overflow: hidden;

    &::after {
      content: attr(data-ups) '';
      position: absolute;
      right: 0;
      bottom: 0;
      width: 3.5rem;
      height: 3.5rem;
      display: grid;
      place-items: center;
      background-color: var(--clr-two);
      border-radius: 50%;
      z-index: 421;
    }

    i {
      width: max-content;
      padding: 0.25rem 0.75rem;
      display: block;
      font-size: 0.75rem;
      background-color: var(--clr-two);
      border-radius: 0 1rem 0 0;
    }

    h2 {
      margin: 0;
      padding: 0.5rem 2rem 0.5rem 0.5rem;
      font-size: 1rem;
      background-color: var(--clr-two-dark);
    }
  }

  //< the end is near
</style>
