<script>
  import { flip } from 'svelte/animate'
  import { redditGroup, redditPostData } from './data/redditStore'
  import Card from './components/Card.svelte'

  let seenPosts = []
  let showSeen = false
  let hide = false
  $: posts = $redditPostData

  function orderByUps() {
    posts = posts.sort((a, b) => b.upVotes - a.upVotes)
  }

  function orderByRecent() {
    posts = posts.sort((a, b) => b.created - a.created)
  }

  //Todo refactor and think of better way maybe
  function toggleSeen() {
    seenPosts = document.querySelectorAll('.seen')

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

  <nav>
    <button on:click={orderByUps}>🔼</button>
    <button on:click={orderByRecent}>📅</button>
    <button on:click={toggleSeen}>{showSeen ? '👁' : '🙈'}</button>
  </nav>
</header>

<main>
  {#each posts as post (post.id)}
    <div animate:flip={{ duration: 550 }} class="noClass">
      <Card
        id={post.id}
        thumb={post.img}
        ups={post.upVotes}
        author={post.author}
        title={post.title}
        {hide}
        date={new Date(post.created * 1000).toDateString()} />
    </div>
  {/each}

  {#if seenPosts.length === posts.length && showSeen}
    <div class="msg">You have seen all posts</div>
  {/if}
</main>

<style lang="scss">
  //< style more

  $max: 1200px;
  $min: 780px;

  header {
    max-width: $max;
    margin: 1rem auto;
    padding: 0.5rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      font-size: 1.5rem;
    }
  }

  nav {
    padding: 0.5rem 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.25rem;
    place-content: end;
    border-radius: 1rem 0 0 0;

    @media (max-width: $min) {
      position: fixed;
      right: 0;
      bottom: 0;
      width: max-content;
      background-color: var(--clr-bg);
      z-index: 9999;
    }
  }

  button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  main {
    max-width: $max;
    margin: 10px auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 360px));
    gap: 3rem;
    place-content: center;
  }

  .msg {
    grid-area: 1 / span 4;
    font-size: 1.25rem;
    font-weight: 700;
    text-align: center;
  }

  //< end me
</style>