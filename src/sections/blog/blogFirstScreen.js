import uuidv4 from "@/utils/uuidv4";


export default function BlogFirstScreen({ categories }) {
  return (
    <div className={`blogFirstScreen`}>
      <div className="container text-center">
        <div className="blogFirstScreen__title">Blog</div>
        <div className="blogFirstScreen__links">
          {categories?.map((category) => (
            <a
              key={uuidv4()}
              href="BlogFirstScreen#"
              className="blogFirstScreen__links_link active"
            >
              {category.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
