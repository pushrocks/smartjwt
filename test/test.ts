import { expect, tap } from '@pushrocks/tapbundle';
import * as smartjwt from '../ts/index';

let smartjwtInstance: smartjwt.SmartJwt;
let testJwt: string;

tap.test('should create a valid instance', async () => {
  smartjwtInstance = new smartjwt.SmartJwt();
  await smartjwtInstance.createNewKeyPair();
  console.log(smartjwtInstance);
});

tap.test('should create a valid jwt', async () => {
  await smartjwtInstance.createNewKeyPair();
});

tap.test('should create a new jwt', async () => {
  testJwt = await smartjwtInstance.createJWT({hi: 'there'});
  console.log(testJwt);
});

tap.test('should verify a jwt', async () => {
  const data = await smartjwtInstance.verifyJWTAndGetData(testJwt);
  console.log(data);
});


tap.start();
