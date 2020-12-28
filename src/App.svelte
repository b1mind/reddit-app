<script>
  import { redditPostData } from './data/redditStore'
  import Card from './components/Card.svelte'

  /* function overlay(e) {
    const card = e.target.closest('.thumbnail')
    if (!card) return
    const overlay = document.querySelector('.overlay')
    console.dir(overlay)
    overlay.style.height = `${document.body.clientHeight}px`
    overlay.style.display = overlay.style.display === 'block' ? 'none' : 'block'
  } */
</script>

<header>
  <h1>/r/ProgrammingHumor</h1>
</header>

<main>
  {#each $redditPostData as post}
    <Card
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
