## v1.2.0 (November 9, 2020)

* Added actions `requestReviewers` and `removeRequestedReviewers`.
* Added conditions `whenNotReviewed`, `whenApproved`, and `whenChangesRequested`.
* Improved unit tests.
* Updated dependencies.

## v1.1.0 (November 5, 2020)

* Improved caching.
* Improved error handling.
* Improved `LabelerContext`:
  * Added a reference to the cache instance.
  * Added the ability to manage the cache when using the test and fix modes.
* Fixed bug with remove labels.
* `TaskContext` is deprecated. Please use `LabelerContext` instead.

## v1.0.0 (October 31, 2020)

First public release!
