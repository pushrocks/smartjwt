import { expect, tap } from '@pushrocks/tapbundle';
import * as smartjwt from '../ts/index';

let smartjwtInstance: smartjwt.SmartJwt;

tap.test('should create a valid instance', async () => {
  smartjwtInstance = new smartjwt.SmartJwt();
  await smartjwtInstance.createNewKeyPair();
  console.log(smartjwtInstance);
});

tap.test('should create a valid jwt', async () => {
  
});

tap.start();
