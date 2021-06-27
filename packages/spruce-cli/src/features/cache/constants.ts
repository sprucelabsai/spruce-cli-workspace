export const ENABLE_NPM_CACHE_COMMAND =
	'npm config set registry http://localhost:28080 && npm config set @sprucelabs:registry https://registry.npmjs.org && docker run --name redis-container -d redis && docker run -e REDIS_ADDRESS=redis:6379 -p 28080:8080 -it --link redis-container:redis --name npm-proxy  -d pkgems/npm-cache-proxy'

export const DISABLE_NPM_CACHE_COMMAND =
	'npm config set registry https://registry.npmjs.org && docker stop redis-container ; docker stop npm-proxy ; docker rm redis-container ; docker rm npm-proxy'
