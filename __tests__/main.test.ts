// import {wait} from '../src/wait'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

// test('throws invalid number', async () => {
//   const input = parseInt('foo', 10)
//   await expect(wait(input)).rejects.toThrow('milliseconds not a number')
// })

// test('wait 500 ms', async () => {
//   const start = new Date()
//   await wait(500)
//   const end = new Date()
//   var delta = Math.abs(end.getTime() - start.getTime())
//   expect(delta).toBeGreaterThan(450)
// })

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  // console.log(`env: ${JSON.stringify(process.env)}`)
  if (!process.env['INPUT_KOBITONKEY'] || !process.env['INPUT_KOBITONLOGIN']) {
    throw 'Test needs correct INPUT_KOBITONKEY and INPUT_KOBITONLOGIN to be set'
  }
  process.env['INPUT_ARTIFACTPATH'] = '__tests__/test.apk'
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecSyncOptions = {
    env: process.env
  }
  try {
    console.log(cp.execSync(`node ${ip}`, options).toString())
  } catch (exc) {
    console.error(exc.output.toString())
    throw exc
  }
})
