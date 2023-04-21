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
init: node_modules/.modules.yaml


node_modules/.modules.yaml: pnpm-lock.yaml
	npx pnpm install
	touch node_modules/.modules.yaml


##############################################

.PHONY: lint
lint:
	npx prettier --write .
	deno fmt
	deno lint


.PHONY: clean
clean:
	rm -rf node_modules .netlify .nuxt .output dist
