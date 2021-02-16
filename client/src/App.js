import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {

  const [state, setState] = useState(
    {
      title: '',
      body: ''
    }
  );

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getBlogPosts();
  }, []);

  const getBlogPosts = () => {
    axios({
      url: '/api',
      method: 'GET'
    })
      .then((response) => {

        setPosts(() => {
          return [...response.data]
        });
        console.log('Data has been received!');
        console.log(response.data);
      })
      .catch(() => {
        alert('Error retrieving data!');
      });
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setState((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      }
    });
    console.log(state);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title: state.title,
      body: state.body
    }

    axios({
      url: '/api/save',
      method: 'POST',
      data: payload
    })
      .then(() => {
        setState({
          title: '',
          body: ''
        });
        console.log('Data has been sent to the server');
        getBlogPosts();
      })
      .catch(() => console.log('Internal server error'));
  }

  const displayBlogPost = (posts) => {
    if(!posts.length) return null;

    return posts.map((post, index) => (
      <div key={index} className="blog-post__display">
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));
  };

  return (
    <div className="app">
      <h2>Welcome to best app ever!</h2>
      <form onSubmit={e => handleSubmit(e)}>
        <div className="form-input">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={state.title}
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="form-input">
          <textarea
            name="body"
            placeholder="body"
            cols="30"
            rows="10"
            value={state.body}
            onChange={e => handleChange(e)}
          ></textarea>
        </div>
        <button>Submit</button>
      </form>
      <div className="blog-post">
        {displayBlogPost(posts)}
      </div>
    </div>
  );
}

export default App;