const path = require('path');

module.exports = {
    outputDir: path.resolve(__dirname, '../plaze_service/src/public'),
    devServer: {
        proxy: {
            '': {
                target: 'http://localhost:3000'
            }
        }
    }  
}
