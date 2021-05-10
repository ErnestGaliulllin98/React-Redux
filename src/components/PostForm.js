import React from 'react'
import {connect} from 'react-redux'
import {createPost, showAlert} from '../redux/actions'
import {Alert} from './Alert'

class PostForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
    }
  }

  submitHandler = event => {
    event.preventDefault()
    const {title} = this.state

    if (!title.trim()) {
      this.props.showAlert('Пост не должен быть пустым')
      return null
    }

    const newPost = {
      title,
      id: Date.now().toString(),
    }
    this.setState({title: ''})
    this.props.createPost(newPost)
  }
  changeInputHandler = event => {
    event.persist()
    this.setState(prev => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }

  render() {
    return (
      <>
        {this.props.alert ? <Alert text={this.props.alert} /> : null}
        <form onSubmit={this.submitHandler}>
          <div className="form-group mb-3">
            <label htmlFor="title">Заголовок поста</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={this.state.title}
              name="title"
              onChange={this.changeInputHandler}
            />
          </div>
          <button className="btn btn-success" type="submit">
            Создать
          </button>
        </form>
      </>
    )
  }
}

const mapDispatchToProps = {
  createPost,
  showAlert,
}
const mapStateToProps = state => {
  return {
    alert: state.app.alert,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm)
