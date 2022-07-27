start-backend-locally:
	npx start-server -p 5001
start-backend:
	npx start-server -p 5001 -s ./frontend/build
start-frontend:
	make -C frontend start
start:
	make start-backend & make start-frontend
start-locally:
	make start-backend-locally & make start-frontend
build:
	make -C app build
install:
	npm ci
	make -C app install