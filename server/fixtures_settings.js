if (settings.find().count() === 0) {
    settings.insert({
        language: 'en_US',
        unitOfLength: 'px',
        dermatoscopeFactor: '1.0'
    });
};
