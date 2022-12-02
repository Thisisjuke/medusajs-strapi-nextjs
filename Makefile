install:
	yarn --cwd ./api install && yarn --cwd ./admin-panel install

init:
	docker-compose build && make install

dev:
	docker-compose up

kill:
	docker stop $$(docker ps -qa) && docker rm $$(docker ps -qa)

user:
	docker exec -d medusa-api medusa user -e $(EMAIL) -p $(PASSWORD)

restart-medusa:
	docker-compose restart medusa-api

restart-strapi:
	docker-compose restart strapi