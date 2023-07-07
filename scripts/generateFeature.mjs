import inquirer from 'inquirer';
import fs from 'fs';

inquirer
  .prompt([
    {
      type: 'list',
      name: 'featureType',
      message: 'Which feature type would like to create?',
      choices: [
        {
          value: 'regular',
          name: 'Regular feature (register)',
        },
      ],
    },
    {
      type: 'input',
      name: 'featureName',
      message: 'Enter the name of the feature',
      validate: (input) => {
        if (input.length < 2) {
          return `Feature name must have at least two characters`;
        } else if (input.startsWith('-')) {
          return `Feature name cannot start with '-'`;
        } else {
          return true;
        }
      },
    },
  ])
  .then((answers) => {
    const featureFolderName = `./src/features/feature-${answers.featureName}`;

    const lowerFeatureName = answers.featureName
      .toLowerCase()
      .split('-')
      .map((item, index) =>
        index > 0 ? item.charAt(0).toUpperCase() + item.slice(1) : item
      )
      .join('');
    let capitalizeFeatureName =
      lowerFeatureName.charAt(0).toUpperCase() + lowerFeatureName.slice(1);

    if (!fs.existsSync(featureFolderName)) {
      const registerTemplate = fs
        .readFileSync('./scripts/templates/register.template', 'utf8')
        .replace(/\$NAME/g, lowerFeatureName)
        .replace(/\$UPPERNAME/g, capitalizeFeatureName);

      const serviceTemplate = fs
        .readFileSync('./scripts/templates/service.template', 'utf8')
        .replace(/\$NAME/g, lowerFeatureName)
        .replace(/\$UPPERNAME/g, capitalizeFeatureName);

      const typesTemplate = fs
        .readFileSync('./scripts/templates/types.template', 'utf8')
        .replace(/\$UPPERNAME/g, capitalizeFeatureName);

      fs.mkdirSync(featureFolderName);
      fs.writeFileSync(`${featureFolderName}/register.ts`, registerTemplate);
      fs.writeFileSync(
        `${featureFolderName}/${lowerFeatureName}Service.ts`,
        serviceTemplate
      );
      fs.writeFileSync(`${featureFolderName}/types.ts`, typesTemplate);

      const currentServices = JSON.parse(
        fs.readFileSync('./src/features/services.json')
      );
      fs.writeFileSync(
        './src/features/services.json',
        JSON.stringify(
          [...currentServices, `feature-${answers.featureName}`].sort(),
          null,
          2
        )
      );
    } else {
      console.error('Feature already exists.');
      return;
    }
  });
