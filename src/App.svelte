<script>
  import { flip } from 'svelte/animate'
  import { redditGroup, redditPostData } from './data/redditStore'
  import Card from './components/Card.svelte'
  import { fade, fly } from 'svelte/transition'

  let orderUps = true
  let hide = false
  let seenPosts = []

  const isEmpty = (object) => object.length === 0
  const dateOptions = {
    // weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: '2-digit',
  }

  $: showSeen = true
  $: showFavorites = true
  $: posts = $redditPostData

  function orderByUps() {
    if (orderUps) {
      posts = posts.sort((a, b) => b.ups - a.ups)
    } else {
      posts = posts.sort((a, b) => a.ups - b.ups)
    }

    orderUps = !orderUps
  }

  function orderByRecent() {
    posts = posts.sort((a, b) => b.created - a.created)
  }

  //todo: toggle change if seenPosts.length changes
  function toggleSeen() {
    seenPosts = document.querySelectorAll('.seen')

    if (showSeen) {
      seenPosts.forEach((post) => {
        posts = posts.filter((key) => key.id !== post.dataset.id)
      })
    } else {
      posts = $redditPostData
    }

    showSeen = !showSeen
    showFavorites = true
  }

  function toggleFavorites() {
    let data = localStorage.getItem('favorites')
    let favorites = data ? JSON.parse(data) : []

    if (showFavorites) {
      posts = favorites
    } else {
      posts = $redditPostData
    }

    showFavorites = !showFavorites
    showSeen = true
  }

  //
</script>

<header>
  <h1>/r/{redditGroup}</h1>

  <nav>
    <button on:click={orderByUps}> 🔼 </button>
    <button on:click={orderByRecent}> 📅 </button>
    <button on:click={toggleFavorites}>
      {!showFavorites ? '🤍' : '💖'}
    </button>
    <button disabled={!showFavorites} on:click={toggleSeen}>
      {!showSeen ? '👁' : '🙈'}
    </button>
  </nav>
</header>

<main>
  <!-- //Todo: Flip refactor: look into using gsap.Flip -->

  <!-- {#each posts as post (post.id)} -->
  {#each posts as { id, imgUrl, ups, author, title, created, msg }, dex (id)}
    <article
      class="noClass"
      animate:flip={{ duration: 500 }}
      in:fade={{ delay: dex * 70 }}
      out:fly={{ y: 200 }}
    >
      <Card
        {id}
        {imgUrl}
        {ups}
        {author}
        {title}
        {hide}
        date={new Date(created * 1000).toLocaleDateString('en-US', dateOptions)}
      />
    </article>
  {/each}

  {#if isEmpty(posts) && !showSeen}
    <!-- //todo: animate something... better loader and seenAll -->

    <div class="msg" in:fly={{ y: 30 }}>You have seen all posts</div>
  {:else if isEmpty(posts) && !showFavorites}
    <div class="msg" in:fly={{ y: 30 }}>You have no favorites saved</div>
  {:else if isEmpty(posts)}
    <div class="loading" />
  {/if}
</main>

<footer />

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
    grid-template-columns: 1fr 1fr 1fr 1fr;
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

  .loading {
    width: 75px;
    height: 75px;
    border: 8px dashed var(--clr-dark);
    border-radius: 50%;
    transform-origin: 'center center';
    grid-area: 1 / 1 / span 4 / span 4;
    place-self: center;
    animation: rotate 1.5s linear infinite;
  }

  footer {
    height: 150px;
  }

  //fixme: gsap loader animation
  @keyframes rotate {
    to {
      transform: rotate(360deg);
    }
  }

  //< end me
</style>
