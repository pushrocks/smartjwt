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
  testJwt = await smartjwtInstance.createJWT({ hi: 'there' });
  console.log(testJwt);
});

tap.test('should verify a jwt', async () => {
  const data = await smartjwtInstance.verifyJWTAndGetData(testJwt);
  // tslint:disable-next-line: no-unused-expression
  expect(data).to.not.be.null;
  console.log(data);
  console.log(smartjwtInstance.publicKey.toPemString());
});

tap.test('should not verify a wrong jwt', async () => {
  const jwt2 = await smartjwtInstance.createJWT({ wow: 'soclear' });
  const jwt2Array = jwt2.split('.');
  const testJwtArray = testJwt.split('.');
  const newJwt = `${testJwtArray[0]}.${jwt2Array[1]}.${testJwtArray[2]}`;
  let error: Error;
  try {
    await smartjwtInstance.verifyJWTAndGetData(newJwt);
  } catch (e) {
    error = e;
  }
  expect(error).to.be.instanceOf(Error);
});

tap.test('should verify a jwt on another instance', async () => {
  const secondSmartJwtInstance = new smartjwt.SmartJwt();
  secondSmartJwtInstance.setPublicPemKeyForVerification(smartjwtInstance.publicKey.toPemString());
  const result = secondSmartJwtInstance.verifyJWTAndGetData(testJwt);
  console.log(result);
});

tap.start();
