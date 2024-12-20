import React, { useCallback, useEffect, useState } from 'react'
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
  const[isLoading, setIsLoading] = useState(false);
  console.log(userData);
  
  
  const submit = async(data) => {
    setIsLoading(true)
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
          console.log(userData.$id);
          console.log(dbPost.$id);
          if (dbPost) {
            navigate(`/post/${dbPost.$id}/${userData.$id}`);
          }
        }
    }
    setIsLoading(false);
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
            <div className="w-100 p-2 border-2 bg-[#eae1be] border-[#dcca95] shadow-inner rounded">
              <Input label="Topic Name: "  placeholder="Topic Name" className=" w-full p-2 placeholder-[#966a38] bg-[#eae1be] border-none outline-none" {...register("topic", { required: true })} />
              <Input label="Title: "  placeholder="Title" className=" w-full p-2 placeholder-[#966a38] bg-[#eae1be]  border-none outline-none" {...register("title", { required: true })} />
              <Input label="Slug: " placeholder="Slug" className=" w-full p-2 placeholder-[#966a38] bg-[#eae1be]  border-none outline-none" {...register("slug", { required: true })}
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
                <Button type="submit" bgColor={post ? "bg-green-500" : "bg-[#f5f1df] border-[#dcca95] text-[#966a38] hover:bg-[#c29a4d] hover:text-[#f5f1df] "} className="w-full mt-4 font-bold cursor-pointer">
                    {post ? "Update Your Post" : "Submit Your Post"} {isLoading && <Loading />}
                </Button>
            </div>
        </form>
  )
}

const Loading = () => {
  return (
      <svg aria-hidden="true" className="inline w-16 h-8 text-gray-100 animate-spin dark:text-gray-600 fill-[#966a38]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
       </svg>
  )
}

export default PostFrom