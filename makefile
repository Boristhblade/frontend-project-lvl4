start-backend:
	npx start-server -p 5001 -s ./frontend/build
start-frontend:
	make -C frontend start
	make start-backend
	
