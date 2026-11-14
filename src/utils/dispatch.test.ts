import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildFormspreePayload,
  buildMailtoHref,
  buildTicketId,
  getDefaultFormState,
  isValidOptionalUrl,
  validateIntakeForm,
} from './dispatch';

test('validateIntakeForm rejects empty required fields with clear messages', () => {
  const empty = getDefaultFormState('remote');
  const result = validateIntakeForm(empty);

  assert.equal(result.valid, false);
  assert.ok(result.errors.fullName);
  assert.ok(result.errors.email);
  assert.ok(result.errors.projectDetails);
});

test('validateIntakeForm validates creator footage URL only when provided', () => {
  const base = {
    ...getDefaultFormState('creator'),
    fullName: 'Jordan Vance',
    email: 'jordan@example.com',
    projectDetails: 'Need 5 vertical clips cut from our weekly 90-minute podcast.',
  };

  assert.equal(validateIntakeForm(base).valid, true);
  assert.equal(
    validateIntakeForm({ ...base, creatorFootageUrl: 'not-a-valid-url' }).valid,
    false,
  );
  assert.equal(
    validateIntakeForm({ ...base, creatorFootageUrl: 'https://drive.google.com/drive/folders/123' }).valid,
    true,
  );
});

test('isValidOptionalUrl handles empty, bare domain, and full URLs cleanly', () => {
  assert.equal(isValidOptionalUrl(''), true);
  assert.equal(isValidOptionalUrl('tuscaloosatech.com'), true);
  assert.equal(isValidOptionalUrl('https://youtube.com/@creator'), true);
  assert.equal(isValidOptionalUrl('invalid'), false);
});

test('buildTicketId produces division-prefixed identifiers', () => {
  assert.equal(buildTicketId('remote', 170000123456), 'ETC2-REM-123456');
  assert.equal(buildTicketId('repair', 170000123456), 'ETC2-REP-123456');
  assert.equal(buildTicketId('creator', 170000123456), 'ETC2-CRT-123456');
  assert.equal(buildTicketId('ai', 170000123456), 'ETC2-AIE-123456');
});

test('buildMailtoHref encodes division, ticket ID, and track details cleanly', () => {
  const state = {
    ...getDefaultFormState('repair'),
    fullName: 'Alex Morgan',
    email: 'alex@example.com',
    repairDeviceType: 'MacBook / Apple Laptop',
    repairFulfillment: 'Local Drop-Off: Tuscaloosa / Holt, AL',
    projectDetails: 'Screen flickers when lid opens past 70 degrees.',
  };

  const href = buildMailtoHref(state, 'john203995@gmail.com', 'ETC2-REP-998877');
  assert.ok(href.startsWith('mailto:john203995@gmail.com?'));
  assert.ok(href.includes('ETC2-REP-998877'));
  assert.ok(href.includes('Tuscaloosa'));
  assert.ok(href.includes('Alex+Morgan') || href.includes('Alex%20Morgan'));
});

test('buildFormspreePayload maps AI track metadata into flat record', () => {
  const state = {
    ...getDefaultFormState('ai'),
    fullName: 'Dana Brooks',
    email: 'dana@acme.io',
    aiWebsiteUrl: 'https://acme.io',
    projectDetails: 'Looking to automate inbound lead qualification and produce 2 AI commercials.',
  };

  const payload = buildFormspreePayload(state, 'ETC2-AIE-445566');
  assert.equal(payload.ticketId, 'ETC2-AIE-445566');
  assert.equal(payload['Company Website'], 'https://acme.io');
  assert.equal(payload.division, 'AI Commercials & Corporate AI');
});
