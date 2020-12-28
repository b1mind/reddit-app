<script>
  import { redditPostData } from './data/redditStore'
  import Card from './components/Card.svelte'

  const user = 'World'
  let count = 0
</script>

<header>
  <h1>This is Svelte-Pack!</h1>
  <p>Hello {user}</p>

  <button on:click={() => count++}>
    Clicked
    {count}
    {count === 1 ? 'time' : 'times'}
  </button>
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
    position: relative;
    max-width: $max;
    margin: 10px auto;
    // padding: 1rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 360px));
    gap: 3rem;
    place-content: center;
  }

  //< end me
</style>
