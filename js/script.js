{

  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    articleAuthor: Handlebars.compile(document.querySelector('#template-article-author').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#tagCloudLink').innerHTML),
    tagAuthorLink: Handlebars.compile(document.querySelector('#tagAuthorLink').innerHTML),
  };

  const opts = {
    selectors: {
      Article: '.post',
      Title: '.post-title',
      TitleList: '.titles',
      ArticleTags: '.post-tags .list',
      ArticleAuthor: '.post-author',
      AuthorsList: '.list.authors',
    },

    tagSize: {
      CloudClassCount: 5,
      CloudClassPrefix: 'tag-size-',
    },
  };

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

  function generateTitleLinks(customSelector = '') {
    /*[DONE] remove contents of titleList */

    const titleList = document.querySelector(opts.selectors.TitleList);
    titleList.innerHTML = '';

    /* [DONE] for each article */
    let html = '';

    const articles = document.querySelectorAll(opts.selectors.Article + customSelector);
    for (let article of articles) {

      /*[DONE] get the article id */
      const articleID = article.getAttribute('id');

      /*[DONE] find the title element */
      /*[DONE] get the title from the title element */
      const articleTitle = article.querySelector(opts.selectors.Title).innerHTML;

      /*[DONE] create HTML of the link */
      //const linkHTML = '<li><a href="#' + articleID + '"><span>' + articleTitle + '</span></a></li>';
      const linkHTMLData = {
        id: articleID,
        title: articleTitle
      };
      const linkHTML = templates.articleLink(linkHTMLData);
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

  function calculateTagsParams(tags) {

    const parms = {
      max: 0,
      min: 999999
    };

    for (let tag in tags) {

      parms.max = Math.max(tags[tag], parms.max);
      parms.min = Math.min(tags[tag], parms.min);

    }

    return parms;

  }

  function calculateTagClass(count, params) {

    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (opts.tagSize.CloudClassCount - 1) + 1);

    const tagClassResult = opts.tagSize.CloudClassPrefix + classNumber;
    return tagClassResult;
  }

  function generateTags() {

    /* [NEW][DONE] create a new variable allTags with an empty Object */
    let allTags = {};

    /* [DONE] find all articles */
    const articles = document.querySelectorAll(opts.selectors.Article);

    /* [DONE] START LOOP: for every article: */
    for (let article of articles) {

      /* [DONE] find tags wrapper */
      const tagWrapper = article.querySelector(opts.selectors.ArticleTags);

      /* [DONE] make html variable with empty string */
      let html = '';

      /* [DONE] get tags from data-tags attribute */
      const dataTag = article.getAttribute('data-tags');

      /* [DONE] split tags into array */
      const tagsArray = dataTag.split(' ');

      /* [DONE] START LOOP: for each tag */
      for (let tag of tagsArray) {
        /*[DONE] generate HTML of the link */
        //const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + ', </a></li>';
        const tagData = {
          id: 'tag-' + tag,
          title: tag,
        };
        const linkHTML = templates.articleLink(tagData);
        /*[DONE] add generated code to html variable */
        html = html + linkHTML;

        /* [NEW] check if this link is NOT already in allTags */
        if (!allTags.hasOwnProperty(tag)) {
          /* [NEW] add generated code to allTags array */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
        /*[DONE] END LOOP: for each tag */
      }
      /*[DONE] insert HTML of all the links into the tags wrapper */
      tagWrapper.insertAdjacentHTML('afterbegin', html);

      /*[DONE] END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');

    /* [NEW] add html from allTags to tagList */
    //tagList.innerHTML = allTags.join(' ');
    //console.log(allTags);

    const tagsParams = calculateTagsParams(allTags);

    /* [NEW][DONE] create variable for all links HTML code*/
    //let allTagsHTML = '';
    const allTagsData = {
      tags: []
    };

    /*[NEW][DONE] START LOOP: for each tag in allTags*/
    for (let tag in allTags) {
      /*[NEW][DONE] generate code of a link add it to allTagsHTML */
      //allTagsHTML += '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a></li>';
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams),
      });
    }

    /*[NEW][DONE] add html from allTagsHTML to tagList */
    //tagList.innerHTML = allTagsHTML;
    tagList.innerHTML = templates.tagCloudLink(allTagsData);

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

    /* [NEW][DONE] create a new variable allTags with an empty Object */
    let allAuthors = {};

    /* [DONE] find all articles */
    const articles = document.querySelectorAll(opts.selectors.Article);
    const authorList = document.querySelector(opts.selectors.AuthorsList);


    for (let article of articles) {

      /*[DONE] Find post-author */
      const articleAuthor = article.querySelector(opts.selectors.ArticleAuthor);

      /* [DONE] get article data-author attribute */
      const dataAuthor = article.getAttribute('data-author');

      /* [NEW] check if this link is NOT already in allTags */
      if (!allAuthors.hasOwnProperty(dataAuthor)) {
        /* [NEW] add generated code to allTags array */
        allAuthors[dataAuthor] = 1;
      } else {
        allAuthors[dataAuthor]++;
      }

      /*[DONE] insert HTML of all the links into the ul list */
      const authorObj = {
        id: dataAuthor,
        title: dataAuthor,
      };
      const linkAuthor = templates.articleAuthor(authorObj);

      articleAuthor.insertAdjacentHTML('beforeend', linkAuthor);
    }

    const allAtuhorsData = {
      tags: [],
    };

    let linkAuthor = '';
    /*[NEW] [DONE] Generate HTML author list in sidebar*/
    for (let author in allAuthors) {

      allAtuhorsData.tags.push({
        name: author,
        count: allAuthors[author],
      });

      linkAuthor = templates.tagAuthorLink(allAtuhorsData);
      console.log(linkAuthor);
      //authorList.insertAdjacentHTML('afterbegin', linkAuthor);
    }
    authorList.insertAdjacentHTML('afterbegin', linkAuthor);

  }

  generateAuthors();

  function authorClickHandler(event) {

    /*[DONE] prevent default action for this event */
    event.preventDefault();

    /*[DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /*[DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(href);

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
