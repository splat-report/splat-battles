.SUFFIXES:
MAKEFLAGS += --no-builtin-rules
MAKEFLAGS += --no-builtin-variables
MAKEFLAGS += --warn-undefined-variables

##############################################

.PHONY: test
test:
	npx vitest


.PHONY: dev
dev: init
	BROWSER=none npx netlify-cli dev


.PHONY: deploy-preview
deploy-preview: init lint
	DEBUG='*' npx netlify-cli deploy


.PHONY: deploy-publish
deploy-publish: init lint
	DEBUG='*' npx netlify-cli deploy --prod


.PHONY: init
init: node_modules/.package-lock.json


node_modules/.package-lock.json: package-lock.json
	npm ci
	touch node_modules/.package-lock.json


##############################################

.PHONY: lint
lint:
	npx prettier --write .
	deno fmt
	deno lint


.PHONY: clean
clean:
	rm -rf node_modules .netlify .nuxt .output dist
