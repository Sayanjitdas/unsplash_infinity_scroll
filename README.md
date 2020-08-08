# unsplash_infinity_scroll
This is a demo application which has implementation of infinite scroll in javascript

This is build on unsplash api call on page scroll for infinite image scrolling

if window.innerheight i.e the total height of the device browser window added with
the scrollY value i.e the total scrolled value with respect to top of the 
browser window where the scroll start is greater than the document.body.offsetHeight
i.e the height of the total body content both visible and invisible(visible on scroll)
subtracted by 1000px where api call in made before reaching the scroll end
also as we have to keep check whether every image is loaded before another api call we are keeping a ready flag
**all values are in pixels