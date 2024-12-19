import { ApiCheck, AssertionBuilder } from 'checkly/constructs'
import { jsonmapApiGroup } from './groups.check.js'
import fs from 'node:fs'
import path from 'node:path'
import { URL } from 'node:url'

try {
  // Read users from the JSON file
  const filePath = path.join(import.meta.dirname, 'jsonmap-users.json')
  const users = JSON.parse(fs.readFileSync(filePath, 'utf8')).users;
  
  for (const user of users) {
    // Generate a name and id for this check. I'm basing this off the profile_url,
    // but you can change it to suit your tastes.
    // For more information about the check id: 
    // https://www.checklyhq.com/docs/cli/using-constructs/#assigning-logical-ids
    const parsedUrl = new URL(user.profile_url)
    const checkName = parsedUrl.hostname + parsedUrl.pathname
    const checkId = checkName.replaceAll(/[^A-Za-z0-9_\-\/#.]/g, '') // Remove invalid characters

    new ApiCheck(checkId, {
      name: checkName,
      group: jsonmapApiGroup,
      request: {
        url: user.profile_url,
        method: 'GET',
        headers: [
          // Make sure you add your auth token as a global environmental secret!
          // To do this, go to https://app.checklyhq.com/environment-variables,
          // scroll to "Environment secrets" at the bottom, then enter the Key as 
          // JSONMAP_AUTH_TOKEN, and your bearer token as the value.
          { key: 'Authorization', value: '{{JSONMAP_AUTH_TOKEN}}' } 
        ],
        followRedirects: true,
        skipSsl: false,
        assertions: [
          AssertionBuilder.statusCode().equals(200),
          AssertionBuilder.jsonBody('$.id').equals(user.id),
          AssertionBuilder.jsonBody('$.name').equals(user.name)
        ]
      }
    })
  }
} catch (err) {
  console.error(err);
}