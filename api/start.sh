#!/bin/bash
: '
rm ~/.config/yarn/link/@medusajs/medusa
rm ~/.config/yarn/link/medusa-interfaces
rm ~/.config/yarn/link/medusa-source-shopify-json
cd ./node_modules/medusa-interfaces
yarn link
cd ../../node_modules/@medusajs/medusa
yarn link
cd ../../../plugins/medusa-source-shopify-json
rm -rf node_modules/medusa-interfaces
rm -rf node_modules/@medusajs/medusa
yarn
yarn link medusa-interfaces
yarn link @medusajs/medusa
yarn link
cd ../
yarn link medusa-source-shopify-json
cd ../
'
yarn
medusa migrations run
medusa develop