# Site Structure

* The site should be structured in a way that allows for DRY principals to be enforced.
* URL structure should enable HTML5Mode
* Posts need their own controller and be written in MD/RST
* Each Post should have a Disqus section as well as Social Buttons.

Example:

example-article-slugged.md

This would become an post with an H1 tag of Example Article Slugged Located in a jumbotron. Ideally, the first paragraph of the post would also become the tagline within the jumbotron. The url would be http://t73.biz/example-article-slugged and the view template structure would be index.html > post.html > example-article-slugged.md
