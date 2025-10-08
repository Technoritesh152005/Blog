import { Link } from 'react-router-dom';
import appwriteService from '../appwrite/config';

function PostCard({ $id, title, featuredimage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
        {featuredimage && (
          <img
            src={appwriteService.getFilePreview(featuredimage)}
            alt={title}
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-4">
          <h2 className="text-lg font-bold text-gray-800 truncate">{title}</h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;


// import { useNavigate } from 'react-router'
// import appwriteService from '../appwrite/config'

// export default function PostCard({ $id, title, content, featuredImage, canEdit }) {
//     const navigate = useNavigate()

//     const handleDelete = async (id) => {
//         if (confirm("Are you sure you want to delete this post?")) {
//             try {
//                 await appwriteService.deletePost(id)
//                 alert("Post deleted successfully!")
//                 navigate(0) // reload page to refresh posts
//             } catch (err) {
//                 console.error(err)
//                 alert("Failed to delete post")
//             }
//         }
//     }

//     return (
//         <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full">
//             {/* Image */}
//             {featuredImage && (
//                 <img 
//                     src={appwriteService.getFilePreview(featuredImage)} 
//                     alt={title} 
//                     className="w-full h-48 object-cover"
//                 />
//             )}

//             {/* Content */}
//             <div className="p-4 flex flex-col flex-1">
//                 <h2 className="text-lg font-semibold mb-2">{title}</h2>
//                 <p className="text-gray-600 flex-1">{content.slice(0, 100)}...</p>

//                 {/* Edit/Delete Buttons */}
//                 {canEdit && (
//                     <div className="flex justify-end gap-2 mt-4">
//                         <button
//                             className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500 text-white"
//                             onClick={() => navigate(`/edit-post/${$id}`)}
//                         >
//                             Edit
//                         </button>
//                         <button
//                             className="px-3 py-1 bg-red-500 rounded hover:bg-red-600 text-white"
//                             onClick={() => handleDelete($id)}
//                         >
//                             Delete
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     )
// }
