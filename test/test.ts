import { expect, tap } from '@pushrocks/tapbundle';
import * as smartjwt from '../ts/index'

tap.test('first test', async () => {
  console.log(smartjwt.standardExport)
})

tap.start()
