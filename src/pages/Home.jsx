import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    appwriteService
      .getPosts([])
      .then((posts) => {
        if (posts) setPosts(posts.documents);
      })
      .catch(() => setPosts([]));
  }, [authStatus]);

  if (posts.length === 0) {
    return (
      <div className="w-full py-16 bg-gray-50 min-h-screen flex items-center justify-center">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-700 mb-3">
              Login to Read Posts
            </h1>
            <p className="text-gray-500 text-lg">
              Connect with the community and see the latest posts here.
            </p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-12 bg-gray-50 min-h-screen">
      <Container>
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            📝 Your Posts
          </h2>
          <p className="text-gray-500 text-lg">
           View and Manage all your Public Post here
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </Container>
    </div>
  );
}
