const services: string[] = require('./services.json');

/**
 * This function register every service using the register function
 * Each service must have a file cllaed `register.ts` this file gets called,
 * and that way we are registering all features dynamically, every time we
 * generate a new feature we add it to the services.josn file
 */
export const registerAllServices = () => {
  return Promise.all(
    services
      .map((service) => `./${service}/register`)
      .map((service) => {
        return new Promise((resolve) => {
          import(`${service}`).then(
            ({ register }: { register: () => void }) => {
              register();
              resolve(true);
            }
          );
        });
      })
  );
};
