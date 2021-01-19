import { readable } from 'svelte/store'

export const redditGroup = 'ProgrammerHumor'

const CORS = 'https://cors-anywhere.herokuapp.com/'
const API = `https://www.reddit.com/r/${redditGroup}/.json`

const isValidImageUrl = (url) => {
  if ((!url && typeof url !== 'string') || url.length === 0) return

  const allowedExtensions = /\.(jpe?g|png|gif)$/i
  if (url.match(allowedExtensions)) return true
}

//Todo make fetch a function to call and make derived url?
export const redditPostData = readable([], async (set) => {
  try {
    const response = await fetch(`${CORS}${API}`)
    // const response = await fetch(`${API}`)
    const results = await response.json()
    console.dir(results.data.children)

    const retrievedPosts = results.data.children.reduce((posts, { data }) => {
      if (isValidImageUrl(data.url)) {
        const post = {
          id: data.id,
          imgUrl: data.url,
          thumb: data.thumbnail,
          title: data.title,
          created: data.created,
          ups: data.ups,
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
    set(msg)
  }
})
