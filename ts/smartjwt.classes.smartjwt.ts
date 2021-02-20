import * as plugins from './smartjwt.plugins';

export interface ISmartJWTJSONKeypair {
  privatePem: string;
  publicPem: string;
}

/**
 * A class to create and validate JWTs and their keys
 */
export class SmartJwt<T extends object = any> {
  public smartcryptoInstance = new plugins.smartcrypto.Smartcrypto();
  public publicKey: plugins.smartcrypto.PublicKey;
  public privateKey: plugins.smartcrypto.PrivateKey;

  constructor() {}

  /**
   * creates a JWT
   */
  public async createJWT(payloadArg: T) {
    return plugins.jsonwebtoken.sign(payloadArg, this.privateKey.toPemString(), {
      algorithm: 'RS256',
    });
  }

  /**
   * checks a JWT
   */
  public async verifyJWTAndGetData(jwtArg: string): Promise<T> {
    const result = plugins.jsonwebtoken.verify(jwtArg, this.publicKey.toPemString(), {
      algorithms: ['RS256'],
    });
    return result as any;
  }

  /**
   * sets a private key to create jwts with
   */
  public async setPrivateKey(privateKey: plugins.smartcrypto.PrivateKey) {
    this.privateKey = privateKey;
  }

  /**
   * sets a public key
   */
  public async setPublicKey(publicKey: plugins.smartcrypto.PublicKey) {
    this.publicKey = publicKey;
  }

  /**
   * gets the currently set kaypair as json
   */
  public getKeyPairAsJson(): ISmartJWTJSONKeypair {
    return {
      privatePem: this.privateKey.toPemString(),
      publicPem: this.publicKey.toPemString(),
    };
  }

  /**
   * sets the currently set keypair as json
   */
  public setKeyPairAsJson(jsonKeyPair: ISmartJWTJSONKeypair) {
    this.privateKey = plugins.smartcrypto.PrivateKey.fromPemString(jsonKeyPair.privatePem);
    this.publicKey = plugins.smartcrypto.PublicKey.fromPemString(jsonKeyPair.publicPem);
  }

  /**
   * creates a new keypair
   */
  public async createNewKeyPair() {
    const keypair = await this.smartcryptoInstance.createKeyPair();
    this.setPrivateKey(keypair.privateKey);
    this.setPublicKey(keypair.publicKey);
  }

  /**
   * when you just want to validate something
   * @param publicPemKey
   */
  public setPublicPemKeyForVerification(publicPemKey: string) {
    this.publicKey = plugins.smartcrypto.PublicKey.fromPemString(publicPemKey);
  }

  public async init() {
    await this.createNewKeyPair();
  }
}
