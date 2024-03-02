import PropTypes from "prop-types";

const BlogArticleBreadcrumb = ({ breadcrumbs }) => {
  return (
    <nav aria-label="Breadcrumb" className="blogArticle__breadcrumb">
      <ol role="list" className="flex items-center">
        {breadcrumbs.map((breadcrumb) => (
          <li key={breadcrumb?.id}>
            <div className="flex items-center">
              <a href={breadcrumb?.href} className="mr-2 text-sm font-medium text-gray-900">
                {breadcrumb?.name}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
};

BlogArticleBreadcrumb.propTypes = {
  breadcrumbs: PropTypes.array
}
export default BlogArticleBreadcrumb;