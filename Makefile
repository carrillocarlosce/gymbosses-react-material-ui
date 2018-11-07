help:
	@echo 'Management commands for gymbosses:'
	@echo
	@echo 'Usage:'
	@echo '    make build-client-local  	Builds the client bundle.js for local development.'
	@echo '    make build-client-deploy  	Installs npm pkg and Builds the bundle.js for deploy.'
	@echo '    make run-server       		Runs only the server.'
	@echo '    make run-local       		Runs the entire project in develpment.'

build-client-deploy:
	@echo 'Building client for deploy.'
	cd client; npm install; npm run build

run-server:
	@echo 'Running server.'
	export `less .env | xargs`; go run cmd/gymbosses/main.go

run-local: run-server
