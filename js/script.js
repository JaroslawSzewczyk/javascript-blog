{
  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */

    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts article.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */

    const hrefAttribute = clickedElement.getAttribute('href');

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(hrefAttribute);


    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };


  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author';

  function generateTitleLinks(customSelector = '') {

    /*[DONE] remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* [DONE] for each article */
    let html = '';

    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    for (let article of articles) {

      /*[DONE] get the article id */
      const articleID = article.getAttribute('id');

      /*[DONE] find the title element */
      /*[DONE] get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /*[DONE] create HTML of the link */
      const linkHTML = '<li><a href="#' + articleID + '"><span>' + articleTitle + '</span></a></li>';

      /*[DONE] insert link into titleList */
      html = html + linkHTML;

    }

    titleList.insertAdjacentHTML('afterbegin', html);

    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }

  generateTitleLinks();

  function generateTags() {
    /* [DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* [DONE] START LOOP: for every article: */
    for (let article of articles) {

      /* [DONE] find tags wrapper */
      const tagWrapper = article.querySelector(optArticleTagsSelector);

      /* [DONE] make html variable with empty string */
      let html = '';

      /* [DONE] get tags from data-tags attribute */
      const dataTag = article.getAttribute('data-tags');

      /* [DONE] split tags into array */
      const tagsArray = dataTag.split(' ');

      /* [DONE] START LOOP: for each tag */
      for (let tag of tagsArray) {
        /*[DONE] generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + ', </a></li>';

        /*[DONE] add generated code to html variable */
        html = html + linkHTML;

        /*[DONE] END LOOP: for each tag */
      }
      /*[DONE] insert HTML of all the links into the tags wrapper */
      tagWrapper.insertAdjacentHTML('afterbegin', html);

      /*[DONE] END LOOP: for every article: */
    }
  }

  generateTags();

  function tagClickHandler(event) {
    /*[DONE] prevent default action for this event */
    event.preventDefault();

    /*[DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /*[DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');

    /*[Done] find all tag links with class active */
    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-' + tag + '"]');

    /*[DONE] START LOOP: for each active tag link */
    for (let activeTag of activeTagLinks) {
      /*[DONE] remove class active */
      activeTag.classList.remove('active');
      /*[DONE] END LOOP: for each active tag link */
    }

    /*[DONE] find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

    /*[DONE] START LOOP: for each found tag link */
    for (let tagLink of tagLinks) {
      /*[DONE] add class active */
      tagLink.classList.add('active');
      /*[DONE] END LOOP: for each found tag link */
    }

    /*[DONE] execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags() {
    /*[DONE] find all links to tags */
    const links = document.querySelectorAll('.post-tags li a');
    /*[DONE] START LOOP: for each link */
    for (let link of links) {
      /*[DONE] add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler); // Czy tak ma być ?
      /*[DONE] END LOOP: for each link */
    }
  }

  addClickListenersToTags();

  function generateAuthors() {

    /* [DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    for (let article of articles) {

      /*[DONE] Find post-author */
      const articleAuthor = article.querySelector(optArticleAuthorSelector);

      /* [DONE] get article data-author attribute */
      const dataAuthor = article.getAttribute('data-author');

      /*[DONE] insert HTML of all the links into the ul list */
      articleAuthor.insertAdjacentHTML('beforeend', 'by <a href="' + dataAuthor + '">' + dataAuthor + '</a>');
    }

  }

  generateAuthors();

  function authorClickHandler(event) {

    /*[DONE] prevent default action for this event */
    event.preventDefault();

    /*[DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /*[DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /*[Done] find all author links with class active */
    const activeAuthorLinks = document.querySelectorAll('a.active[href^="' + href + '"]');

    /*[DONE] START LOOP: for each active author link */
    for (let activeAuthor of activeAuthorLinks) {
      /*[DONE] remove class active */
      activeAuthor.classList.remove('active');
    }

    /*[DONE] find all author links with "href" attribute equal to the "href" constant */
    const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

    /*[DONE] START LOOP: for each found author link */
    for (let authorLink of authorLinks) {
      /*[DONE] add class active */
      authorLink.classList.add('active');
    }

    /*[DONE] execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + href + '"]');

  }

  function addClickListenersToAuthors() {

    const authors = document.querySelectorAll('.post-author a');

    for (let author of authors) {
      author.addEventListener('click', authorClickHandler);
    }

  }

  addClickListenersToAuthors();

}
