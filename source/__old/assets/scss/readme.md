# Boardwalk CSS Notes

The CSS on the site is physically located in the /assets/css folder of the /source folder.

## Where To Start?
A good place to start is in the /assets/css/style.scss file. This file pulls in all the other individual scss files in order to focus on global elements or component specific elements separately, but at the end of the day it's all processed to style.css within the /public/theme folder.

This file is sectioned, and order that files are @imported is important so styles cascade properly, and can be overwritten properly. You will find settings, mixins and reset to start, as well as any third party plugin specific styles. Then following the Patternlab setup, we include atoms specific, then molecules and finally organisms. If you have template or page specific items you want to create later, you could add those in here as well.

So with that said, if you are looking at a component in /source/patterns/organisms like header.mustache for example, its corresponding styling can be found in /assets/css/orgainisms/header.scss.

Note: bootstrap css library is included outside of this during development (see "source/meta/00_head.mustache) but if need be this could also be imported with style.scss.

## Key Files

Some of the key files are:

* atoms/settings.scss
This is where all variables like colours, breakpoints, and other values can be found

* orgainisms/header.scss
All styling related to main menu navigation

* orgainisms/mobile-navigation.scss
All styling related to mobile menu navigation

* organisms/footer.scss
All styling related to footer

* layouts/body.scss
These pertain to any global container and page type styles, that don't really fall under a specific component or region of the page template.


## Local Development

To modify CSS locally, you will need to ensure you have your local environment set up and running. Please refer to README.md file in the root (under /src) for instructions on prerequisites, installation and how to run Patternlab.

After running a ```gulp patternlab:builld``` and ```gulp patternlab:serve```, this will watch for changes to CSS. So going into any scss file and making a modification, once you Save it, Patternlab will regenerate and also refresh your browser (using Browsersync). These are all part of the initial gulp setup.
