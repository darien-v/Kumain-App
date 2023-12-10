# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [0.4.0] - 2023-12-9
### Added
- Scraping endpoint to automatically scrape 10 recipes whenever someone accesses the homepage
- Search form for filtering through recipes based on criteria like ingredients, cook time, prep time, servings, and place of origin
- a publicly deployed website, available at https://papaya-kulfi-4eb72b.netlify.app/
- Bootstrap to make some elements more reactive, and enforce a white and orange color scheme
- A recommendation tab on the homepage, available to those with an account who have at least one recipe saved in a cookbook

## [0.3.0] - 2023-11-08
### Added
- Authentication module
- Login/Register Routing and Forms
- Protected Router
- Restriction on unauthenticated users accessing site

## [0.2.0] - 2023-10-12
### Added
- Home component acting as landing page for site
- Header component on every page for easy navigation
- Cookbook component for users to save recipes
- Routing for components
- This CHANGELOG file to document changes over versions
- New object classes for cookbooks, tutorials, and recipes
