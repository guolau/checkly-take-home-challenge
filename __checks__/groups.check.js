import { CheckGroup } from 'checkly/constructs'

// Groups documentation: https://www.checklyhq.com/docs/groups

export const playwrightGroup = new CheckGroup('playwright-group', {
  name: 'Playwright Group',
  activated: true,
  muted: false,
  runtimeId: '2024.02',
  locations: ['us-east-1', 'eu-west-1'],
  tags: ['mac', 'group'],
  environmentVariables: [],
  concurrency: 10,
  runParallel: true,
  browserChecks: {
    // Automatically include all your Playwright tests
    testMatch: './playwright/*.spec.js' 

    // If you ONLY want the 2 original Playwright checks in this group (i.e. don't 
    // automatically add new checks), let me know and I will help you with that.
  }
})

// The dynamically-generated checks from jsonmap.check.js are in this group, added
// by passing the `jsonmapApiGroup` object into the checks' `group` property.
export const jsonmapApiGroup = new CheckGroup('jsonmap-api-group', {
  name: 'jsonmap API Group',
  activated: true,
  muted: false,
  runtimeId: '2024.02',
  locations: ['us-east-1', 'eu-west-1'],
  tags: ['mac', 'group'],
  environmentVariables: [],
  apiCheckDefaults: {},
  concurrency: 10,
  runParallel: true,
})