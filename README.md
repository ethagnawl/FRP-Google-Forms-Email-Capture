Bacon.js Email Capture Form
===========================


Getting Started
---------------

- let it be known that this is sort of a hack and as such, may stop working at any time
- create a [google form](forms.google.com)
- [figure out your form's key and your email column's id](https://wiki.base22.com/pages/viewpage.action?pageId=72942000#SendingdatatoGoogledocsfromyourwebpage,usingyourownformandAJAX!-Requirements)
- set `ENV.GOOGLE_FORM_KEY` and `ENV.GOOGLE_FORM_INPUT_ID` in index.html accordingly
- profit?


ToDo
----

- end `email` and `validEmail` event streams
- hide form on submission
- find a solution to the CORS issue, which prevents actual, successful requests


hacked by maxbomb
