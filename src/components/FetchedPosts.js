import React from 'react'
import Post from './Post'
import {Loader} from './Loader'
import {useDispatch, useSelector} from 'react-redux'
import {fetchPosts} from '../redux/actions'

export default function FetchedPosts() {
  const dispatch = useDispatch()
  const posts = useSelector(state => state.posts.fetchPosts)
  const loading = useSelector(state => state.app.loading)

  if (loading) return <Loader />
  if (!posts.length) {
    return (
      <button
        className="btn btn-primary"
        onClick={() => dispatch(fetchPosts())}>
        Загрузить
      </button>
    )
  }

  return posts.map(post => <Post post={post} key={post.id} />)
}
