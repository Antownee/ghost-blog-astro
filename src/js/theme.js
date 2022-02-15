/* global hljs svg4everybody reframe GhostSearch */

'use strict';


// CONFIG

function eckoConfig(config, item) {
    if (
        typeof window[config] !== 'undefined'
        && Object.prototype.hasOwnProperty.call(window[config], item)
        && window[config][item] !== ''
    ) {
        return window[config][item];
    }
    return false;
}


// SCROLL

function scrollToContent() {
    const postCoverElement = document.querySelector('.post-cover');
    if (postCoverElement) {
        window.scroll({
            top: postCoverElement.clientHeight,
            left: 0,
            behavior: 'smooth',
        });
    }
}


// SVG

function configureSVG() {
    if (
        navigator.appName === 'Microsoft Internet Explorer'
        || !!(navigator.userAgent.match(/Trident/)
        || navigator.userAgent.match(/rv:11/))
        || (navigator.userAgent.includes('MSIE'))
    ) {
        if (typeof svg4everybody() !== 'undefined') {
            svg4everybody();
        }
    }
}


// IMAGE ALT

function configureImageAlt() {
    const imageElements = document.querySelectorAll('img');
    imageElements.forEach((imageElement) => {
        const imageAltAttr = imageElement.getAttribute('alt');
        if (
            typeof imageAltAttr === typeof undefined
            || imageAltAttr === false
            || imageAltAttr === null
        ) {
            const altText = imageElement.getAttribute('src').split('/').pop();
            imageElement.setAttribute('alt', altText);
        }
    });
}


// HIGHLIGHTER

function configureHighlighter() {
    const codeElements = document.querySelectorAll('pre code');
    codeElements.forEach((element) => {
        hljs.highlightBlock(element);
    });
}


// RESPONSIVE MEDIA

function configureResponsiveMedia() {
    reframe('.post-contents iframe');
}


// SOCIALS

function configureSocials() {
    const socialInstagramElement = document.querySelector('.social-instagram');
    if (socialInstagramElement && eckoConfig('ecko_theme_config', 'social_instagram')) {
        socialInstagramElement.setAttribute('href', eckoConfig('ecko_theme_config', 'social_instagram'));
        socialInstagramElement.style.display = 'block';
    }
    const socialGithubElement = document.querySelector('.social-github');
    if (socialGithubElement && eckoConfig('ecko_theme_config', 'social_github')) {
        socialGithubElement.setAttribute('href', eckoConfig('ecko_theme_config', 'social_github'));
        socialGithubElement.style.display = 'block';
    }
    const socialLinkedinElement = document.querySelector('.social-linkedin');
    if (socialLinkedinElement && eckoConfig('ecko_theme_config', 'social_linkedin')) {
        socialLinkedinElement.setAttribute('href', eckoConfig('ecko_theme_config', 'social_linkedin'));
        socialLinkedinElement.style.display = 'block';
    }
}


// GALLERY

function configureGallery() {
    const galleryImages = document.querySelectorAll('.kg-gallery-image img');
    galleryImages.forEach((image) => {
        const container = image.closest('.kg-gallery-image');
        const width = image.attributes.width.value;
        const height = image.attributes.height.value;
        const ratio = width / height;
        container.style.flex = `${ratio} 1 0%`;
    });
}


// COMMENTS

// eslint-disable-next-line no-unused-vars, camelcase
function disqus_config() {
    this.page.url = eckoConfig('ecko_theme_base', 'ghost_absolute_url');
    this.page.identifier = eckoConfig('ecko_theme_base', 'ghost_comment_id');
}

function loadDisqus() {
    const disqusID = eckoConfig('ecko_theme_config', 'disqus_id');
    const d = document;
    const s = d.createElement('script');
    s.src = `https://${disqusID}.disqus.com/embed.js`;
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
}

function loadComments() {
    const postCommentsElement = document.querySelector('.post-comments');
    if (postCommentsElement) {
        const postCommentsViewElement = document.querySelector('.post-comments-view');
        const postCommentsDisqusElement = document.querySelector('.post-comments-disqus');
        postCommentsViewElement.style.display = 'none';
        postCommentsDisqusElement.style.display = 'block';
        loadDisqus();
    }
}

function configureComments() {
    const postCommentsElement = document.querySelector('.post-comments');
    if (postCommentsElement && eckoConfig('ecko_theme_config', 'disqus_id')) {
        postCommentsElement.style.display = 'block';
        if (eckoConfig('ecko_theme_config', 'disqus_autoload')) {
            loadComments();
        }
    }
}

function bindComments() {
    const postCommentsViewElement = document.querySelector('.post-comments-view');
    if (postCommentsViewElement) {
        postCommentsViewElement.addEventListener('click', () => {
            loadComments();
        });
    }
}


// POST AUTHORS

function configurePostAuthors() {
    const postAuthorsElement = document.querySelector('.post-authors');
    const postAuthorsItemsElement = document.querySelector('.post-authors-items');
    if (postAuthorsElement && postAuthorsItemsElement.children.length <= 1) {
        postAuthorsElement.parentNode.removeChild(postAuthorsElement);
    }
}


// PERMALINK

function copyPermalink() {
    const postShareItemPermalinkCopyElement = document.querySelector('.post-share-item-permalink-copy');
    const postShareItemTooltip = document.querySelector('.post-share-item-tooltip');
    if (postShareItemPermalinkCopyElement && postShareItemTooltip) {
        postShareItemPermalinkCopyElement.focus();
        postShareItemPermalinkCopyElement.select();
        try {
            document.execCommand('copy');
            postShareItemTooltip.style.opacity = '1';
            setTimeout(() => {
                postShareItemTooltip.style.opacity = '0';
            }, 3000);
        } catch (error) {
            console.warn(`${error}`);
        }
    }
}

function bindPermalinkCopy() {
    const postShareItemPeralinkElement = document.querySelector('.post-share-item-permalink a');
    if (postShareItemPeralinkElement) {
        postShareItemPeralinkElement.addEventListener('click', (event) => {
            copyPermalink();
            event.preventDefault();
        });
    }
}


// MENU

function closeMenu() {
    const menuElement = document.querySelector('.menu');
    const menuIconNaivgationElement = document.querySelector('.menu-icon--navigation');
    const menuMainElement = document.querySelector('.menu-main');
    menuElement.classList.remove('menu__open');
    menuIconNaivgationElement.classList.remove('menu-icon--navigation__active');
    menuMainElement.classList.remove('menu-main__active');
    document.removeEventListener('mouseup', (event) => {
        if (event.target !== menuElement && !menuElement.contains(event.target)) {
            closeMenu();
        }
    });
}

function openMenu() {
    const menuElement = document.querySelector('.menu');
    const menuIconNaivgationElement = document.querySelector('.menu-icon--navigation');
    const menuMainElement = document.querySelector('.menu-main');
    menuElement.classList.add('menu__open');
    menuIconNaivgationElement.classList.add('menu-icon--navigation__active');
    menuMainElement.classList.add('menu-main__active');
    document.addEventListener('mouseup', (event) => {
        if (event.target !== menuElement && !menuElement.contains(event.target)) {
            closeMenu();
        }
    });
}

function toggleMenuVisibility() {
    const menuElement = document.querySelector('.menu');
    if (menuElement.classList.contains('menu__open')) {
        closeMenu();
    } else {
        openMenu();
    }
}

function bindMenu() {
    const navigationOpenElement = document.querySelectorAll('.js-navigation-open');
    if (navigationOpenElement) {
        navigationOpenElement.forEach((searchOpenElement) => {
            searchOpenElement.addEventListener('click', () => {
                toggleMenuVisibility();
            });
        });
    }
}


// POST COVER SCROLL

function bindPostCoverScroll() {
    const postCoverArrowElemet = document.querySelector('.post-cover-arrow');
    if (postCoverArrowElemet) {
        postCoverArrowElemet.addEventListener('click', scrollToContent);
    }
}


// POST FLOW

function configurePostFlow() {
    let bottomInView = false;
    const postFlowElement = document.querySelector('.post-flow');
    const postCoverElement = document.querySelector('.post-cover');
    const postHeaderElement = document.querySelector('.post-header');
    const postReadingTimeElement = document.querySelector('.post-reading-time');
    const postEndElement = document.querySelector('.post-end');
    if (postFlowElement && 'IntersectionObserver' in window) {
        if (postEndElement) {
            const postEndObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        bottomInView = true;
                        postReadingTimeElement.classList.remove('post-reading-time__visible');
                    } else {
                        bottomInView = false;
                    }
                });
            });
            postEndObserver.observe(postEndElement);
        }
        if (postCoverElement) {
            const postCoverObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting || bottomInView) {
                        postFlowElement.classList.remove('post-flow__visible');
                        postReadingTimeElement.classList.remove('post-reading-time__visible');
                    } else {
                        postFlowElement.classList.add('post-flow__visible');
                        postReadingTimeElement.classList.add('post-reading-time__visible');
                    }
                }, { threshold: [0, 1] });
            });
            postCoverObserver.observe(postCoverElement);
        } else if (postHeaderElement) {
            const postHeaderObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting || bottomInView) {
                        postFlowElement.classList.remove('post-flow__visible');
                        postReadingTimeElement.classList.remove('post-reading-time__visible');
                    } else {
                        postFlowElement.classList.add('post-flow__visible');
                        postReadingTimeElement.classList.add('post-reading-time__visible');
                    }
                }, { threshold: [0, 1] });
            });
            postHeaderObserver.observe(postHeaderElement);
        }
    }
}


// READ STATUS

function updatePostFlowReadTime(percent) {
    const postFlowReadTimeElement = document.querySelector('.post-flow-readtime');
    const postFlowReadTimeProgressFillElement = document.querySelector('.post-flow-readtime-progress-fill');
    let deg = 360 * percent / 100;
    if (deg > 360) deg = 360;
    if (percent > 50) {
        postFlowReadTimeElement.classList.add('post-flow-readtime-gt-50');
    } else {
        postFlowReadTimeElement.classList.remove('post-flow-readtime-gt-50');
    }
    postFlowReadTimeProgressFillElement.style.transform = `rotate(${deg}deg)`;
}

function updatePostEstimatedReadTime(percent) {
    const postReadingTimeElement = document.querySelector('.post-reading-time');
    if (percent < 100) {
        const [totalReadTime] = postReadingTimeElement.dataset.totalTime.split(' min read');
        const remainingReadTime = Math.ceil(totalReadTime - (totalReadTime / 100) * percent);
        if (remainingReadTime === 1) {
            postReadingTimeElement.textContent = `${remainingReadTime} ${postReadingTimeElement.dataset.minute}`;
        } else {
            postReadingTimeElement.textContent = `${remainingReadTime} ${postReadingTimeElement.dataset.minutes}`;
        }
    }
}

function updateReadTime() {
    const postContentsElement = document.querySelector('.post-contents');
    const postContentsRect = postContentsElement.getBoundingClientRect();
    const postContentsOffsetTop = postContentsRect.top + window.scrollY;
    let percent = 100 * window.scrollY;
    percent /= (postContentsElement.clientHeight) - window.innerHeight + postContentsOffsetTop;
    updatePostFlowReadTime(percent);
    updatePostEstimatedReadTime(percent);
}

function configureReadTime() {
    const postFlowReadTimeElement = document.querySelector('.post-flow-readtime');
    if (postFlowReadTimeElement) {
        updateReadTime();
        let userScrolled = false;
        window.addEventListener('scroll', () => {
            userScrolled = true;
        });
        setInterval(() => {
            if (userScrolled) {
                updateReadTime();
                userScrolled = false;
            }
        }, 500);
    }
}


// INDEX WAYPOINTS

function transitionTextWithOpacity(element, content, timing = 300) {
    const activeElement = element;
    activeElement.style.opacity = 0;
    setTimeout(() => {
        activeElement.textContent = content;
        activeElement.style.opacity = 1;
    }, timing);
}

function configurePostFlowIndex() {
    const postFlowCurrentElement = document.querySelector('.post-flow-current');
    if (postFlowCurrentElement) {
        const list = [];
        const postContentsElement = document.querySelector('.post-contents');
        const postContentsHeaderElements = postContentsElement.querySelectorAll('h1, h2, h3');
        list.push(postFlowCurrentElement.textContent);
        if (postContentsHeaderElements.length && 'IntersectionObserver' in window) {
            const postHeaderObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (list[list.length - 1] === entry.target.textContent) {
                            list.pop();
                            transitionTextWithOpacity(
                                postFlowCurrentElement,
                                list[list.length - 1],
                            );
                        }
                    } else {
                        const entryTargetRect = entry.target.getBoundingClientRect();
                        const entryTargetOffsetTop = entryTargetRect.top + window.scrollY;
                        if (entryTargetOffsetTop < window.scrollY) {
                            list.push(entry.target.textContent);
                            transitionTextWithOpacity(
                                postFlowCurrentElement,
                                entry.target.textContent,
                            );
                        }
                    }
                });
            });
            postContentsHeaderElements.forEach((postHeaderElement) => {
                postHeaderObserver.observe(postHeaderElement);
            });
        }
    }
}


// SEARCH

function showLoadingSearch() {
    const searchLoadingElement = document.querySelector('.search__loading');
    const searchMagnifyElement = document.querySelector('.search__magnify');
    searchMagnifyElement.style.display = 'none';
    searchLoadingElement.style.display = 'flex';
}

function hideLoadingSearch() {
    const searchLoadingElement = document.querySelector('.search__loading');
    const searchMagnifyElement = document.querySelector('.search__magnify');
    searchLoadingElement.style.display = 'none';
    searchMagnifyElement.style.display = 'flex';
}

function openSearch() {
    if (window.outerWidth < 880) {
        window.location = `${eckoConfig('ecko_theme_base', 'ghost_site_url')}/search/`;
        return;
    }
    const searchElement = document.querySelector('.search');
    const searchInputElement = document.querySelector('.search__input');
    if (!eckoConfig('ecko_theme_base', 'ghost_post_title') || eckoConfig('ecko_theme_base', 'ghost_post_title').toLowerCase() !== 'search') {
        searchElement.classList.add('search--enabled');
        document.addEventListener('mouseup', bodyMouseUpSearch);
    }
    setTimeout(() => {
        searchInputElement.focus();
    }, 500);
}

function closeSearch() {
    const searchElement = document.querySelector('.search');
    searchElement.classList.remove('search--enabled');
    document.removeEventListener('mouseup', bodyMouseUpSearch);
}

function bodyMouseUpSearch(event) {
    const searchContainerElement = document.querySelector('.search__container');
    if (event.target !== searchContainerElement && !searchContainerElement.contains(event.target)) {
        closeSearch();
    }
}

function bindSearch() {
    const searchOpenElements = document.querySelectorAll('.js-search-open');
    const searchCloseElements = document.querySelectorAll('.js-search-close');
    const searchMagnifyElement = document.querySelector('.search__magnify');
    const searchInputElement = document.querySelector('.search__input');
    if (searchOpenElements) {
        searchOpenElements.forEach((searchOpenElement) => {
            searchOpenElement.addEventListener('click', openSearch);
        });
    }
    if (searchCloseElements) {
        searchCloseElements.forEach((searchCloseElement) => {
            searchCloseElement.addEventListener('click', closeSearch);
        });
    }
    if (searchMagnifyElement) {
        searchMagnifyElement.addEventListener('click', () => {
            searchInputElement.focus();
        });
    }
}

function configureSearch() {
    if (eckoConfig('ecko_theme_config', 'search_api_key')) {
        const menuButtonSearchElement = document.querySelector('.menu-button--search');
        const searchLowerElement = document.querySelector('.search__lower');
        const searchInputElement = document.querySelector('.search__input');
        const searchCountElement = document.querySelector('.search__count');
        const searchResultsElement = document.querySelector('.search__results');
        menuButtonSearchElement.style.display = 'flex';
        window.ghostSearch = new GhostSearch({
            url: eckoConfig('ecko_theme_base', 'ghost_site_url'),
            key: eckoConfig('ecko_theme_config', 'search_api_key'),
            input: '.search__input',
            results: '.search__results',
            version: 'v3',
            api: {
                parameters: {
                    fields: ['title', 'slug', 'primary_tag', 'published_at', 'primary_author'],
                    include: ['tags', 'authors'],
                },
            },
            template: (result) => {
                const url = eckoConfig('ecko_theme_base', 'ghost_site_url');
                let date = new Date(result.published_at);
                date = `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
                let category = '';
                let author = '';
                if (result.primary_tag) category = result.primary_tag.name;
                if (result.primary_author) author = result.primary_author.name;
                return `<a href="${url}/${result.slug}/" class="search__result">
                    <span class="search__category">${category}</span>
                    <span class="search__title">${result.title}</span>
                    <span class="search__meta">${date} <span class="search__bull">•</span> ${author}</span>
                </a>`;
            },
            on: {
                beforeFetch: () => {
                    showLoadingSearch();
                },
                afterFetch: () => {
                    hideLoadingSearch();
                },
                beforeDisplay: () => {
                    showLoadingSearch();
                },
                afterDisplay: (results) => {
                    hideLoadingSearch();
                    if (!searchInputElement.value.length) {
                        searchLowerElement.style.display = 'none';
                    } else {
                        const resultsCount = results.length;
                        searchLowerElement.style.display = 'block';
                        searchCountElement.innerHTML = resultsCount;
                        if (resultsCount) {
                            searchResultsElement.style.display = 'grid';
                        } else {
                            searchResultsElement.style.display = 'none';
                        }
                    }
                },
            },
        });
    }
}


// INITIALIZE

function initReady() {
    configureSVG();
    configureImageAlt();
}

function initLoad() {
    setTimeout(() => {
        configureHighlighter();
        configureResponsiveMedia();
        configureSocials();
        configureComments();
        configureGallery();
        configurePostAuthors();
        configurePostFlow();
        configureReadTime();
        configurePostFlowIndex();
        configureSearch();
        bindComments();
        bindMenu();
        bindPostCoverScroll();
        bindPermalinkCopy();
        bindSearch();
    }, 400);
}

if (document.attachEvent ? document.readyState === 'complete' : document.readyState === 'loading') {
    initReady();
    initLoad();
} else {
    document.addEventListener('DOMContentLoaded', initReady());
    document.addEventListener('load', initLoad());
}
