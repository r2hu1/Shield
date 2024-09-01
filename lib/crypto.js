const sc = require('@tsmx/string-crypto');

const encryptionKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;

const options = {
    key: encryptionKey,
}

export const encrypt = (data) => {
    return sc.encrypt(data, { key: options.key });
}

export const decrypt = (data) => {
    return sc.decrypt(data, { key: options.key });
}
