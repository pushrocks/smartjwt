import * as plugins from './smartjwt.plugins';

/**
 * 
 */
export class SmartJwt {
  public smartcryptoInstance = new plugins.smartcrypto.Smartcrypto();
  public publicKey: plugins.smartcrypto.PublicKey;
  public privateKey: plugins.smartcrypto.PrivateKey;

  constructor() {};

  /**
   * creates a JWT
   */
  public async createJWT(payloadArg: any) {
    return plugins.jsonwebtoken.sign(payloadArg, this.privateKey.toPemString());
  }

  /**
   * checks a JWT
   */
  public async verifyJWTAndGetData(jwtArg: string) {
    return plugins.jsonwebtoken.verify(jwtArg, this.publicKey.toPemString());
  };

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
   * creates a new keypair
   */
  public async createNewKeyPair() {
    const keypair = await this.smartcryptoInstance.createKeyPair();
    this.setPrivateKey(keypair.privateKey);
    this.setPublicKey(keypair.publicKey);
  }
}