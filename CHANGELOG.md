# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## DEPRECATED

We will no longer update this file, please check out the [releases page](https://github.com/thematters/matters-oss/releases) for the latest changelog.

## [0.14.0] - 2020-06-20

### Changed

- Add feature flag for fingerprint. #297
- GitHub Actions @298

## [0.13.0] - 2020-06-11

### Added

- Add feature flag page #292

## [0.12.1] - 2020-06-05

### Added

- Domain Blocklist

## [0.12.0] - 2020-06-05

### Changed

- Sync with schema changes #283

## [0.11.0] - 2020-05-15

### Changed

- Retire user frozen state. #233
- Change day selector for user ban. #247

## [0.10.0] - 2020-04-02

### Added

- Block List Page #217

## [0.9.0] - 2019-12-27

### Added

- Delete User #44

### Changed

- Show user LikerID in detail page #49

## [0.8.0] - 2019-12-13

### Added

- Fix rename, delete, merge tag actions #45
- Fix tag's bug #46

### Changed

- Collapse comment is OSS #43

## [0.7.1] - 2019-11-20

### Changed

- Sync toggle mutations with new API

## [0.7.0] - 2019-11-04

### Added

- Update user role is supported now #36
- Add `SetBoost` and `inRecommandX` in detail page #37

### Changed

- Batch set comments' state #36
- SearchBar: add jumping support for "matters.news" url #36
- Collapsable sidebar #36
- Fix tag count #36

## [0.6.0] - 2019-10-14

### Added

- Add Sentry

### Changed

- Fix infinite API call of LikeCoin migrations

## [0.5.0] - 2019-10-03

### Added

- Add OAuthClient list page
- Add form to OAuthClient detail page
- Add generate likerIds trigger
- Add Add `<TransferLIKE>`

### Changed

- Sync schema

## [0.4.2] - 2019-09-03

### Added

- Add `<CommentDigestList>` to ArticleDetail and UserDetail page;
- Add `<CommentSetState>` to `<CommentDigestList>`

## [0.4.1] - 2019-09-02

### Changed

- Alter url id parser of quick-jump-input in comment list page

## [0.4.0] - 2019-08-23

### Changed

- Add detail and list page for Comment #19
- Update deps #19

## [0.3.1] - 2019-07-29

### Changed

- Fix upload cover
- Update endpoint
- Disable invitation fields

## [0.3.0] - 2019-04-26

### Changed

- Hide public toggle #10
- Pagination in URL #11
- Add user site link in UserDetail page #11
- Collection support in ArticleDetail page #11
- Sort by "hottest" in TagList #12

## [0.2.1] - 2019-04-09

### Changed

- Add article site link to articleDetail page #6
- Fixed table header #6
- Update upload limit #7

## [0.2.0] - 2019-04-02

### Added

- Add cover uploader for Matters today #2

### Changed

- Alter schema for adding today cover #2
- Enhance cover uploader #3
