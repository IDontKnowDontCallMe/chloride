const GraphMagicService = require('../service/GraphMagicService');


async function uploadTempfile({qquuid, tempFilePath}) {

    let isImage = await GraphMagicService.validateIsImageFile(tempFilePath);

    if(isImage){
        return {
            success: true,
            qquuid: qquuid,
            tempFilePath: tempFilePath,
        }
    }
    else {
        return {
            success: false,
        }
    }

}

async function deleteTempfile(param) {



}

module.exports = {
    uploadTempfile,
    deleteTempfile,
}