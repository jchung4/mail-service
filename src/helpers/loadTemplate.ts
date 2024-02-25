import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';

// Use util.promisify to convert fs.readFile into a Promise-based function
import { promisify } from 'util';
const readFile = promisify(fs.readFile);

// Function to load and compile a Handlebars template
export const loadEmailTemplate = async (templateName: string): Promise<HandlebarsTemplateDelegate> => {
  const templatePath = path.join(__dirname, '../templates', `${templateName}.hbs`);

  try {
    const templateContent = await readFile(templatePath, 'utf-8');
    return handlebars.compile(templateContent);
  } catch (error) {
    throw new Error(`Unable to load the email template: ${error}`);
  }
};