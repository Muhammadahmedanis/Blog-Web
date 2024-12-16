import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import service from '../appwrite/configuration'
import { RTE, Input, Button, Select } from './index';

function PostFrom({post}) { 
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({ 
    defaultValues: {
      topic: post?.topic || '',
      title: post?.title || '', 
      slug: post?.slug || '', 
      content: post?.content || '', 
      status: post?.status || 'active'
    }, 
  })
  const navigate = useNavigate();
  const userData = useSelector(state => state.auth.userData);
  
  const submit = async(data) => {
    if (post) {
      const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;
      if(file){
        service.deletePost(post.featuredImage);
      }
      const dbPost = await service.updatePost(post.$id, {...data, featuredImage: file ? file.$id : undefined});
      if (dbPost) {
        navigate(`/post/${dbPost.$id}/${userData.$id}`)
      } 
    }
    else{
      const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId; 
          const dbPost = await service.createPost({
            ...data,
            userId: userData?.$id,
            userName: userData?.name,
          })
          console.log(userData.$id + " ok " + dbPost.$id);
          if (dbPost) {
            navigate(`/post/${dbPost.$id}/${userData.$id}`);
          }
        }
    }
  }


  const slugTransform = useCallback((value) => {
    if (value && typeof(value) === "string") {
      return value.trim().toLowerCase().replace(/[^a-z0-9_.-]/g, '').replace(/\s+/g, '-').slice(0, 36);    
    }
    return '';
  }, [])

  useEffect(() => {
    const subscription = watch((value, {name}) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title, {shouldValidate: true}))
      }
    })

    return () => {
      subscription.unsubscribe();
    }
  }, [watch, slugTransform, setValue])

  return (
    <form onSubmit={handleSubmit(submit)} className="flex justify-center p-10 pb-8">
            <div className="w-100 p-2 border-2 bg-[rgb(235,221,183)] border-gray-300 shadow-inner rounded">
              <Input label="Topic Name: "  placeholder="Topic Name" className=" w-full p-2 placeholder-[#dc8850] bg-[rgb(235,221,183)] border-none outline-none" {...register("topic", { required: true })} />
              <Input label="Title: "  placeholder="Title" className=" w-full p-2 placeholder-[#dc8850] bg-[rgb(235,221,183)]  border-none outline-none" {...register("title", { required: true })} />
              <Input label="Slug: " placeholder="Slug" className=" w-full p-2 placeholder-[#dc8850] bg-[rgb(235,221,183)]  border-none outline-none" {...register("slug", { required: true })}
                  onInput={(e) => { setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true }) }}  
                />
                <Input label="Featured Image: " type="file" className="my-2" accept="image/png, image/jpg, image/jpeg, image/gif" {...register("image", 
                  { required: !post })} />
                  {/* for editing case below condition */}
                {post && (
                    <div className="w-full">
                        <img src={service.getFilePreview(post.featuredImage)} alt={post.title} className="rounded-lg" />
                    </div>
                )}
                <Select options={["active", "inactive"]} label="Status" className="" {...register("status", { required: true })} />
                <RTE label="Content: " name="content" control={control} defaultValue={getValues("content")} />
                <Button type="submit" bgColor={post ? "bg-green-500" : "bg-[#dc8850] text-[rgb(236,227,202)] hover:bg-[rgb(245,232,196)] hover:text-[#dc8850] "} className="w-full mt-4 font-bold cursor-pointer">
                    {post ? "Update Your Post" : "Submit Your Post"}
                </Button>
            </div>
        </form>
  )
}

export default PostFrom