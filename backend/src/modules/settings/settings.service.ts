import { Settings } from './settings.model';
import { ISettingsDocument } from './settings.types';
import { UpdateSettingsDto } from './settings.validation';

export class SettingsService {
  static async getSettings(): Promise<ISettingsDocument> {
    let settings = await Settings.findOne().exec();

    if (!settings) {
      settings = await Settings.create({});
    }

    return settings;
  }

  static async updateSettings(data: UpdateSettingsDto): Promise<ISettingsDocument> {
    let settings = await Settings.findOne().exec();

    if (!settings) {
      settings = new Settings(data);
    } else {
      if (data.siteName !== undefined) settings.siteName = data.siteName;
      if (data.tagline !== undefined) settings.tagline = data.tagline;
      if (data.siteDescription !== undefined) settings.siteDescription = data.siteDescription;
      if (data.language !== undefined) settings.language = data.language;
      if (data.direction !== undefined) settings.direction = data.direction;
      if (data.timezone !== undefined) settings.timezone = data.timezone;
      if (data.logo !== undefined) settings.logo = data.logo ?? undefined;
      if (data.favicon !== undefined) settings.favicon = data.favicon ?? undefined;

      if (data.socialLinks) {
        settings.socialLinks = { ...settings.socialLinks, ...data.socialLinks };
      }
      if (data.contact) {
        settings.contact = { ...settings.contact, ...data.contact };
      }
      if (data.defaultSeo) {
        settings.defaultSeo = { ...settings.defaultSeo, ...data.defaultSeo };
      }
      if (data.homepage) {
        settings.homepage = { ...settings.homepage, ...data.homepage };
      }
      if (data.hero) {
        settings.hero = { ...settings.hero, ...data.hero };
      }
      if (data.about) {
        settings.about = { ...settings.about, ...data.about };
      }
      if (data.founder) {
        settings.founder = { ...settings.founder, ...data.founder };
      }
      if (data.footer) {
        settings.footer = { ...settings.footer, ...data.footer };
      }
    }

    await settings.save();
    return settings;
  }
}
