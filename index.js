/**
 * Clawhalla Skill Plugin
 *
 * Provides guidance on using Clawhalla - permanent AI soul storage on Arweave.
 * This is a skill-only plugin that registers the SKILL.md file for OpenClaw agents.
 */

export default function clawhallaSkillPlugin(api) {
  // This is a skill-only plugin
  // The SKILL.md file will be discovered automatically by OpenClaw
  // No additional registration needed

  return {
    id: 'clawhalla-skill',
    name: 'Clawhalla Usage Guide',
    description: 'Comprehensive guide for using Clawhalla - permanent AI soul storage on Arweave',
    version: '1.0.1'
  };
}
