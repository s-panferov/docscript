#!/bin/bash
set -e # exit with nonzero exit code if anything fails

rm -rf doc-repo
mkdir doc-repo

cp -r doc doc-repo/
cd doc-repo

git init

# inside this git repo we'll pretend to be a new user
git config user.name "Travis CI"
git config user.email "fnight.m@gmail.com"

# The first and only commit to this new Git repo contains all the
# files present with the commit message "Deploy to GitHub Pages".
git add -f doc
git commit -m "Deploy to GitHub Pages"

# Force push from the current repo's master branch to the remote
# repo's gh-pages branch. (All previous history on the gh-pages branch
# will be lost, since we are overwriting it.) We redirect any output to
# /dev/null to hide any sensitive credential data that might otherwise be exposed.
git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
