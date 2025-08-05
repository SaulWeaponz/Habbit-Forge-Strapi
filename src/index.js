'use strict';

module.exports = ({ strapi }) => ({
  register() {
    // Add custom health check route
    strapi.server.routes([
      {
        method: 'GET',
        path: '/_health',
        handler: (ctx) => {
          ctx.body = {
            status: 'ok',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            environment: process.env.NODE_ENV || 'development'
          };
        },
        config: {
          auth: false,
          policies: [],
        },
      },
    ]);
  },
  bootstrap() {},
  destroy() {},
});
