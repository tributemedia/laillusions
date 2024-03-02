import * as Yup from "yup";
import FormProvider from "@/components/hook-form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import RHFTextField from "../../components/hook-form/RHFTextField";
import RHFTextAreaField from "../../components/hook-form/RHFTextAreaField";
import BlogApiService from "@/services/blog";

const CommentsForm = ({ postID }) => {
  const CommentsSchema = Yup.object().shape({
    content: Yup.string().required('Content is required'),
    author_name: Yup.string().required('Name is required'),
    author_email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  });

  const methods = useForm({
    resolver: yupResolver(CommentsSchema),
  });

  const {
    handleSubmit,
    reset,
    formState: { errors }
  } = methods;

  const onSubmit = async (data) => {
    const comment = {
      post: postID,
      ...data
    };

    try {
      return await BlogApiService.createComment(comment)
        .then((res) => {
          reset();
        });
    } catch (error) {
      console.error(error);
      return [];
    }
  }
   
  return (
    <div>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className="newComment__comment flex items-start">
          <div className="newComment__comment_img">
            c
          </div>
          <RHFTextAreaField
            className="w-full"
            placeholder="Start comment*"
            name="content"
          />
        </div>
        <div className="newComment__login flex items-start">
          <div className="login__singUp_form w-full grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3">
            <RHFTextField
              className=""
              placeholder="Email*"
              name="author_email"
              type="text"
              autoComplete="email"
            />
            <RHFTextField
              className=""
              placeholder="Name*"
              name="author_name"
              type="text"
            />
            <button type="submit" className="buttonPurple mt-2" >Submit comment</button>
          </div>
        </div>
      </FormProvider>
    </div>
  )
}

export default CommentsForm;