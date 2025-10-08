import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const isAuthor = post && userData ? post.userid === userData.$id : false;

  const handleDelete = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) navigate("/");
      alert("Deleted Succesfully ! ")
    });
  };

  return post ? (
    <div className="py-10 bg-gray-50 min-h-screen">
      <Container>
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden p-6">
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            {post.title}
          </h1>

          {/* Image */}
          {post.featuredimage && (
            <img
              src={appwriteService.getFilePreview(post.featuredimage)}
              alt={post.title}
              className="w-full h-[400px] object-cover rounded-xl mb-6 shadow-md"
            />
          )}

          {/* Content */}
          <div
            className="prose max-w-none text-gray-800 leading-relaxed mb-6"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>

          {/* Author Controls */}
          {isAuthor && (
            <div className="flex justify-end space-x-4">
              <Button
                bgColor="bg-blue-500 hover:bg-blue-600"
                onClick={() => navigate(`/edit-post/${post.$id}`)}
              >
                Edit
              </Button>
              <Button
                bgColor="bg-red-500 hover:bg-red-600"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </Container>
    </div>
  ) : (
    <div className="text-center py-20 text-gray-500 text-lg">Loading post...</div>
  );
}
