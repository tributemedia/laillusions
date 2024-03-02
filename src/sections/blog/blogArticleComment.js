import Image from 'next/image';
import CommentsForm from "@/sections/blog/CommentsForm";
import parse from 'html-react-parser';

export default function BlogArticleComment({ comments, post }) {
  return (
    <div className={`blogComment`}>
      <div className="container ">
        {comments.map((item) => (
          <div key={item.id} className="userComment flex items-center justify-start">
            <div className="userComment__img">
              <Image
                className=""
                src={item.avatar}
                alt="img"
                width={160}
                height={160}
              />
            </div>
            <div className="userComment__info">
              <div className="userComment__info_name">{item.name}</div>
              <div className="userComment__info_text">{item?.content && parse(item.content)}</div>
            </div>
          </div>
        ))}
        <div className="newComment">
          <div className="newComment__header flex items-baseline">
            <div className="newComment__header_title">Comments</div>
            {/*<div className="newComment__header_showAll">show all <span>{comments?.length}</span></div>*/}
          </div>
          
          <CommentsForm postID={post?.id} />
         
          {/*<div className="newComment__login flex items-start">*/}
            {/*<div className="login__social">*/}
            {/*  <div className="newComment__login_title">Login with</div>*/}
            {/*  <div className="login__social_items flex gap-4">*/}
            {/*    <a href="#" className="item">*/}
            {/*      <Image*/}
            {/*        src="/assets/svg/FacebookColor.svg"*/}
            {/*        alt="img"*/}
            {/*        width={32}*/}
            {/*        height={32}*/}
            {/*      />*/}
            {/*    </a>*/}
            {/*    <a href="#" className="item">*/}
            {/*      <Image*/}
            {/*        src="/assets/svg/TwitterColor.svg"*/}
            {/*        alt="img"*/}
            {/*        width={40}*/}
            {/*        height={32}*/}
            {/*      />*/}
            {/*    </a>*/}
            {/*    <a href="#" className="item">*/}
            {/*      <Image*/}
            {/*        src="/assets/svg/InstagramColor.svg"*/}
            {/*        alt="img"*/}
            {/*        width={32}*/}
            {/*        height={32}*/}
            {/*      />*/}
            {/*    </a>*/}
            {/*    <a href="#" className="item">*/}
            {/*      <Image*/}
            {/*        src="/assets/svg/TikTokColor.svg"*/}
            {/*        alt="img"*/}
            {/*        width={32}*/}
            {/*        height={32}*/}
            {/*      />*/}
            {/*    </a>*/}
            {/*  </div>*/}
            {/*</div>*/}
          {/*  <div className="login__singUp w-full">*/}
          {/*    <div className="newComment__login_title">or Sing Up</div>*/}
          {/*    <form action="#" method="" className="login__singUp_form w-full grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">*/}
          {/*      <input*/}
          {/*        placeholder="Name"*/}
          {/*        type="text"*/}
          {/*        name="name"*/}
          {/*        id="name"*/}
          {/*        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"*/}
          {/*      />*/}
          {/*      <input*/}
          {/*        placeholder="Password"*/}
          {/*        type="password"*/}
          {/*        name="password"*/}
          {/*        id="password"*/}
          {/*        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"*/}
          {/*      />*/}
          {/*    </form>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  )
}