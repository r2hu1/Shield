const sc = require('@tsmx/string-crypto');

const encryptionKey = 'b3d4e7f1c2a5d8b9e0c6f2a4b7d9e6c1';

const options = {
    key: encryptionKey,
}

export const encrypt = (data) => {
    return sc.encrypt(data, { key: options.key });
}

export const decrypt = (data) => {
    return sc.decrypt(data, { key: options.key });
}
