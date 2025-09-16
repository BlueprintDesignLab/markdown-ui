import { describe, it, expect } from 'vitest';
import { parseDSL } from './parser.js';

describe('DSL Parser', () => {
  describe('text-input', () => {
    it('parses minimal text-input', () => {
      const result = parseDSL('text-input myId');
      expect(result.success).toBe(true);
      expect(result.widget).toEqual({
        type: 'text-input',
        id: 'myId'
      });
    });

    it('parses text-input with all parameters', () => {
      const result = parseDSL('text-input username "Username" "Enter username" "defaultValue"');
      expect(result.success).toBe(true);
      expect(result.widget).toEqual({
        type: 'text-input',
        id: 'username',
        label: 'Username',
        placeholder: 'Enter username',
        default: 'defaultValue'
      });
    });

    it('handles quoted strings with spaces', () => {
      const result = parseDSL('text-input id "Long label text" "Placeholder with spaces"');
      expect(result.success).toBe(true);
      expect(result.widget).toEqual({
        type: 'text-input',
        id: 'id',
        label: 'Long label text',
        placeholder: 'Placeholder with spaces'
      });
    });
  });

  describe('button-group', () => {
    it('parses button-group with choices', () => {
      const result = parseDSL('button-group env [dev staging prod]');
      expect(result.success).toBe(true);
      expect(result.widget).toEqual({
        type: 'button-group',
        id: 'env',
        choices: ['dev', 'staging', 'prod']
      });
    });

    it('parses button-group with default', () => {
      const result = parseDSL('button-group env [dev staging prod] dev');
      expect(result.success).toBe(true);
      expect(result.widget).toEqual({
        type: 'button-group',
        id: 'env',
        choices: ['dev', 'staging', 'prod'],
        default: 'dev'
      });
    });

    it('handles single choice', () => {
      const result = parseDSL('button-group confirm [yes]');
      expect(result.success).toBe(true);
      expect(result.widget).toEqual({
        type: 'button-group',
        id: 'confirm',
        choices: ['yes']
      });
    });

    it('requires choices array', () => {
      const result = parseDSL('button-group env');
      expect(result.success).toBe(false);
      expect(result.error).toContain('requires id and choices array');
    });
  });

  describe('select', () => {
    it('parses select with choices', () => {
      const result = parseDSL('select region [us-east-1 us-west-2 eu-west-1]');
      expect(result.success).toBe(true);
      expect(result.widget).toEqual({
        type: 'select',
        id: 'region',
        choices: ['us-east-1', 'us-west-2', 'eu-west-1']
      });
    });

    it('parses select with default', () => {
      const result = parseDSL('select region [us-east-1 us-west-2] us-east-1');
      expect(result.success).toBe(true);
      expect(result.widget).toEqual({
        type: 'select',
        id: 'region',
        choices: ['us-east-1', 'us-west-2'],
        default: 'us-east-1'
      });
    });
  });

  describe('select-multi', () => {
    it('parses select-multi with choices', () => {
      const result = parseDSL('select-multi services [redis postgres nginx]');
      expect(result.success).toBe(true);
      expect(result.widget).toEqual({
        type: 'select-multi',
        id: 'services',
        choices: ['redis', 'postgres', 'nginx']
      });
    });

    it('parses select-multi with single default', () => {
      const result = parseDSL('select-multi services [redis postgres nginx] redis');
      expect(result.success).toBe(true);
      expect(result.widget).toEqual({
        type: 'select-multi',
        id: 'services',
        choices: ['redis', 'postgres', 'nginx'],
        default: 'redis'
      });
    });

    it('parses select-multi with array default', () => {
      const result = parseDSL('select-multi services [redis postgres nginx] [redis postgres]');
      expect(result.success).toBe(true);
      expect(result.widget).toEqual({
        type: 'select-multi',
        id: 'services',
        choices: ['redis', 'postgres', 'nginx'],
        default: ['redis', 'postgres']
      });
    });
  });

  describe('slider', () => {
    it('parses slider with min, max, step', () => {
      const result = parseDSL('slider cpu 1 32 1');
      expect(result.success).toBe(true);
      expect(result.widget).toEqual({
        type: 'slider',
        id: 'cpu',
        min: 1,
        max: 32,
        step: 1
      });
    });

    it('parses slider with default', () => {
      const result = parseDSL('slider cpu 1 32 1 4');
      expect(result.success).toBe(true);
      expect(result.widget).toEqual({
        type: 'slider',
        id: 'cpu',
        min: 1,
        max: 32,
        step: 1,
        default: 4
      });
    });

    it('handles decimal values', () => {
      const result = parseDSL('slider temp 0.0 100.0 0.1 22.5');
      expect(result.success).toBe(true);
      expect(result.widget).toEqual({
        type: 'slider',
        id: 'temp',
        min: 0.0,
        max: 100.0,
        step: 0.1,
        default: 22.5
      });
    });

    it('requires numeric parameters', () => {
      const result = parseDSL('slider cpu one two three');
      expect(result.success).toBe(false);
      expect(result.error).toContain('must be numbers');
    });

    it('requires all numeric parameters', () => {
      const result = parseDSL('slider cpu 1 2');
      expect(result.success).toBe(false);
      expect(result.error).toContain('requires id, min, max, step');
    });
  });

  describe('form', () => {
    it('parses form with id only', () => {
      const result = parseDSL('form config');
      expect(result.success).toBe(true);
      expect(result.widget).toEqual({
        type: 'form',
        id: 'config',
        fields: []
      });
    });

    it('parses form with submit label', () => {
      const result = parseDSL('form config "Deploy Now"');
      expect(result.success).toBe(true);
      expect(result.widget).toEqual({
        type: 'form',
        id: 'config',
        submitLabel: 'Deploy Now',
        fields: []
      });
    });

    it('parses form with indented fields', () => {
      const input = `form server-config "Deploy"
  select env [dev prod]
  slider replicas 1 10 1 3
  text-input name "Server Name"`;

      const result = parseDSL(input);
      expect(result.success).toBe(true);
      expect(result.widget).toEqual({
        type: 'form',
        id: 'server-config',
        submitLabel: 'Deploy',
        fields: [
          {
            type: 'select',
            id: 'env',
            choices: ['dev', 'prod']
          },
          {
            type: 'slider',
            id: 'replicas',
            min: 1,
            max: 10,
            step: 1,
            default: 3
          },
          {
            type: 'text-input',
            id: 'name',
            label: 'Server Name'
          }
        ]
      });
    });

    it('ignores non-indented lines in form', () => {
      const input = `form config
  text-input field1
not indented
  select field2 [a b]`;

      const result = parseDSL(input);
      expect(result.success).toBe(true);
      expect(result.widget?.type).toBe('form');
      expect((result.widget as any).fields).toHaveLength(2);
    });
  });

  describe('error cases', () => {
    it('handles empty input', () => {
      const result = parseDSL('');
      expect(result.success).toBe(false);
      expect(result.error).toBe('Empty input');
    });

    it('handles unknown widget type', () => {
      const result = parseDSL('unknown-widget id');
      expect(result.success).toBe(false);
      expect(result.error).toContain('Unknown widget type');
    });

    it('handles malformed arrays', () => {
      const result = parseDSL('select id [unclosed');
      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid');
    });
  });

  describe('tokenization edge cases', () => {
    it('handles Chinese characters in button groups', () => {
      const result = parseDSL('button-group language [英文 中文 日本語]');
      expect(result.success).toBe(true);
      expect(result.widget).toEqual({
        type: 'button-group',
        id: 'language',
        choices: ['英文', '中文', '日本語']
      });
    });

    it('handles multiple spaces', () => {
      const result = parseDSL('text-input    id     "label"');
      expect(result.success).toBe(true);
      expect(result.widget).toEqual({
        type: 'text-input',
        id: 'id',
        label: 'label'
      });
    });

    it('handles quotes in arrays', () => {
      const result = parseDSL('select id [choice1 choice2]');
      expect(result.success).toBe(true);
      expect(result.widget).toEqual({
        type: 'select',
        id: 'id',
        choices: ['choice1', 'choice2']
      });
    });

    it('handles empty arrays', () => {
      const result = parseDSL('select id []');
      expect(result.success).toBe(true);
      expect(result.widget).toEqual({
        type: 'select',
        id: 'id',
        choices: []
      });
    });

    it('handles quoted choices with spaces in arrays', () => {
      const result = parseDSL('select location [Chicago "New York" "San Francisco"]');
      expect(result.success).toBe(true);
      expect(result.widget).toEqual({
        type: 'select',
        id: 'location',
        choices: ['Chicago', 'New York', 'San Francisco']
      });
    });

    it('handles mixed quoted and unquoted choices', () => {
      const result = parseDSL('button-group options [simple "Complex Option" another]');
      expect(result.success).toBe(true);
      expect(result.widget).toEqual({
        type: 'button-group',
        id: 'options',
        choices: ['simple', 'Complex Option', 'another']
      });
    });

    it('handles quoted defaults with spaces', () => {
      const result = parseDSL('select location [Chicago "New York"] "New York"');
      expect(result.success).toBe(true);
      expect(result.widget).toEqual({
        type: 'select',
        id: 'location',
        choices: ['Chicago', 'New York'],
        default: 'New York'
      });
    });
  });
});