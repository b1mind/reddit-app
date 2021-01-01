<script>
  import { redditGroup, redditPostData } from './data/redditStore'
  import Card from './components/Card.svelte'
  import { afterUpdate, onMount } from 'svelte'

  /* function overlay(e) {
    const card = e.target.closest('.thumbnail')
    if (!card) return
    const overlay = document.querySelector('.overlay')
    console.dir(overlay)
    overlay.style.height = `${document.body.clientHeight}px`
    overlay.style.display = overlay.style.display === 'block' ? 'none' : 'block'
  } */

  let showSeen = false
  $: posts = $redditPostData

  function compare(a, b) {
    if (a.upVotes < b.upVotes) return -1
    if (a.upVotes > b.upVotes) return 1
    return 0
  }

  function orderByUps() {
    posts = posts.sort(compare)
  }

  function toggleSeen() {
    const seenPosts = document.querySelectorAll('.seen')

    if (showSeen) {
      seenPosts.forEach((p) => {
        const card = p.closest('.card')
        card.style = ''
      })

      showSeen = false
    } else {
      seenPosts.forEach((p) => {
        const card = p.closest('.card')
        card.style.display = 'none'
      })

      showSeen = true
    }
  }

  //
</script>

<header>
  <h1>/r/{redditGroup}</h1>
</header>

<button on:click={toggleSeen}>{showSeen ? 'showSeen' : 'hideSeen'}</button>
<button on:click={orderByUps}>upVotes</button>

<main>
  {#each posts as post}
    <Card
      id={post.id}
      thumb={post.img}
      ups={post.upVotes}
      author={post.author}
      title={post.title}
      date={post.created} />
  {/each}
</main>

<style lang="scss">
  //< style more

  $max: 1200px;

  header {
    max-width: $max;
    margin: 1rem auto;
    padding: 0.5rem 1rem;
    h1 {
      font-size: 1.5rem;
    }
  }

  main {
    max-width: $max;
    margin: 10px auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 360px));
    gap: 3rem;
    place-content: center;
  }

  //< end me
</style>
