*-- JavaScript Library Information --*

This is information on the JavaScript libraries used in the Boardwalk template build project.

Custom:
-------

* maps.js
Custom JavaScript for Google Map functionality.


Third Party:
------------

* bootstrap.min.js
The foundation of the template build is based on Bootstrap 4. The minified version is used in templates and unminified version is here for reference.
Version: v4.0.0
Reference: https://getbootstrap.com/docs/4.0/getting-started/introduction/

* jquery-ui.min.js
jQuery UI is a curated set of user interface interactions, effects, widgets, and themes built on top of the jQuery JavaScript Library.
Usage: This is used primarily for the Datepicker functionality.
Version: v1.12.1
Reference: https://jqueryui.com/

* jquery.tablesorter.min.js
This plugin is used for client side column sorting on data tables.
Usage: Example of usage can be found on the bottom of the Form Example page.
Version: v2.0.5
Reference: http://tablesorter.com/docs/

* magnific-popup.js
This is used for modal popup functionality in the templates.
Usage: Used for Video Modal - see patternlab.js.
Version: v1.1.0
Reference: http://dimsemenov.com/plugins/magnific-popup/

* ofi.min.js
This library is used specifically for IE11 to shim lack of support for 'object-fit'.
Usage: Where needed, apply values via 'font-family'. See Object Fit Images documentation.
Version: v3.2.3
Reference: https://www.npmjs.com/package/object-fit-images

* slick.js
All carousel and gallery image sliders leverage Slick plugin.
Usage: Custom functions have been set up for specific usage within the templates. See carousel.js.
Version: v1.8.0
Reference: http://kenwheeler.github.io/slick/


Notes:
------

- All JavaScript is imported in the _01-foot.mustache file.
- All JavaScript is located in the /assets/js folder.
- Both jQuery 3.2.1 and Google Maps API are pulled in via Google API CDN.
