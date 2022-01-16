const authentication = {
	spec: {
		securityDefinitions: {
			api_key: {
				type: 'apiKey',
				name: 'access_token',
				in: 'query',
			},
			tsoa_auth: {
				type: 'oauth2',
				authorizationUrl: 'http://swagger.io/api/oauth/dialog',
				flow: 'implicit',
				scopes: {
					'write:pets': 'modify things',
					'read:pets': 'read things',
				},
			},
		},
	},
	routes: {
		authenticationModule: './authentication.ts',
	},
};
export { authentication };