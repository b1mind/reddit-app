import { readable } from 'svelte/store'

export const redditGroup = 'ProgrammerHumor'

const CORS = 'https://cors-anywhere.herokuapp.com/'
const API = `https://www.reddit.com/r/${redditGroup}/.json`

/* 
const API = derived(redditGroup, ($redditGroup) => {
  ;`https://www.reddit.com/r/${$redditGroup}/.json`
}) */

const isValidImageUrl = (url) => {
  if ((!url && typeof url !== 'string') || url.length === 0) return

  const allowedExtensions = /\.(jpe?g|png|gif)$/i
  if (url.match(allowedExtensions)) return true
}

export const redditPostData = readable([], async (set) => {
  try {
    // const response = await fetch(`${CORS}${API}`)
    const response = await fetch(`${API}`)
    const results = await response.json()
    console.dir(results.data.children)

    const retrievedPosts = results.data.children.reduce((posts, { data }) => {
      if (isValidImageUrl(data.thumbnail)) {
        const post = {
          id: data.id,
          img: data.url,
          thumb: data.thumbnail,
          title: data.title,
          created: new Date(data.created * 1000).toDateString(),
          upVotes: data.ups,
          author: data.author,
        }

        posts = [post, ...posts]
      }

      return posts
    }, [])

    set(retrievedPosts)
  } catch (err) {
    const msg = '💩 something messed up'

    console.error(msg, err)
  }
})
