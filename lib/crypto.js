const sc = require('@tsmx/string-crypto');

export const encrypt = (data) => {
    return sc.encrypt(data, { key: 'f1c2e3d6a8b9c7d0e5f6a2b4c9d8e7f0' });
}

export const decrypt = (data) => {
    return sc.decrypt(data, { key: 'f1c2e3d6a8b9c7d0e5f6a2b4c9d8e7f0' });
}