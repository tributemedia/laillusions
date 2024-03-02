import FacebookIcon from '../../assets/facebookIcon';
import TwitterIcon from '../../assets/twitterIcon';

export default function BlogArticleShare() {

  const shareRedirect = (socialItem) => () => {
    window.open(socialItem + encodeURIComponent(window?.location?.href), '_blank');
  };
  
  return (
    <div className="BlogArticleShare">
      <div className="container ">
        <div className="BlogArticleShare__name">Share with your friends</div>
        <div className="flex items-center justify-center BlogArticleShare__links">
          <a onClick={shareRedirect('https://www.facebook.com/sharer/sharer.php?u=')} className="BlogArticleShare__links_Facebook">
            <FacebookIcon />
          </a>
          <a onClick={shareRedirect('https://twitter.com/intent/tweet?url=')} className="BlogArticleShare__links_Twitter">
            <TwitterIcon />
          </a>
        </div>
      </div>
    </div>
  )
}