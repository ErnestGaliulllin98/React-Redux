import React from 'react'
import {connect} from 'react-redux'
import Post from './Post'

const Posts = ({syncPosts}) => {
  if (!syncPosts.length) return <div>Постов нет</div>
  return syncPosts.map((post, idx) => <Post post={post} key={idx} />)
}

const mapStateToProps = state => {
  return {
    syncPosts: state.posts.posts,
  }
}

export default connect(mapStateToProps, null)(Posts)
