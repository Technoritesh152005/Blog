import { useEffect, useState } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from '../appwrite/config'
import { useSelector } from 'react-redux'

export default function AllPosts() {
    const [posts, setPosts] = useState([])
    const userData = useSelector((state) => state.auth.userData) // logged-in user info
useEffect(() => {
  appwriteService.getPosts([]).then((res) => {
    if (res) {
      // Only show active posts
      const activePosts = res.documents.filter(post => post.status === 'active');
      setPosts(activePosts);
    }
  })
}, [])

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap -mx-2">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 animate-mymove">
                            <PostCard 
                                {...post} 
                                canEdit={userData && post.userId === userData.$id} 
                            />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}
