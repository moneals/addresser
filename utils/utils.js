function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function createStreetDirectionalString(streetDirectional) {
    return Object.keys(streetDirectional).map(x => streetDirectional[x]).join('|');
}

function createLine2PrefixString(line2Prefixes) {
    return Object.keys(line2Prefixes).join('|');
}

function createStreetTypeRegex(streetTypes, streetDirectionalString) {
    return new RegExp('.*\\b(?:' + 
        Object.keys(streetTypes).join('|') + ')\\b\\.?' + 
        '( +(?:' + streetDirectionalString + ')\\b)?', 'i');
}

function handleAddressPart(addressParts, stateString) {
    if (stateString.length > 0) {
        addressParts[addressParts.length-1] = stateString;
        return addressParts[addressParts.length-1];
    } else {
        addressParts.splice(-1,1);
        if (addressParts.length === 0) return '';
        return addressParts[addressParts.length-1].trim();
    }
}

function findCityInList(cityList, placeString) {
    let foundCity = '';
    let remainingString = placeString;
    
    if (cityList) {
        cityList.some(function(element) {
            const re = new RegExp(element + "$", "i");
            if (placeString.match(re)) {
                remainingString = placeString.replace(re,"");
                foundCity = element;
                return true;
            }
            return false;
        });
    }
    
    return { foundCity, remainingString };
}

function buildAddressLine1(streetNumber, streetName, streetSuffix, streetDirection) {
    let addressLine1 = streetNumber;
    if (streetName) {
        addressLine1 += ' ' + streetName;
    }
    if (streetSuffix) {
        addressLine1 += ' ' + streetSuffix;
    }
    if (streetDirection) {
        addressLine1 += ' ' + streetDirection;
    }
    return addressLine1;
}

module.exports = {
    getKeyByValue,
    toTitleCase,
    createStreetDirectionalString,
    createLine2PrefixString,
    createStreetTypeRegex,
    handleAddressPart,
    findCityInList,
    buildAddressLine1
};