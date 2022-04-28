import * as core from '@actions/core'
import * as request from 'request-promise-native'
import {promises as fs} from 'fs'

async function run(): Promise<void> {
  try {
    const baseUri = 'https://api.kobiton.com/v1'
    const key = Buffer.from(
      `${core.getInput('kobitonLogin')}:${core.getInput('kobitonKey')}`
    ).toString('base64')
    core.debug(`Uploading app version with app id ${core.getInput('appId')}`)
    const body = {
      filename: core.getInput('fileName'),
      appId: core.getInput('appId')
    }
    const headers = {
      Authorization: `Basic ${key}`,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
    const options = {
      uri: `${baseUri}/apps/uploadUrl`,
      headers,
      json: body
    }
    const {appPath, url: uploadUrl} = await request.post(options)
    await request.put({
      uri: uploadUrl,
      headers: {
        'Content-Type': 'application/octet-stream',
        'x-amz-tagging': 'unsaved=true'
      },
      body: await fs.readFile(core.getInput('artifactPath'))
    })
    core.info('File uploaded')

    const createVersionResp = await request.post({
      uri: `${baseUri}/apps`,
      headers,
      json: {appPath}
    })

    core.info('Kobiton notified about new version')
    core.setOutput('versionId', createVersionResp.versionId)
  } catch (error) {
    core.setFailed(JSON.stringify(error))
  }
}

run()
