## v1.5.1 (October 17, 2021)

* Security updates.

## v1.5.0 (December 5, 2020)

* Added `excludePaths` and `includeOnlyPaths` options for `whenFileContent` condition.
* Added `between` option for `whenFileCount`, `whenCommentCount`, and `whenCommitCount` conditions.
* Added `whenHasRequestsToReview` and `whenHasNoRequestsToReview` conditions.
* Fixed bugs with missed options in `whenHasConflicts`, `whenHasNoConflicts`,
  `whenOpen`, `whenClosed`, and `whenWasMerged` conditions.

## v1.4.0 (November 21, 2020)

* Added async support for `WhenCondition`.
* Removed `TaskContext`. Please use `LabelerContext` instead.
* Improved `Logger` using **@winstonjs**.
* Improved config.
* Preventing logical bugs in conditions when using regular expressions with the global flag.
* Fixed bug with the `nothing` option in `WhenState`.

## v1.3.0 (November 17, 2020)

* Added `deleteSourceBranch` action.
* Added conditions `whenOpen`, `whenClosed`, and `whenWasMerged`.

## v1.2.0 (November 9, 2020)

* Added actions `requestReviewers` and `removeRequestedReviewers`.
* Added conditions `whenNotReviewed`, `whenApproved`, and `whenChangesRequested`.
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
