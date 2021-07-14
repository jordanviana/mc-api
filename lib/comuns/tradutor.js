const STRINGS = {
    1: {
        "txt-pt": "txt-espanhol",
    },
    2: {
        "txt-pt": "txt-ingles",
    },
}


export const tradutor = (ididioma, _string) => {
    try {
        let txt = STRINGS[ididioma][_string]
        if(!txt) return _string;
        return txt;
    } catch (error) {
        return _string;
    }
}