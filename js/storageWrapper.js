define(['storage', 'core/storage_modules/cookie'],
    function (mac_storage, cookie)
{
    "use strict";
    var storageWrapper;

    storageWrapper = storageWrapper || mac_storage('jlt', cookie);

    return storageWrapper;
});