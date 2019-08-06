import React, {Component} from 'react';
import Post from "../../../components/Post/Post";
import axios from "../../../axios";
import './Posts.css'
import { Route } from 'react-router-dom'
import FullPost from "../FullPost/FullPost";

/**
 * Created by Doa on 4-8-2019.
 */
class Posts extends Component {

    state = {
        posts: []
    };

    componentDidMount() {
        console.log(this.props.match)
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0, 6);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Doa'
                    }
                });
                this.setState({posts: updatedPosts});
            })
            .catch(error => {
                console.log(error)
                // this.setState({error: true});
            });
    }

    postSelectedHandler = (id) => {
        this.props.history.push({pathname: '/posts/' + id})
        // this.props.history.push('/posts/'+id)
    };

    render() {

        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    // <Link to={'/posts/' + post.id} >
                    <Post
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)}/>
                    // </Link>
                );
            });
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + '/:id'} component={FullPost}/>
                {/*<Route path='/posts/:id' component={FullPost}/>*/}
            </div>
        )
    }
}

export default Posts;