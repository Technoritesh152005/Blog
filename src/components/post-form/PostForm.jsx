import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Select, RTE } from '../index';
import appwriteService from '../../appwrite/config';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.$id || '',
      content: post?.content || '',
      status: post?.status || 'active',
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [loading, setLoading] = useState(false);

  const submit = async (data) => {
    setLoading(true);
    try {
      let featuredimageId = post?.featuredimage || null;

      if (data.image && data.image[0]) {
        const file = await appwriteService.uploadFile(data.image[0]);
        if (!file) throw new Error("Failed to upload image");
        featuredimageId = file.$id;
      }

      if (!featuredimageId) {
        throw new Error("featuredimage is required to create a post");
      }

      let dbPost;
      if (post) {
        dbPost = await appwriteService.updatePost(post.$id, {
          title: data.title,
          slug: data.slug,
          content: data.content,
          status: data.status,
          featuredimage: featuredimageId,
        });
      } else {
        dbPost = await appwriteService.createPost({
          title: data.title,
          slug: data.slug,
          content: data.content,
          status: data.status,
          featuredimage: featuredimageId,
          userid: userData.$id,
        });
      }

      if (dbPost) navigate(`/post/${dbPost.$id}`);
    } catch (error) {
      console.error("Error submitting post:", error);
      alert(`Error submitting post: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string') {
      return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, '-').replace(/\s+/g, '-');
    }
    return '';
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') setValue('slug', slugTransform(value.title), { shouldValidate: true });
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap gap-6 bg-white p-6 rounded-xl shadow-md">
      <div className="w-full md:w-2/3">
        <Input label="Title" placeholder="Enter post title" {...register('title', { required: true })} />
        <Input
          label="Slug"
          placeholder="Auto-generated slug"
          {...register('slug', { required: true })}
          readOnly
          onInput={(e) => setValue('slug', slugTransform(e.currentTarget.value), { shouldValidate: true })}
        />
        <br></br>
        <RTE label="Description (Short Summary of Post)" name="content" control={control} defaultValue={getValues('content')} />
      </div>

      <div className="w-full md:w-1/3 flex flex-col gap-4">
        <Input
          label="Choose Image"
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register('image', { required: !post })}
        />

        {post && post.featuredimage && (
          <img
            src={appwriteService.getFilePreview(post.featuredimage)}
            alt={post.title}
            className="rounded-xl object-cover w-full h-48"
          />
        )}

        <Select
          label="Status"
          options={['active', 'inactive']}
          {...register('status', { required: true })}
        />

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? (post ? 'Updating...' : 'Submitting...') : post ? 'Update Post' : 'Submit Post'}
        </Button>
      </div>
    </form>
  );
}
