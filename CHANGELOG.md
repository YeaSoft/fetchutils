# Changelog

All notable changes to this project will be documented in this file.

## [1.1.2] - 2026-04-13

- Updated project settings and module dependencies

## [1.1.1] - 2025-05-13

### Bug Fixes

- Fixed missing type parameters in typescript type definition files

## [1.1.0] - 2025-03-24

### Improvements

- Updated module dependencies
- Improved typescript type definition files
- The `node-fetch` error classes `FetchError` and `AbortError` will be passed through
- Implementation of `HttpStatusError` is now taken from package `@yeasoft/basetypes`

## [1.0.1] - 2025-02-07

### Bugfixes

- Fixed broken bearer authorisation code

## [1.0.0] - 2025-01-17

### New Features

- Added support for new option `proxy`

### Improvements

- Updated project settings and module dependencies
- Improved typescript type definition file

### Bug Fixes

- Fixed handling of option `agent`

## [0.19.0] - 2022-08-01

### New Features

- Added `delete` method to `RequestHelper`

## [0.18.0] - 2022-07-21

### Improvements

- Updated dependencies
- Added "status" to HttpStatusError in order to ensure express compatibility

## [0.17.0] - 2021-06-04

Initial release
