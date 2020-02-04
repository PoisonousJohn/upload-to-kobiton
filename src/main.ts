import * as core from '@actions/core'
import * as request from 'request-promise-native'
// import {wait} from './wait'

async function run(): Promise<void> {
  try {
    const key = Buffer.from(
      `${core.getInput('kobitonLogin')}:${core.getInput('kobitonKey')}`
    ).toString('base64')
    const body = {
      filename: 'ANNA.apk'
    }
    const headers = {
      Authorization: `Basic ${key}`,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
    const options = {
      uri: 'https://api.kobiton.com/v1/apps/uploadUrl',
      headers,
      json: body
    }
    const response: Response = await request.post(options)
    core.info(`Link: ${JSON.stringify(response)}`)
    // const ms: string = core.getInput('milliseconds')
    // core.debug(`Waiting ${ms} milliseconds ...`)

    // core.debug(new Date().toTimeString())
    // await wait(parseInt(ms, 10))
    // core.debug(new Date().toTimeString())

    // core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    core.setFailed(JSON.stringify(error))
  }
}

run()
