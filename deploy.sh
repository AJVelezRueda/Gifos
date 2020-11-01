#!/bin/bash
set -e
echo "moviendo a branch gh-pages"
git checkout gh-pages
echo "actualizando gh-pages"
git rebase master
echo "desplegando"
git push origin HEAD
echo "volviendo al ppio"
git checkout master